import Response from "@/dtos/response-dto";
import { PortfolioData } from "@/services/portfolio-service";
import { AxiosResponse } from "axios";

export default interface IPortfolioService {
  getByUserId(userId: string): Promise<AxiosResponse<Response<PortfolioData>>>;
}
