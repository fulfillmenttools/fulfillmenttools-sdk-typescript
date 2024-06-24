import { Logger } from 'tslog';
import { ResponseError } from 'superagent';
import { FftApiClient } from '../common';
import { CustomLogger, QueryParams } from '../../common';
import { StrippedUsers, User, UserForCreation } from '../types';

export class FftUserService {
  private readonly PATH = 'users';
  private readonly logger: Logger<FftUserService> = new CustomLogger<FftUserService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async create(userForCreation: UserForCreation): Promise<User> {
    try {
      return await this.apiClient.post<User>(this.PATH, { ...userForCreation });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not create user. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  // TODO oder mit expliziten Parametern?
  public async getAll(params?: QueryParams): Promise<StrippedUsers> {
    try {
      return await this.apiClient.get<StrippedUsers>(this.PATH, params);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get users. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async get(userId: string): Promise<User> {
    try {
      return await this.apiClient.get<User>(`${this.PATH}/${userId}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get user with id ${userId}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  // TODO public async update(userId: string): Promise<void> {}

  public async delete(userId: string): Promise<void> {
    try {
      return await this.apiClient.delete(`${this.PATH}/${userId}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not delete user with id ${userId}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }
}
