/* tslint:disable */
/* eslint-disable */
/**
 * imperia-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import type {
  DestroyCommentResponse,
  IndexCommentResponse,
  ShowCommentResponse,
  StoreCommentRequest,
  StoreCommentResponse,
  UnauthenticatedResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "../models";
import {
  DestroyCommentResponseFromJSON,
  DestroyCommentResponseToJSON,
  IndexCommentResponseFromJSON,
  IndexCommentResponseToJSON,
  ShowCommentResponseFromJSON,
  ShowCommentResponseToJSON,
  StoreCommentRequestFromJSON,
  StoreCommentRequestToJSON,
  StoreCommentResponseFromJSON,
  StoreCommentResponseToJSON,
  UnauthenticatedResponseFromJSON,
  UnauthenticatedResponseToJSON,
  UpdateCommentRequestFromJSON,
  UpdateCommentRequestToJSON,
  UpdateCommentResponseFromJSON,
  UpdateCommentResponseToJSON,
} from "../models";

export interface DestroyCommentRequest {
  id: number;
}

export interface IndexCommentsRequest {
  filterCommentableId: number;
  filterCommentableType: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface ShowCommentRequest {
  id: number;
}

export interface StoreCommentOperationRequest {
  storeCommentRequest: StoreCommentRequest;
}

export interface UpdateCommentOperationRequest {
  id: number;
  updateCommentRequest: UpdateCommentRequest;
}

/**
 *
 */
export class CommentsApi extends runtime.BaseAPI {
  /**
   * Delete comment.
   */
  async destroyCommentRaw(
    requestParameters: DestroyCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<DestroyCommentResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling destroyComment."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearerAuth", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/comments/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      DestroyCommentResponseFromJSON(jsonValue)
    );
  }

  /**
   * Delete comment.
   */
  async destroyComment(
    requestParameters: DestroyCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<DestroyCommentResponse> {
    const response = await this.destroyCommentRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Index comments.
   */
  async indexCommentsRaw(
    requestParameters: IndexCommentsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<IndexCommentResponse>> {
    if (
      requestParameters.filterCommentableId === null ||
      requestParameters.filterCommentableId === undefined
    ) {
      throw new runtime.RequiredError(
        "filterCommentableId",
        "Required parameter requestParameters.filterCommentableId was null or undefined when calling indexComments."
      );
    }

    if (
      requestParameters.filterCommentableType === null ||
      requestParameters.filterCommentableType === undefined
    ) {
      throw new runtime.RequiredError(
        "filterCommentableType",
        "Required parameter requestParameters.filterCommentableType was null or undefined when calling indexComments."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.pageSize !== undefined) {
      queryParameters["page[size]"] = requestParameters.pageSize;
    }

    if (requestParameters.pageNumber !== undefined) {
      queryParameters["page[number]"] = requestParameters.pageNumber;
    }

    if (requestParameters.filterCommentableId !== undefined) {
      queryParameters["filter[commentable_id]"] =
        requestParameters.filterCommentableId;
    }

    if (requestParameters.filterCommentableType !== undefined) {
      queryParameters["filter[commentable_type]"] =
        requestParameters.filterCommentableType;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearerAuth", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/comments`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      IndexCommentResponseFromJSON(jsonValue)
    );
  }

  /**
   * Index comments.
   */
  async indexComments(
    requestParameters: IndexCommentsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<IndexCommentResponse> {
    const response = await this.indexCommentsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Show comment by id.
   */
  async showCommentRaw(
    requestParameters: ShowCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ShowCommentResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling showComment."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearerAuth", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/comments/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ShowCommentResponseFromJSON(jsonValue)
    );
  }

  /**
   * Show comment by id.
   */
  async showComment(
    requestParameters: ShowCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ShowCommentResponse> {
    const response = await this.showCommentRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Store comment.
   */
  async storeCommentRaw(
    requestParameters: StoreCommentOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<StoreCommentResponse>> {
    if (
      requestParameters.storeCommentRequest === null ||
      requestParameters.storeCommentRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "storeCommentRequest",
        "Required parameter requestParameters.storeCommentRequest was null or undefined when calling storeComment."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearerAuth", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/comments`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: StoreCommentRequestToJSON(requestParameters.storeCommentRequest),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      StoreCommentResponseFromJSON(jsonValue)
    );
  }

  /**
   * Store comment.
   */
  async storeComment(
    requestParameters: StoreCommentOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<StoreCommentResponse> {
    const response = await this.storeCommentRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Update comment.
   */
  async updateCommentRaw(
    requestParameters: UpdateCommentOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<UpdateCommentResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling updateComment."
      );
    }

    if (
      requestParameters.updateCommentRequest === null ||
      requestParameters.updateCommentRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "updateCommentRequest",
        "Required parameter requestParameters.updateCommentRequest was null or undefined when calling updateComment."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearerAuth", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/comments/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: UpdateCommentRequestToJSON(
          requestParameters.updateCommentRequest
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UpdateCommentResponseFromJSON(jsonValue)
    );
  }

  /**
   * Update comment.
   */
  async updateComment(
    requestParameters: UpdateCommentOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<UpdateCommentResponse> {
    const response = await this.updateCommentRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
