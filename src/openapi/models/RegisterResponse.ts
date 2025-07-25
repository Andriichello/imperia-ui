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
import type { User } from "./User";
import { UserFromJSON, UserFromJSONTyped, UserToJSON } from "./User";

/**
 * Register user response object.
 * @export
 * @interface RegisterResponse
 */
export interface RegisterResponse {
  /**
   *
   * @type {User}
   * @memberof RegisterResponse
   */
  data: User;
  /**
   *
   * @type {string}
   * @memberof RegisterResponse
   */
  message: string;
}

/**
 * Check if a given object implements the RegisterResponse interface.
 */
export function instanceOfRegisterResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function RegisterResponseFromJSON(json: any): RegisterResponse {
  return RegisterResponseFromJSONTyped(json, false);
}

export function RegisterResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RegisterResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: UserFromJSON(json["data"]),
    message: json["message"],
  };
}

export function RegisterResponseToJSON(value?: RegisterResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: UserToJSON(value.data),
    message: value.message,
  };
}
