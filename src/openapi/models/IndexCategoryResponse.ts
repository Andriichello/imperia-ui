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
import type { Category } from "./Category";
import {
  CategoryFromJSON,
  CategoryFromJSONTyped,
  CategoryToJSON,
} from "./Category";
import type { PaginationMeta } from "./PaginationMeta";
import {
  PaginationMetaFromJSON,
  PaginationMetaFromJSONTyped,
  PaginationMetaToJSON,
} from "./PaginationMeta";

/**
 * Index categories response object.
 * @export
 * @interface IndexCategoryResponse
 */
export interface IndexCategoryResponse {
  /**
   *
   * @type {Array<Category>}
   * @memberof IndexCategoryResponse
   */
  data: Array<Category>;
  /**
   *
   * @type {PaginationMeta}
   * @memberof IndexCategoryResponse
   */
  meta: PaginationMeta;
  /**
   *
   * @type {string}
   * @memberof IndexCategoryResponse
   */
  message: string;
}

/**
 * Check if a given object implements the IndexCategoryResponse interface.
 */
export function instanceOfIndexCategoryResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "meta" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function IndexCategoryResponseFromJSON(
  json: any
): IndexCategoryResponse {
  return IndexCategoryResponseFromJSONTyped(json, false);
}

export function IndexCategoryResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): IndexCategoryResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: (json["data"] as Array<any>).map(CategoryFromJSON),
    meta: PaginationMetaFromJSON(json["meta"]),
    message: json["message"],
  };
}

export function IndexCategoryResponseToJSON(
  value?: IndexCategoryResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: (value.data as Array<any>).map(CategoryToJSON),
    meta: PaginationMetaToJSON(value.meta),
    message: value.message,
  };
}
