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
import type { Product } from "./Product";
import {
  ProductFromJSON,
  ProductFromJSONTyped,
  ProductToJSON,
} from "./Product";

/**
 * Restore product response object.
 * @export
 * @interface RestoreProductResponse
 */
export interface RestoreProductResponse {
  /**
   *
   * @type {Product}
   * @memberof RestoreProductResponse
   */
  data: Product;
  /**
   *
   * @type {string}
   * @memberof RestoreProductResponse
   */
  message: string;
}

/**
 * Check if a given object implements the RestoreProductResponse interface.
 */
export function instanceOfRestoreProductResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function RestoreProductResponseFromJSON(
  json: any
): RestoreProductResponse {
  return RestoreProductResponseFromJSONTyped(json, false);
}

export function RestoreProductResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RestoreProductResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: ProductFromJSON(json["data"]),
    message: json["message"],
  };
}

export function RestoreProductResponseToJSON(
  value?: RestoreProductResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: ProductToJSON(value.data),
    message: value.message,
  };
}
