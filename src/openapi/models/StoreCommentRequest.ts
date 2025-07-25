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
 * Store comment request
 * @export
 * @interface StoreCommentRequest
 */
export interface StoreCommentRequest {
  /**
   *
   * @type {string}
   * @memberof StoreCommentRequest
   */
  text: string;
  /**
   *
   * @type {number}
   * @memberof StoreCommentRequest
   */
  commentableId: number;
  /**
   * Value for it must be obrained from the target resource's type property.
   * @type {string}
   * @memberof StoreCommentRequest
   */
  commentableType: string;
}

/**
 * Check if a given object implements the StoreCommentRequest interface.
 */
export function instanceOfStoreCommentRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "text" in value;
  isInstance = isInstance && "commentableId" in value;
  isInstance = isInstance && "commentableType" in value;

  return isInstance;
}

export function StoreCommentRequestFromJSON(json: any): StoreCommentRequest {
  return StoreCommentRequestFromJSONTyped(json, false);
}

export function StoreCommentRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): StoreCommentRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    text: json["text"],
    commentableId: json["commentable_id"],
    commentableType: json["commentable_type"],
  };
}

export function StoreCommentRequestToJSON(
  value?: StoreCommentRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    text: value.text,
    commentable_id: value.commentableId,
    commentable_type: value.commentableType,
  };
}
