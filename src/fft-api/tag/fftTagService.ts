import { ResponseError } from 'superagent';
import { Logger } from 'tslog';
import { FftApiClient } from '../common';
import { CustomLogger } from '../../common';
import { AddAllowedValueToTagAction, StrippedTags, Tag, TagForCreation, TagPatchActions } from '../types';

export class FftTagService {
  private readonly PATH = 'tags';

  private readonly logger: Logger<FftTagService> = new CustomLogger<FftTagService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async create(key: string, values: string[]): Promise<Tag> {
    const tagForCreation: TagForCreation = {
      id: key,
      allowedValues: values,
    };
    try {
      return await this.apiClient.post<Tag>(this.PATH, { ...tagForCreation });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not create tag. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async get(id: string): Promise<Tag> {
    try {
      return await this.apiClient.get<Tag>(`${this.PATH}/${id}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get tag. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async getAll(size = 25): Promise<StrippedTags> {
    try {
      return await this.apiClient.get<StrippedTags>(this.PATH, { ...(size && { size: size.toString() }) });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get tags. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async update(id: string, additionalValues: string[]): Promise<Tag> {
    try {
      const tag = await this.get(id);
      const actions: AddAllowedValueToTagAction[] = [];
      for (const value of additionalValues) {
        actions.push({
          action: AddAllowedValueToTagAction.ActionEnum.AddAllowedValueToTag,
          allowedValue: value,
        });
      }
      const tagPatchActions: TagPatchActions = {
        actions,
        version: tag.version,
      };
      return await this.apiClient.patch<Tag>(`${this.PATH}/${id}`, { ...tagPatchActions });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not update tag ${id}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }
}
