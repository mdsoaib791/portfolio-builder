import express from 'express';
import accountRouter from './account.routes';
import healthRouter from './health.routes';
import projectRouter from './project.routes';
import skillRouter from './skill.routes';
import userRouter from './user.routes';
import workExperienceRouter from './work-experience.routes';


const routes = express.Router();

routes.use('/auth', accountRouter);
routes.use('/users', userRouter);
routes.use('/health', healthRouter);
routes.use('/work-experience', workExperienceRouter);
routes.use('/skills', skillRouter);
routes.use('/projects', projectRouter);

export default routes;
