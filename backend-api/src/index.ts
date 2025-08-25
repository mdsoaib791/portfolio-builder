import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';
import asyncHandler from './middlewares/asyncHandler.middleware';
import { default as ClientIdMiddleware, default as clientidMiddleware } from './middlewares/clientid.middleware';
import errorHandler from './middlewares/errorHandler.middleware';
import routes from './routes/index.routes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//setup public directory
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//setup cors
app.use(
  cors({
    origin: "http://localhost:3000",  // allow Next.js frontend
    credentials: true,                 // allow cookies/headers
  })
);

app.use(asyncHandler(ClientIdMiddleware.verify));

//route setup
app.use('/api', routes);

// Exclude /api-docs and /api-docs/* from clientIdMiddleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) {
    return next();
  }
  clientidMiddleware.verify(req, res, next);
});

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Error-handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
