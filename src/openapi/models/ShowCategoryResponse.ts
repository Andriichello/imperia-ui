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

/**
 * Show category response object.
 * @export
 * @interface ShowCategoryResponse
 */
export interface ShowCategoryResponse {
  /**
   *
   * @type {Category}
   * @memberof ShowCategoryResponse
   */
  data: Category;
  /**
   *
   * @type {string}
   * @memberof ShowCategoryResponse
   */
  message: string;
}

/**
 * Check if a given object implements the ShowCategoryResponse interface.
 */
export function instanceOfShowCategoryResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function ShowCategoryResponseFromJSON(json: any): ShowCategoryResponse {
  return ShowCategoryResponseFromJSONTyped(json, false);
}

export function ShowCategoryResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ShowCategoryResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: CategoryFromJSON(json["data"]),
    message: json["message"],
  };
}

export function ShowCategoryResponseToJSON(
  value?: ShowCategoryResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: CategoryToJSON(value.data),
    message: value.message,
  };
}
