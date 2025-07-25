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
import type { Media } from "./Media";
import { MediaFromJSON, MediaFromJSONTyped, MediaToJSON } from "./Media";

/**
 * Store media response object.
 * @export
 * @interface StoreMediaResponse
 */
export interface StoreMediaResponse {
  /**
   *
   * @type {Media}
   * @memberof StoreMediaResponse
   */
  data: Media;
  /**
   *
   * @type {string}
   * @memberof StoreMediaResponse
   */
  message: string;
}

/**
 * Check if a given object implements the StoreMediaResponse interface.
 */
export function instanceOfStoreMediaResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function StoreMediaResponseFromJSON(json: any): StoreMediaResponse {
  return StoreMediaResponseFromJSONTyped(json, false);
}

export function StoreMediaResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): StoreMediaResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: MediaFromJSON(json["data"]),
    message: json["message"],
  };
}

export function StoreMediaResponseToJSON(
  value?: StoreMediaResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: MediaToJSON(value.data),
    message: value.message,
  };
}
