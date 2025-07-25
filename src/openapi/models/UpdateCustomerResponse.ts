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
import type { Customer } from "./Customer";
import {
  CustomerFromJSON,
  CustomerFromJSONTyped,
  CustomerToJSON,
} from "./Customer";

/**
 * Update customer response object.
 * @export
 * @interface UpdateCustomerResponse
 */
export interface UpdateCustomerResponse {
  /**
   *
   * @type {Customer}
   * @memberof UpdateCustomerResponse
   */
  data: Customer;
  /**
   *
   * @type {string}
   * @memberof UpdateCustomerResponse
   */
  message: string;
}

/**
 * Check if a given object implements the UpdateCustomerResponse interface.
 */
export function instanceOfUpdateCustomerResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function UpdateCustomerResponseFromJSON(
  json: any
): UpdateCustomerResponse {
  return UpdateCustomerResponseFromJSONTyped(json, false);
}

export function UpdateCustomerResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UpdateCustomerResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: CustomerFromJSON(json["data"]),
    message: json["message"],
  };
}

export function UpdateCustomerResponseToJSON(
  value?: UpdateCustomerResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: CustomerToJSON(value.data),
    message: value.message,
  };
}
