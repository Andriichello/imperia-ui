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
  DestroyNotificationResponse,
  DestroyRequest,
  IndexNotificationResponse,
  PollNotificationsResponse,
  ShowNotificationResponse,
  StoreNotificationRequest,
  StoreNotificationResponse,
  UnauthenticatedResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse,
} from "../models";
import {
  DestroyNotificationResponseFromJSON,
  DestroyNotificationResponseToJSON,
  DestroyRequestFromJSON,
  DestroyRequestToJSON,
  IndexNotificationResponseFromJSON,
  IndexNotificationResponseToJSON,
  PollNotificationsResponseFromJSON,
  PollNotificationsResponseToJSON,
  ShowNotificationResponseFromJSON,
  ShowNotificationResponseToJSON,
  StoreNotificationRequestFromJSON,
  StoreNotificationRequestToJSON,
  StoreNotificationResponseFromJSON,
  StoreNotificationResponseToJSON,
  UnauthenticatedResponseFromJSON,
  UnauthenticatedResponseToJSON,
  UpdateNotificationRequestFromJSON,
  UpdateNotificationRequestToJSON,
  UpdateNotificationResponseFromJSON,
  UpdateNotificationResponseToJSON,
} from "../models";

export interface DestroyNotificationRequest {
  id: number;
  destroyRequest?: DestroyRequest;
}

export interface IndexNotificationsRequest {
  pageSize?: number;
  pageNumber?: number;
}

export interface PollNotificationsRequest {
  seen?: boolean;
  system?: boolean;
  senderId?: number;
}

export interface ShowNotificationRequest {
  id: number;
}

export interface StoreNotificationOperationRequest {
  storeNotificationRequest: StoreNotificationRequest;
}

export interface UpdateNotificationOperationRequest {
  id: number;
  updateNotificationRequest: UpdateNotificationRequest;
}

/**
 *
 */
export class NotificationsApi extends runtime.BaseAPI {
  /**
   * Delete notification.
   */
  async destroyNotificationRaw(
    requestParameters: DestroyNotificationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<DestroyNotificationResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling destroyNotification."
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
        path: `/api/notifications/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
        body: DestroyRequestToJSON(requestParameters.destroyRequest),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      DestroyNotificationResponseFromJSON(jsonValue)
    );
  }

  /**
   * Delete notification.
   */
  async destroyNotification(
    requestParameters: DestroyNotificationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<DestroyNotificationResponse> {
    const response = await this.destroyNotificationRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Index notifications.
   */
  async indexNotificationsRaw(
    requestParameters: IndexNotificationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<IndexNotificationResponse>> {
    const queryParameters: any = {};

    if (requestParameters.pageSize !== undefined) {
      queryParameters["page[size]"] = requestParameters.pageSize;
    }

    if (requestParameters.pageNumber !== undefined) {
      queryParameters["page[number]"] = requestParameters.pageNumber;
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
        path: `/api/notifications`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      IndexNotificationResponseFromJSON(jsonValue)
    );
  }

  /**
   * Index notifications.
   */
  async indexNotifications(
    requestParameters: IndexNotificationsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<IndexNotificationResponse> {
    const response = await this.indexNotificationsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Poll notifications.
   */
  async pollNotificationsRaw(
    requestParameters: PollNotificationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PollNotificationsResponse>> {
    const queryParameters: any = {};

    if (requestParameters.seen !== undefined) {
      queryParameters["seen"] = requestParameters.seen;
    }

    if (requestParameters.system !== undefined) {
      queryParameters["system"] = requestParameters.system;
    }

    if (requestParameters.senderId !== undefined) {
      queryParameters["sender_id"] = requestParameters.senderId;
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
        path: `/api/notifications/poll`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PollNotificationsResponseFromJSON(jsonValue)
    );
  }

  /**
   * Poll notifications.
   */
  async pollNotifications(
    requestParameters: PollNotificationsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PollNotificationsResponse> {
    const response = await this.pollNotificationsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Show notification by id.
   */
  async showNotificationRaw(
    requestParameters: ShowNotificationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ShowNotificationResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling showNotification."
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
        path: `/api/notifications/{id}`.replace(
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
      ShowNotificationResponseFromJSON(jsonValue)
    );
  }

  /**
   * Show notification by id.
   */
  async showNotification(
    requestParameters: ShowNotificationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ShowNotificationResponse> {
    const response = await this.showNotificationRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Store notification.
   */
  async storeNotificationRaw(
    requestParameters: StoreNotificationOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<StoreNotificationResponse>> {
    if (
      requestParameters.storeNotificationRequest === null ||
      requestParameters.storeNotificationRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "storeNotificationRequest",
        "Required parameter requestParameters.storeNotificationRequest was null or undefined when calling storeNotification."
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
        path: `/api/notifications`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: StoreNotificationRequestToJSON(
          requestParameters.storeNotificationRequest
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      StoreNotificationResponseFromJSON(jsonValue)
    );
  }

  /**
   * Store notification.
   */
  async storeNotification(
    requestParameters: StoreNotificationOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<StoreNotificationResponse> {
    const response = await this.storeNotificationRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Update notification.
   */
  async updateNotificationRaw(
    requestParameters: UpdateNotificationOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<UpdateNotificationResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling updateNotification."
      );
    }

    if (
      requestParameters.updateNotificationRequest === null ||
      requestParameters.updateNotificationRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "updateNotificationRequest",
        "Required parameter requestParameters.updateNotificationRequest was null or undefined when calling updateNotification."
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
        path: `/api/notifications/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: UpdateNotificationRequestToJSON(
          requestParameters.updateNotificationRequest
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UpdateNotificationResponseFromJSON(jsonValue)
    );
  }

  /**
   * Update notification.
   */
  async updateNotification(
    requestParameters: UpdateNotificationOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<UpdateNotificationResponse> {
    const response = await this.updateNotificationRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
