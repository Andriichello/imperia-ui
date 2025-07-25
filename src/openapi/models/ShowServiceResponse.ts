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

import { exists, mapValues } from "../runtime";
import type { Service } from "./Service";
import {
  ServiceFromJSON,
  ServiceFromJSONTyped,
  ServiceToJSON,
} from "./Service";

/**
 * Show services response object.
 * @export
 * @interface ShowServiceResponse
 */
export interface ShowServiceResponse {
  /**
   *
   * @type {Service}
   * @memberof ShowServiceResponse
   */
  data: Service;
  /**
   *
   * @type {string}
   * @memberof ShowServiceResponse
   */
  message: string;
}

/**
 * Check if a given object implements the ShowServiceResponse interface.
 */
export function instanceOfShowServiceResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function ShowServiceResponseFromJSON(json: any): ShowServiceResponse {
  return ShowServiceResponseFromJSONTyped(json, false);
}

export function ShowServiceResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ShowServiceResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: ServiceFromJSON(json["data"]),
    message: json["message"],
  };
}

export function ShowServiceResponseToJSON(
  value?: ShowServiceResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: ServiceToJSON(value.data),
    message: value.message,
  };
}
