import IAccountService from './iaccount-service';
import IDateTimeService from './idatetime-service';
import IErrorHandlerService from './ierror-handler-service';
import IHttpService from './ihttp-service';
import IMiscellaneousService from './imiscellaneous-service';
import IUserService from './iuser-service';
import IWorkExperienceService from './iwork-experience-service';
import ISkillService from './iskill-service';
import IProjectService from './iproject-service';

export default interface IUnitOfService {
  HttpService: IHttpService;
  AccountService: IAccountService;
  DateTimeService: IDateTimeService;
  MiscellaneousService: IMiscellaneousService;
  ErrorHandlerService: IErrorHandlerService;
  UserService: IUserService;
  WorkExperienceService: IWorkExperienceService;
  SkillService: ISkillService;
  ProjectService: IProjectService;
}
