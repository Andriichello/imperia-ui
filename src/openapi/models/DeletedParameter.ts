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

/**
 * Query parameter, which determines if soft-deleted records should be
 *     fetched from database. Available relations: `only`, `with` and `without`, which is a default one.
 * @export
 */
export const DeletedParameter = {
  Only: "only",
  With: "with",
  Without: "without",
} as const;
export type DeletedParameter =
  (typeof DeletedParameter)[keyof typeof DeletedParameter];

export function DeletedParameterFromJSON(json: any): DeletedParameter {
  return DeletedParameterFromJSONTyped(json, false);
}

export function DeletedParameterFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DeletedParameter {
  return json as DeletedParameter;
}

export function DeletedParameterToJSON(value?: DeletedParameter | null): any {
  return value as any;
}
