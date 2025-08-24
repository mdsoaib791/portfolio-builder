import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio Builder API',
      version: '1.0.0',
      description: 'API documentation for Portfolio Builder',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ProjectDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-1234' },
            userId: { type: 'string', example: 'clv1k2k2k2k2k2k2k2k2k2k2' },
            title: { type: 'string', example: 'Portfolio Website' },
            description: { type: 'string', example: 'A personal portfolio site' },
            url: { type: 'string', example: 'https://portfolio.com' },
            startDate: { type: 'string', format: 'date', example: '2023-01-01' },
            endDate: { type: 'string', format: 'date', nullable: true, example: '2023-06-01' },
            technologies: { type: 'array', items: { type: 'string' }, example: ['React', 'Node.js'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
          },
          required: ['id', 'userId', 'title', 'createdAt'],
        },
        SkillDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-5678' },
            userId: { type: 'string', example: 'clv1k2k2k2k2k2k2k2k2k2k2' },
            name: { type: 'string', example: 'JavaScript' },
            level: { type: 'string', enum: ['Beginner', 'Intermediate', 'Advanced'], example: 'Advanced' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
          },
          required: ['id', 'userId', 'name', 'level', 'createdAt'],
        },
        UserDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clv1k2k2k2k2k2k2k2k2k2k2' },
            email: { type: 'string', example: 'user@example.com' },
            passwordHash: { type: 'string', nullable: true },
            firstName: { type: 'string', nullable: true, example: 'John' },
            lastName: { type: 'string', nullable: true, example: 'Doe' },
            phoneNumber: { type: 'string', nullable: true, example: '+1234567890' },
            phoneCountryCode: { type: 'string', nullable: true, example: '+1' },
            dateOfBirth: { type: 'string', format: 'date', nullable: true },
            profileImageUrl: { type: 'string', nullable: true },
            provider: { type: 'string', enum: ['CREDENTIALS', 'GOOGLE', 'FACEBOOK', 'APPLE'] },
            providerId: { type: 'string', nullable: true },
            isEmailVerified: { type: 'boolean' },
            isPhoneVerified: { type: 'boolean' },
            twoFactorEnabled: { type: 'boolean' },
            twoFactorSecret: { type: 'string', nullable: true },
            role: { type: 'string', enum: ['ADMIN', 'STAFF', 'USER'] },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
          },
          required: ['id', 'email', 'createdAt'],
        },
        CreateUserModel: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'Password123!' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            phoneNumber: { type: 'string', example: '+1234567890' },
            phoneCountryCode: { type: 'string', example: '+1' },
          },
          required: ['email', 'password'],
        },
        LoginModel: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'Password123!' },
            rememberMe: { type: 'boolean', example: true },
          },
          required: ['email', 'password', 'rememberMe'],
        },
        WorkExperienceDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-1234' },
            userId: { type: 'string', example: 'clv1k2k2k2k2k2k2k2k2k2k2' },
            companyName: { type: 'string', example: 'Acme Corp' },
            position: { type: 'string', example: 'Software Engineer' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date', nullable: true },
            description: { type: 'string', nullable: true, example: 'Worked on backend APIs' },
            location: { type: 'string', nullable: true, example: 'New York' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'userId', 'companyName', 'position', 'startDate', 'createdAt', 'updatedAt'],
        },
        CreateWorkExperienceModel: {
          type: 'object',
          properties: {
            userId: { type: 'string', example: 'clv1k2k2k2k2k2k2k2k2k2k2' },
            companyName: { type: 'string', example: 'Acme Corp' },
            position: { type: 'string', example: 'Software Engineer' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time', nullable: true },
            description: { type: 'string', nullable: true },
            location: { type: 'string', nullable: true },
          },
          required: ['userId', 'companyName', 'position', 'startDate'],
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/dtos/*.ts',
  ], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
