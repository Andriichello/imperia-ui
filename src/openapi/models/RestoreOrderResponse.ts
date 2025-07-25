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
import type { Order } from "./Order";
import { OrderFromJSON, OrderFromJSONTyped, OrderToJSON } from "./Order";

/**
 * Restore order response object.
 * @export
 * @interface RestoreOrderResponse
 */
export interface RestoreOrderResponse {
  /**
   *
   * @type {Order}
   * @memberof RestoreOrderResponse
   */
  data: Order;
  /**
   *
   * @type {string}
   * @memberof RestoreOrderResponse
   */
  message: string;
}

/**
 * Check if a given object implements the RestoreOrderResponse interface.
 */
export function instanceOfRestoreOrderResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function RestoreOrderResponseFromJSON(json: any): RestoreOrderResponse {
  return RestoreOrderResponseFromJSONTyped(json, false);
}

export function RestoreOrderResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RestoreOrderResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: OrderFromJSON(json["data"]),
    message: json["message"],
  };
}

export function RestoreOrderResponseToJSON(
  value?: RestoreOrderResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: OrderToJSON(value.data),
    message: value.message,
  };
}
