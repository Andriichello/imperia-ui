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
import type { FamilyMember } from "./FamilyMember";
import {
  FamilyMemberFromJSON,
  FamilyMemberFromJSONTyped,
  FamilyMemberToJSON,
} from "./FamilyMember";
import type { PaginationMeta } from "./PaginationMeta";
import {
  PaginationMetaFromJSON,
  PaginationMetaFromJSONTyped,
  PaginationMetaToJSON,
} from "./PaginationMeta";

/**
 * Index family members response object.
 * @export
 * @interface IndexFamilyMemberResponse
 */
export interface IndexFamilyMemberResponse {
  /**
   *
   * @type {Array<FamilyMember>}
   * @memberof IndexFamilyMemberResponse
   */
  data: Array<FamilyMember>;
  /**
   *
   * @type {PaginationMeta}
   * @memberof IndexFamilyMemberResponse
   */
  meta: PaginationMeta;
  /**
   *
   * @type {string}
   * @memberof IndexFamilyMemberResponse
   */
  message: string;
}

/**
 * Check if a given object implements the IndexFamilyMemberResponse interface.
 */
export function instanceOfIndexFamilyMemberResponse(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data" in value;
  isInstance = isInstance && "meta" in value;
  isInstance = isInstance && "message" in value;

  return isInstance;
}

export function IndexFamilyMemberResponseFromJSON(
  json: any
): IndexFamilyMemberResponse {
  return IndexFamilyMemberResponseFromJSONTyped(json, false);
}

export function IndexFamilyMemberResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): IndexFamilyMemberResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: (json["data"] as Array<any>).map(FamilyMemberFromJSON),
    meta: PaginationMetaFromJSON(json["meta"]),
    message: json["message"],
  };
}

export function IndexFamilyMemberResponseToJSON(
  value?: IndexFamilyMemberResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: (value.data as Array<any>).map(FamilyMemberToJSON),
    meta: PaginationMetaToJSON(value.meta),
    message: value.message,
  };
}
