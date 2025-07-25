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
 * Store family member request
 * @export
 * @interface StoreFamilyMemberRequest
 */
export interface StoreFamilyMemberRequest {
  /**
   *
   * @type {string}
   * @memberof StoreFamilyMemberRequest
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof StoreFamilyMemberRequest
   */
  relation: StoreFamilyMemberRequestRelationEnum;
  /**
   *
   * @type {Date}
   * @memberof StoreFamilyMemberRequest
   */
  birthdate: Date;
  /**
   * The id of the customer, who is related to this family member.
   * @type {number}
   * @memberof StoreFamilyMemberRequest
   */
  relativeId: number;
}

/**
 * @export
 */
export const StoreFamilyMemberRequestRelationEnum = {
  Child: "child",
  Parent: "parent",
  Grandparent: "grandparent",
  Partner: "partner",
} as const;
export type StoreFamilyMemberRequestRelationEnum =
  (typeof StoreFamilyMemberRequestRelationEnum)[keyof typeof StoreFamilyMemberRequestRelationEnum];

/**
 * Check if a given object implements the StoreFamilyMemberRequest interface.
 */
export function instanceOfStoreFamilyMemberRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "name" in value;
  isInstance = isInstance && "relation" in value;
  isInstance = isInstance && "birthdate" in value;
  isInstance = isInstance && "relativeId" in value;

  return isInstance;
}

export function StoreFamilyMemberRequestFromJSON(
  json: any
): StoreFamilyMemberRequest {
  return StoreFamilyMemberRequestFromJSONTyped(json, false);
}

export function StoreFamilyMemberRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): StoreFamilyMemberRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json["name"],
    relation: json["relation"],
    birthdate: new Date(json["birthdate"]),
    relativeId: json["relative_id"],
  };
}

export function StoreFamilyMemberRequestToJSON(
  value?: StoreFamilyMemberRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    relation: value.relation,
    birthdate: value.birthdate.toISOString().substr(0, 10),
    relative_id: value.relativeId,
  };
}
