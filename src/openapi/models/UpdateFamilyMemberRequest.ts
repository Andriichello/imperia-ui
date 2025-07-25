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
 * Update family member request
 * @export
 * @interface UpdateFamilyMemberRequest
 */
export interface UpdateFamilyMemberRequest {
  /**
   *
   * @type {string}
   * @memberof UpdateFamilyMemberRequest
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateFamilyMemberRequest
   */
  relation?: UpdateFamilyMemberRequestRelationEnum;
  /**
   *
   * @type {Date}
   * @memberof UpdateFamilyMemberRequest
   */
  birthdate?: Date;
  /**
   * The id of the customer, who is related to this family member.
   * @type {number}
   * @memberof UpdateFamilyMemberRequest
   */
  relativeId?: number;
}

/**
 * @export
 */
export const UpdateFamilyMemberRequestRelationEnum = {
  Child: "child",
  Parent: "parent",
  Grandparent: "grandparent",
  Partner: "partner",
} as const;
export type UpdateFamilyMemberRequestRelationEnum =
  (typeof UpdateFamilyMemberRequestRelationEnum)[keyof typeof UpdateFamilyMemberRequestRelationEnum];

/**
 * Check if a given object implements the UpdateFamilyMemberRequest interface.
 */
export function instanceOfUpdateFamilyMemberRequest(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UpdateFamilyMemberRequestFromJSON(
  json: any
): UpdateFamilyMemberRequest {
  return UpdateFamilyMemberRequestFromJSONTyped(json, false);
}

export function UpdateFamilyMemberRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UpdateFamilyMemberRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    relation: !exists(json, "relation") ? undefined : json["relation"],
    birthdate: !exists(json, "birthdate")
      ? undefined
      : new Date(json["birthdate"]),
    relativeId: !exists(json, "relative_id") ? undefined : json["relative_id"],
  };
}

export function UpdateFamilyMemberRequestToJSON(
  value?: UpdateFamilyMemberRequest | null
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
    birthdate:
      value.birthdate === undefined
        ? undefined
        : value.birthdate.toISOString().substr(0, 10),
    relative_id: value.relativeId,
  };
}
