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
 * Store customer request. `email` or `phone`
 *            must be specified.
 * @export
 * @interface StoreCustomerRequest
 */
export interface StoreCustomerRequest {
  /**
   *
   * @type {number}
   * @memberof StoreCustomerRequest
   */
  restaurantId: number | null;
  /**
   *
   * @type {string}
   * @memberof StoreCustomerRequest
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof StoreCustomerRequest
   */
  surname: string;
  /**
   *
   * @type {string}
   * @memberof StoreCustomerRequest
   */
  email: string | null;
  /**
   * Phone number may start with a plus and must contain only digits 0-9.
   * @type {string}
   * @memberof StoreCustomerRequest
   */
  phone: string | null;
  /**
   *
   * @type {Date}
   * @memberof StoreCustomerRequest
   */
  birthdate: Date | null;
}

/**
 * Check if a given object implements the StoreCustomerRequest interface.
 */
export function instanceOfStoreCustomerRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "restaurantId" in value;
  isInstance = isInstance && "name" in value;
  isInstance = isInstance && "surname" in value;
  isInstance = isInstance && "email" in value;
  isInstance = isInstance && "phone" in value;
  isInstance = isInstance && "birthdate" in value;

  return isInstance;
}

export function StoreCustomerRequestFromJSON(json: any): StoreCustomerRequest {
  return StoreCustomerRequestFromJSONTyped(json, false);
}

export function StoreCustomerRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): StoreCustomerRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    restaurantId: json["restaurant_id"],
    name: json["name"],
    surname: json["surname"],
    email: json["email"],
    phone: json["phone"],
    birthdate: json["birthdate"] === null ? null : new Date(json["birthdate"]),
  };
}

export function StoreCustomerRequestToJSON(
  value?: StoreCustomerRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    restaurant_id: value.restaurantId,
    name: value.name,
    surname: value.surname,
    email: value.email,
    phone: value.phone,
    birthdate:
      value.birthdate === null
        ? null
        : value.birthdate.toISOString().substr(0, 10),
  };
}
