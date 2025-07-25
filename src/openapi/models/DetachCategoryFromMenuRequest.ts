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
 * Detach category from menu request.
 * @export
 * @interface DetachCategoryFromMenuRequest
 */
export interface DetachCategoryFromMenuRequest {
  /**
   *
   * @type {number}
   * @memberof DetachCategoryFromMenuRequest
   */
  menuId: number;
  /**
   *
   * @type {number}
   * @memberof DetachCategoryFromMenuRequest
   */
  categoryId: number;
}

/**
 * Check if a given object implements the DetachCategoryFromMenuRequest interface.
 */
export function instanceOfDetachCategoryFromMenuRequest(
  value: object
): boolean {
  let isInstance = true;
  isInstance = isInstance && "menuId" in value;
  isInstance = isInstance && "categoryId" in value;

  return isInstance;
}

export function DetachCategoryFromMenuRequestFromJSON(
  json: any
): DetachCategoryFromMenuRequest {
  return DetachCategoryFromMenuRequestFromJSONTyped(json, false);
}

export function DetachCategoryFromMenuRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DetachCategoryFromMenuRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    menuId: json["menu_id"],
    categoryId: json["category_id"],
  };
}

export function DetachCategoryFromMenuRequestToJSON(
  value?: DetachCategoryFromMenuRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    menu_id: value.menuId,
    category_id: value.categoryId,
  };
}
