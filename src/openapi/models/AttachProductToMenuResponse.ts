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
 * Attach category to menu response object.
 * @export
 * @interface AttachProductToMenuResponse
 */
export interface AttachProductToMenuResponse {
  /**
   *
   * @type {string}
   * @memberof AttachProductToMenuResponse
   */
  message: string;
}

/**
 * Check if a given object implements the AttachProductToMenuResponse interface.
 */
export function instanceOfAttachProductToMenuResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function AttachProductToMenuResponseFromJSON(
  json: any
): AttachProductToMenuResponse {
  return AttachProductToMenuResponseFromJSONTyped(json, false);
}

export function AttachProductToMenuResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AttachProductToMenuResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: json["message"],
  };
}

export function AttachProductToMenuResponseToJSON(
  value?: AttachProductToMenuResponse | null
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
