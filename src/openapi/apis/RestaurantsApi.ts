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
  GetHolidaysResponse,
  GetSchedulesResponse,
  IndexRestaurantResponse,
  ShowRestaurantResponse,
  UnauthenticatedResponse,
  UpdateRestaurantRequest,
  UpdateRestaurantResponse,
} from "../models";
import {
  GetHolidaysResponseFromJSON,
  GetHolidaysResponseToJSON,
  GetSchedulesResponseFromJSON,
  GetSchedulesResponseToJSON,
  IndexRestaurantResponseFromJSON,
  IndexRestaurantResponseToJSON,
  ShowRestaurantResponseFromJSON,
  ShowRestaurantResponseToJSON,
  UnauthenticatedResponseFromJSON,
  UnauthenticatedResponseToJSON,
  UpdateRestaurantRequestFromJSON,
  UpdateRestaurantRequestToJSON,
  UpdateRestaurantResponseFromJSON,
  UpdateRestaurantResponseToJSON,
} from "../models";

export interface GetHolidaysRequest {
  id: number;
  days?: string;
  from?: Date;
}

export interface GetSchedulesRequest {
  id: number;
}

export interface IndexRestaurantsRequest {
  include?: string;
  sort?: string;
  filterSlug?: string;
  filterName?: string;
}

export interface ShowRestaurantRequest {
  id: number;
  include?: string;
}

export interface UpdateRestaurantOperationRequest {
  id: number;
  updateRestaurantRequest: UpdateRestaurantRequest;
  include?: string;
}

/**
 *
 */
export class RestaurantsApi extends runtime.BaseAPI {
  /**
   * Get restaurant\'s holidays.
   */
  async getHolidaysRaw(
    requestParameters: GetHolidaysRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetHolidaysResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling getHolidays."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.days !== undefined) {
      queryParameters["days"] = requestParameters.days;
    }

    if (requestParameters.from !== undefined) {
      queryParameters["from"] = (requestParameters.from as any)
        .toISOString()
        .substr(0, 10);
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
        path: `/api/restaurants/{id}/holidays`.replace(
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
      GetHolidaysResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get restaurant\'s holidays.
   */
  async getHolidays(
    requestParameters: GetHolidaysRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetHolidaysResponse> {
    const response = await this.getHolidaysRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Get restaurant\'s schedules.
   */
  async getSchedulesRaw(
    requestParameters: GetSchedulesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetSchedulesResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling getSchedules."
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
        path: `/api/restaurants/{id}/schedules`.replace(
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
      GetSchedulesResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get restaurant\'s schedules.
   */
  async getSchedules(
    requestParameters: GetSchedulesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetSchedulesResponse> {
    const response = await this.getSchedulesRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Index restaurants.
   */
  async indexRestaurantsRaw(
    requestParameters: IndexRestaurantsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<IndexRestaurantResponse>> {
    const queryParameters: any = {};

    if (requestParameters.include !== undefined) {
      queryParameters["include"] = requestParameters.include;
    }

    if (requestParameters.sort !== undefined) {
      queryParameters["sort"] = requestParameters.sort;
    }

    if (requestParameters.filterSlug !== undefined) {
      queryParameters["filter[slug]"] = requestParameters.filterSlug;
    }

    if (requestParameters.filterName !== undefined) {
      queryParameters["filter[name]"] = requestParameters.filterName;
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
        path: `/api/restaurants`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      IndexRestaurantResponseFromJSON(jsonValue)
    );
  }

  /**
   * Index restaurants.
   */
  async indexRestaurants(
    requestParameters: IndexRestaurantsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<IndexRestaurantResponse> {
    const response = await this.indexRestaurantsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Show restaurant by id.
   */
  async showRestaurantRaw(
    requestParameters: ShowRestaurantRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ShowRestaurantResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling showRestaurant."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.include !== undefined) {
      queryParameters["include"] = requestParameters.include;
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
        path: `/api/restaurants/{id}`.replace(
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
      ShowRestaurantResponseFromJSON(jsonValue)
    );
  }

  /**
   * Show restaurant by id.
   */
  async showRestaurant(
    requestParameters: ShowRestaurantRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ShowRestaurantResponse> {
    const response = await this.showRestaurantRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Update restaurant.
   */
  async updateRestaurantRaw(
    requestParameters: UpdateRestaurantOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<UpdateRestaurantResponse>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling updateRestaurant."
      );
    }

    if (
      requestParameters.updateRestaurantRequest === null ||
      requestParameters.updateRestaurantRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "updateRestaurantRequest",
        "Required parameter requestParameters.updateRestaurantRequest was null or undefined when calling updateRestaurant."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.include !== undefined) {
      queryParameters["include"] = requestParameters.include;
    }

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
        path: `/api/restaurants/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: UpdateRestaurantRequestToJSON(
          requestParameters.updateRestaurantRequest
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UpdateRestaurantResponseFromJSON(jsonValue)
    );
  }

  /**
   * Update restaurant.
   */
  async updateRestaurant(
    requestParameters: UpdateRestaurantOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<UpdateRestaurantResponse> {
    const response = await this.updateRestaurantRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
