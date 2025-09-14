
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { container } from "@/config/ioc"
import { TYPES } from "@/config/types"
import type Response from "@/dtos/response-dto"
import type { WorkExperienceDto } from "@/dtos/work-experience-dto"
import {
    useAddWorkExperience,
    useGetWorkExperienceById,
    useUpdateWorkExperience,
} from "@/hooks/services-hook/use-work-experience.service.hook"
import useGetCurrentUser from "@/hooks/use-get-current-user"
import type { WorkExperienceModel } from "@/models/work-experience-model"
import WorkExperienceSchema from "@/schema/work-experience-schema"
import type IUnitOfService from "@/services/interfaces/Iunit-of-service"
import { yupResolver } from "@hookform/resolvers/yup"
import type { AxiosResponse } from "axios"
import { Building2, CalendarDays, FileText, Loader2, MapPin, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsFillSendFill } from "react-icons/bs"

interface ManageWorkExperienceProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageWorkExperience({ id, isOpen, onClose, onSuccess }: ManageWorkExperienceProps) {
    const router = useRouter()
    const [showLoader, setShowLoader] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [isCurrentPosition, setIsCurrentPosition] = useState<boolean>(false)
    const currentUser = useGetCurrentUser()
    const getWorkExperienceById = useGetWorkExperienceById(id, id > 0)
    const addWorkExperience = useAddWorkExperience()
    const updateWorkExperience = useUpdateWorkExperience()
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)


    const form = useForm<WorkExperienceModel>({
        resolver: yupResolver(WorkExperienceSchema),
        defaultValues: {
            userId: currentUser?.userId || "test-user-id",
            companyName: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
            location: "",
        },
    })

    const {
        setValue,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = form
    const watchedValues = watch()


    const fillWorkExperienceDetails = (workExperience: WorkExperienceDto) => {
        setValue("userId", workExperience.userId)
        setValue("companyName", workExperience.companyName)
        setValue("position", workExperience.position)
        setValue(
            "startDate",
            typeof workExperience.startDate === "string"
                ? workExperience.startDate.split('T')[0] // Extract date part from ISO string
                : workExperience.startDate instanceof Date
                    ? workExperience.startDate.toISOString().split("T")[0]
                    : "",
        )
        setValue(
            "endDate",
            typeof workExperience.endDate === "string"
                ? workExperience.endDate.split('T')[0] // Extract date part from ISO string
                : workExperience.endDate instanceof Date
                    ? workExperience.endDate.toISOString().split("T")[0]
                    : "",
        )
        setValue("description", workExperience.description || "")
        setValue("location", workExperience.location || "")

        setIsCurrentPosition(!workExperience.endDate)
    }

    useEffect(() => {
        if (getWorkExperienceById.status === "success" && getWorkExperienceById.data?.data?.data) {
            setIsUpdating(true)
            fillWorkExperienceDetails(getWorkExperienceById.data.data.data)
        }
    }, [getWorkExperienceById.status, getWorkExperienceById.data?.data?.data])

    useEffect(() => {
        if (currentUser?.userId && !isUpdating) {
            setValue("userId", currentUser.userId)
        }
    }, [currentUser?.userId, setValue, isUpdating])

    useEffect(() => {
        if (id > 0) {
            getWorkExperienceById.refetch()
        }
    }, [id])

    const handleCurrentPositionChange = (checked: boolean) => {
        setIsCurrentPosition(checked)
        if (checked) {
            setValue("endDate", "")
        }
    }

    const save = async (model: WorkExperienceModel) => {
        // Convert date strings to ISO format for API
        const apiModel = {
            ...model,
            startDate: unitOfService.DateTimeService.convertDateToISOString(model.startDate) || model.startDate,
            endDate: unitOfService.DateTimeService.convertDateToISOString(model.endDate) || model.endDate,
        };

        if (!apiModel.userId && currentUser?.userId) {
            apiModel.userId = currentUser.userId
        }

        if (!apiModel.userId) {
            apiModel.userId = "test-user-id"
        }

        if (isCurrentPosition) {
            apiModel.endDate = undefined
        }

        let response: AxiosResponse<Response<WorkExperienceDto>>
        setShowLoader(true)

        try {
            if (isUpdating) {
                response = await updateWorkExperience.mutateAsync({ id: id, model: apiModel })
            } else {
                response = await addWorkExperience.mutateAsync(apiModel)
                response = await addWorkExperience.mutateAsync(apiModel)
            }

            if (response && (response.status === 200 || response.status === 201) && response.data.data) {
                setShowLoader(false)
                toast({
                    title: "Work experience saved successfully",
                })
                onClose()
            } else {
                setShowLoader(false)
                const error = unitOfService.ErrorHandlerService.getErrorMessage(response)
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: <span>{error}</span>,
                })
            }
        } catch (error) {
            setShowLoader(false)
            let errorMessage = "An unexpected error occurred"

            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as any
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message
                } else if (axiosError.response?.data?.error) {
                    errorMessage = axiosError.response.data.error
                } else if (axiosError.message) {
                    errorMessage = axiosError.message
                }
            }

            toast({
                variant: "destructive",
                title: "Error",
                description: <span>{errorMessage}</span>,
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdating ? "Update Work Experience" : "Add Work Experience"}
                    </DialogTitle>
                    <DialogDescription>
                        {isUpdating
                            ? "Update your professional experience details"
                            : "Share your professional journey and achievements"}
                        {isUpdating && (
                            <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-200">
                                Editing Mode
                            </Badge>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form autoComplete="off" onSubmit={handleSubmit(save)} className="space-y-8">
                        {/* Company & Position Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                <Building2 className="h-5 w-5 text-blue-600" />
                                Company & Role
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                Company Name*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Google, Microsoft, Startup Inc."
                                                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                Position*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Senior Software Engineer, Product Manager"
                                                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Duration & Location Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                <CalendarDays className="h-5 w-5 text-green-600" />
                                Duration & Location
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4" />
                                                Start Date*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? typeof field.value === "string"
                                                                ? field.value
                                                                : new Date(field.value).toISOString().split("T")[0]
                                                            : ""
                                                    }
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <Checkbox
                                            id="current-position"
                                            checked={isCurrentPosition}
                                            onCheckedChange={handleCurrentPositionChange}
                                            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        />
                                        <label htmlFor="current-position" className="text-sm font-medium text-gray-700 cursor-pointer">
                                            This is my current position
                                        </label>
                                    </div>

                                    {!isCurrentPosition && (
                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4" />
                                                        End Date
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                                            {...field}
                                                            value={
                                                                field.value
                                                                    ? typeof field.value === "string"
                                                                        ? field.value
                                                                        : new Date(field.value).toISOString().split("T")[0]
                                                                    : ""
                                                            }
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., San Francisco, CA | Remote | New York, NY"
                                                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Description Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                                Job Description
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            Description & Achievements
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your role, responsibilities, key achievements, and impact. Include specific metrics and technologies used..."
                                                className="min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                        <p className="text-xs text-gray-500">
                                            Tip: Include quantifiable achievements, technologies used, and your impact on the organization.
                                        </p>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-gray-200">
                            <Button
                                type="submit"
                                disabled={showLoader || addWorkExperience.isPending || updateWorkExperience.isPending}
                                className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                {showLoader || addWorkExperience.isPending || updateWorkExperience.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving Experience...
                                    </>
                                ) : (
                                    <>
                                        <BsFillSendFill className="mr-2 h-4 w-4" />
                                        {isUpdating ? "Update" : "Save"} Work Experience
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
