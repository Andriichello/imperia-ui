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
import type { Customer } from "./Customer";
import {
  CustomerFromJSON,
  CustomerFromJSONTyped,
  CustomerToJSON,
} from "./Customer";

/**
 * Family member resource object
 * @export
 * @interface FamilyMember
 */
export interface FamilyMember {
  /**
   *
   * @type {number}
   * @memberof FamilyMember
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof FamilyMember
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof FamilyMember
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof FamilyMember
   */
  relation: FamilyMemberRelationEnum;
  /**
   *
   * @type {string}
   * @memberof FamilyMember
   */
  birthdate: string;
  /**
   *
   * @type {number}
   * @memberof FamilyMember
   */
  relativeId: number;
  /**
   *
   * @type {Customer}
   * @memberof FamilyMember
   */
  relative?: Customer;
}

/**
 * @export
 */
export const FamilyMemberRelationEnum = {
  Child: "child",
  Parent: "parent",
  Grandparent: "grandparent",
  Partner: "partner",
} as const;
export type FamilyMemberRelationEnum =
  (typeof FamilyMemberRelationEnum)[keyof typeof FamilyMemberRelationEnum];

/**
 * Check if a given object implements the FamilyMember interface.
 */
export function instanceOfFamilyMember(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "type" in value;
  isInstance = isInstance && "name" in value;
  isInstance = isInstance && "relation" in value;
  isInstance = isInstance && "birthdate" in value;
  isInstance = isInstance && "relativeId" in value;

  return isInstance;
}

export function FamilyMemberFromJSON(json: any): FamilyMember {
  return FamilyMemberFromJSONTyped(json, false);
}

export function FamilyMemberFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): FamilyMember {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    type: json["type"],
    name: json["name"],
    relation: json["relation"],
    birthdate: json["birthdate"],
    relativeId: json["relative_id"],
    relative: !exists(json, "relative")
      ? undefined
      : CustomerFromJSON(json["relative"]),
  };
}

export function FamilyMemberToJSON(value?: FamilyMember | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    type: value.type,
    name: value.name,
    relation: value.relation,
    birthdate: value.birthdate,
    relative_id: value.relativeId,
    relative: CustomerToJSON(value.relative),
  };
}
