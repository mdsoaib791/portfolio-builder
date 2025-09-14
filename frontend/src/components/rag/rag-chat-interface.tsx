'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Send,
    Upload,
    FileText,
    User,
    Bot,
    Check,
    X,
    Loader2,
    Download,
    MessageSquare,
    Sparkles
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IRagService from '@/services/interfaces/irag-service';

interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    metadata?: any;
}

interface GeneratedData {
    user?: any;
    skills?: any[];
    projects?: any[];
    workExperiences?: any[];
    summary?: string;
    suggestions?: string[];
    sessionId?: string;
}

interface RagChatInterfaceProps {
    userId?: string;
    onDataGenerated?: (data: GeneratedData) => void;
    onDataConfirmed?: (data: GeneratedData) => void;
}

export default function RagChatInterface({
    userId,
    onDataGenerated,
    onDataConfirmed
}: RagChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
    const [showDataPreview, setShowDataPreview] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [processingFile, setProcessingFile] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const ragService = container.get<IRagService>(TYPES.IRagService);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Load chat history when component mounts
        if (userId) {
            loadChatHistory();
        }
    }, [userId]);

    const loadChatHistory = async () => {
        try {
            // This would call the backend to get chat history
            // For now, we'll just show a welcome message
            const welcomeMessage: Message = {
                id: Date.now().toString(),
                type: 'assistant',
                content: `👋 Hi! I'm your AI portfolio assistant. I can help you:

• **Generate your complete portfolio** from a simple description
• **Process your CV/Resume** to extract and organize information
• **Create projects, skills, and work experience** sections
• **Improve existing content** with AI suggestions

How would you like to start? You can either:
1. Tell me about yourself and I'll create a portfolio
2. Upload your CV/Resume for processing
3. Ask me to help with specific sections

What would you like to do?`,
                timestamp: new Date(),
                metadata: { type: 'welcome' }
            };
            setMessages([welcomeMessage]);
        } catch (error) {
            console.error('Failed to load chat history:', error);
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Determine if this is a portfolio generation request
            const isPortfolioRequest = inputMessage.toLowerCase().includes('portfolio') ||
                inputMessage.toLowerCase().includes('generate') ||
                inputMessage.toLowerCase().includes('create profile');

            let response;
            if (isPortfolioRequest) {
                // Call complete profile generation
                response = await ragService.generatePortfolioFromPrompt(inputMessage);

                if (response.data.success) {
                    const data = response.data.data;
                    setGeneratedData(data);

                    const assistantMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'assistant',
                        content: `🎉 Great! I've generated your portfolio based on your description. Here's what I created:

**Generated Content:**
• Personal Summary
• ${data.skills?.length || 0} Skills
• ${data.projects?.length || 0} Projects  
• ${data.workExperiences?.length || 0} Work Experience entries

Would you like to review the generated content and confirm to add it to your portfolio?`,
                        timestamp: new Date(),
                        metadata: {
                            type: 'portfolio_generated',
                            hasData: true
                        }
                    };
                    setMessages(prev => [...prev, assistantMessage]);
                    setShowDataPreview(true);
                    onDataGenerated?.(data);
                }
            } else {
                // Regular RAG query
                response = await ragService.queryRAG(inputMessage);

                if (response.data.success) {
                    const assistantMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'assistant',
                        content: response.data.data.response,
                        timestamp: new Date(),
                        metadata: {
                            confidence: response.data.data.confidence,
                            sources: response.data.data.sources
                        }
                    };
                    setMessages(prev => [...prev, assistantMessage]);
                }
            }
        } catch (error: any) {
            console.error('Failed to send message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `❌ Sorry, I encountered an error: ${error.message || 'Something went wrong'}. Please try again.`,
                timestamp: new Date(),
                metadata: { type: 'error' }
            };
            setMessages(prev => [...prev, errorMessage]);
            toast({
                title: 'Error',
                description: 'Failed to process your message. Please try again.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        setProcessingFile(true);
        const fileMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: `📄 Uploaded CV: ${selectedFile.name}`,
            timestamp: new Date(),
            metadata: { type: 'file_upload', filename: selectedFile.name }
        };

        setMessages(prev => [...prev, fileMessage]);

        try {
            const response = await ragService.generatePortfolioFromCV(selectedFile);

            if (response.data.success) {
                const data = response.data.data;
                setGeneratedData(data);

                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    content: `✅ Perfect! I've analyzed your CV and extracted the following information:

**Extracted Data:**
• Personal Information: ${data.user ? '✓' : '✗'}
• Skills: ${data.skills?.length || 0} found
• Work Experience: ${data.workExperiences?.length || 0} positions
• Projects: ${data.projects?.length || 0} projects

The data looks comprehensive! Would you like to review it and confirm to add it to your portfolio?`,
                    timestamp: new Date(),
                    metadata: {
                        type: 'cv_processed',
                        hasData: true
                    }
                };

                setMessages(prev => [...prev, assistantMessage]);
                setShowDataPreview(true);
                setShowFileUpload(false);
                setSelectedFile(null);
                onDataGenerated?.(data);
            }
        } catch (error: any) {
            console.error('Failed to process CV:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `❌ Sorry, I couldn't process your CV: ${error.message || 'Unknown error'}. Please try again with a different file.`,
                timestamp: new Date(),
                metadata: { type: 'error' }
            };
            setMessages(prev => [...prev, errorMessage]);
            toast({
                title: 'Upload Error',
                description: 'Failed to process your CV. Please try again.',
                variant: 'destructive'
            });
        } finally {
            setProcessingFile(false);
        }
    };

    const confirmGeneratedData = async () => {
        if (!generatedData) return;

        setIsLoading(true);
        try {
            // Call the backend to create the actual portfolio data
            const response = await ragService.confirmAndCreateData(generatedData);

            if (response.data.success) {
                const confirmMessage: Message = {
                    id: Date.now().toString(),
                    type: 'assistant',
                    content: `🎉 Excellent! I've successfully added all the information to your portfolio. Your portfolio now includes:

✅ Updated personal information
✅ ${generatedData.skills?.length || 0} skills added
✅ ${generatedData.projects?.length || 0} projects created
✅ ${generatedData.workExperiences?.length || 0} work experience entries added

You can now view and edit your portfolio in the dashboard. Is there anything else you'd like me to help you with?`,
                    timestamp: new Date(),
                    metadata: { type: 'confirmed' }
                };

                setMessages(prev => [...prev, confirmMessage]);
                setShowDataPreview(false);
                setGeneratedData(null);
                onDataConfirmed?.(generatedData);

                toast({
                    title: 'Success!',
                    description: 'Your portfolio has been updated with the generated content.',
                });
            }
        } catch (error: any) {
            console.error('Failed to confirm data:', error);
            toast({
                title: 'Error',
                description: 'Failed to save the generated content. Please try again.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const rejectGeneratedData = () => {
        const rejectMessage: Message = {
            id: Date.now().toString(),
            type: 'assistant',
            content: `No problem! The generated content has been discarded. Feel free to:

• Provide more specific details about yourself
• Upload a different CV file
• Ask me to focus on specific sections only

What would you like to try next?`,
            timestamp: new Date(),
            metadata: { type: 'rejected' }
        };

        setMessages(prev => [...prev, rejectMessage]);
        setShowDataPreview(false);
        setGeneratedData(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessageContent = (content: string) => {
        // Simple markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/•/g, '•')
            .split('\n')
            .map((line, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: line }} className="mb-1" />
            ));
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    AI Portfolio Assistant
                    <Badge variant="secondary" className="ml-auto">
                        Chat Mode
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4">
                {/* Messages Area */}
                <div className="flex-1 h-96 border rounded-lg p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                        {message.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                                    </div>
                                    <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} border`}>
                                        <div className="text-sm text-gray-800">
                                            {formatMessageContent(message.content)}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {message.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span className="text-sm text-gray-600">Thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Data Preview */}
                {showDataPreview && generatedData && (
                    <Card className="border-green-200 bg-green-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-green-800 mb-2">
                                <Check className="h-4 w-4 text-green-600" />
                                <span>Generated content is ready for review. Would you like to add it to your portfolio?</span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => setShowDataPreview(true)}>
                                    Review
                                </Button>
                                <Button size="sm" onClick={confirmGeneratedData} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                                    Confirm
                                </Button>
                                <Button size="sm" variant="outline" onClick={rejectGeneratedData}>
                                    <X className="h-3 w-3" />
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Input Area */}
                <div className="border-t pt-4">
                    <div className="flex gap-2 mb-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFileUpload(true)}
                            className="flex items-center gap-2"
                        >
                            <Upload className="h-4 w-4" />
                            Upload CV
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInputMessage("Please generate a complete portfolio for me. I am a ")}
                            className="flex items-center gap-2"
                        >
                            <Sparkles className="h-4 w-4" />
                            Quick Generate
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Tell me about yourself, or ask me to help with your portfolio..."
                            className="min-h-[80px] resize-none"
                            disabled={isLoading || processingFile}
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={!inputMessage.trim() || isLoading || processingFile}
                            className="px-6"
                        >
                            {isLoading || processingFile ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>

            {/* File Upload Dialog */}
            <Dialog open={showFileUpload} onOpenChange={setShowFileUpload}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Your CV/Resume</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="mt-4">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx,.txt"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <Button onClick={() => fileInputRef.current?.click()}>
                                        Select File
                                    </Button>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Supports PDF, DOC, DOCX, and TXT files (max 10MB)
                                </p>
                                {selectedFile && (
                                    <p className="mt-2 text-sm text-green-600">
                                        Selected: {selectedFile.name}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowFileUpload(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleFileUpload}
                                disabled={!selectedFile || processingFile}
                            >
                                {processingFile ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload & Process
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
