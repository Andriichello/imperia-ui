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
import type { Discount } from "./Discount";
import {
  DiscountFromJSON,
  DiscountFromJSONTyped,
  DiscountToJSON,
} from "./Discount";

/**
 * Show discount response object.
 * @export
 * @interface ShowDiscountResponse
 */
export interface ShowDiscountResponse {
  /**
   *
   * @type {Discount}
   * @memberof ShowDiscountResponse
   */
  data: Discount;
  /**
   *
   * @type {string}
   * @memberof ShowDiscountResponse
   */
  message: string;
}

/**
 * Check if a given object implements the ShowDiscountResponse interface.
 */
export function instanceOfShowDiscountResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function ShowDiscountResponseFromJSON(json: any): ShowDiscountResponse {
  return ShowDiscountResponseFromJSONTyped(json, false);
}

export function ShowDiscountResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ShowDiscountResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: DiscountFromJSON(json["data"]),
    message: json["message"],
  };
}

export function ShowDiscountResponseToJSON(
  value?: ShowDiscountResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: DiscountToJSON(value.data),
    message: value.message,
  };
}
