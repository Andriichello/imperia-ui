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
import type { Space } from "./Space";
import { SpaceFromJSON, SpaceFromJSONTyped, SpaceToJSON } from "./Space";

/**
 * Show spaces response object.
 * @export
 * @interface ShowSpaceResponse
 */
export interface ShowSpaceResponse {
  /**
   *
   * @type {Space}
   * @memberof ShowSpaceResponse
   */
  data: Space;
  /**
   *
   * @type {string}
   * @memberof ShowSpaceResponse
   */
  message: string;
}

/**
 * Check if a given object implements the ShowSpaceResponse interface.
 */
export function instanceOfShowSpaceResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function ShowSpaceResponseFromJSON(json: any): ShowSpaceResponse {
  return ShowSpaceResponseFromJSONTyped(json, false);
}

export function ShowSpaceResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ShowSpaceResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: SpaceFromJSON(json["data"]),
    message: json["message"],
  };
}

export function ShowSpaceResponseToJSON(value?: ShowSpaceResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: SpaceToJSON(value.data),
    message: value.message,
  };
}
