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
 * Update notification request
 * @export
 * @interface UpdateNotificationRequest
 */
export interface UpdateNotificationRequest {
  /**
   *
   * @type {string}
   * @memberof UpdateNotificationRequest
   */
  subject?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateNotificationRequest
   */
  body?: string;
  /**
   *
   * @type {object}
   * @memberof UpdateNotificationRequest
   */
  payload?: object | null;
  /**
   * Date and time when notification should be sent. Only future values are acceptable.
   * @type {Date}
   * @memberof UpdateNotificationRequest
   */
  sendAt?: Date;
}

/**
 * Check if a given object implements the UpdateNotificationRequest interface.
 */
export function instanceOfUpdateNotificationRequest(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UpdateNotificationRequestFromJSON(
  json: any
): UpdateNotificationRequest {
  return UpdateNotificationRequestFromJSONTyped(json, false);
}

export function UpdateNotificationRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UpdateNotificationRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    subject: !exists(json, "subject") ? undefined : json["subject"],
    body: !exists(json, "body") ? undefined : json["body"],
    payload: !exists(json, "payload") ? undefined : json["payload"],
    sendAt: !exists(json, "send_at") ? undefined : new Date(json["send_at"]),
  };
}

export function UpdateNotificationRequestToJSON(
  value?: UpdateNotificationRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    subject: value.subject,
    body: value.body,
    payload: value.payload,
    send_at:
      value.sendAt === undefined ? undefined : value.sendAt.toISOString(),
  };
}
