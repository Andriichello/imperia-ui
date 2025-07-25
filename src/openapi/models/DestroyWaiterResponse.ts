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
/**
 * Delete waiter response object.
 * @export
 * @interface DestroyWaiterResponse
 */
export interface DestroyWaiterResponse {
  /**
   *
   * @type {string}
   * @memberof DestroyWaiterResponse
   */
  message: string;
}

/**
 * Check if a given object implements the DestroyWaiterResponse interface.
 */
export function instanceOfDestroyWaiterResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function DestroyWaiterResponseFromJSON(
  json: any
): DestroyWaiterResponse {
  return DestroyWaiterResponseFromJSONTyped(json, false);
}

export function DestroyWaiterResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DestroyWaiterResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: json["message"],
  };
}

export function DestroyWaiterResponseToJSON(
  value?: DestroyWaiterResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    message: value.message,
  };
}
