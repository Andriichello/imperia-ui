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
 * Media resource object
 * @export
 * @interface Media
 */
export interface Media {
  /**
   *
   * @type {number}
   * @memberof Media
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  mime?: string;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  extension: string;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  title: string | null;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  description: string | null;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  disk: string | null;
  /**
   * Must start and end with `/`.
   * @type {string}
   * @memberof Media
   */
  folder: string;
  /**
   *
   * @type {number}
   * @memberof Media
   */
  order: number | null;
  /**
   *
   * @type {string}
   * @memberof Media
   */
  url: string;
  /**
   * Media metadata resource object
   * @type {object}
   * @memberof Media
   */
  metadata: object;
  /**
   *
   * @type {Array<Media>}
   * @memberof Media
   */
  variants?: Array<Media>;
}

/**
 * Check if a given object implements the Media interface.
 */
export function instanceOfMedia(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "type" in value;
  isInstance = isInstance && "name" in value;
  isInstance = isInstance && "extension" in value;
  isInstance = isInstance && "title" in value;
  isInstance = isInstance && "description" in value;
  isInstance = isInstance && "disk" in value;
  isInstance = isInstance && "folder" in value;
  isInstance = isInstance && "order" in value;
  isInstance = isInstance && "url" in value;
  isInstance = isInstance && "metadata" in value;

  return isInstance;
}

export function MediaFromJSON(json: any): Media {
  return MediaFromJSONTyped(json, false);
}

export function MediaFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Media {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    type: json["type"],
    name: json["name"],
    mime: !exists(json, "mime") ? undefined : json["mime"],
    extension: json["extension"],
    title: json["title"],
    description: json["description"],
    disk: json["disk"],
    folder: json["folder"],
    order: json["order"],
    url: json["url"],
    metadata: json["metadata"],
    variants: !exists(json, "variants")
      ? undefined
      : (json["variants"] as Array<any>).map(MediaFromJSON),
  };
}

export function MediaToJSON(value?: Media | null): any {
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
    mime: value.mime,
    extension: value.extension,
    title: value.title,
    description: value.description,
    disk: value.disk,
    folder: value.folder,
    order: value.order,
    url: value.url,
    metadata: value.metadata,
    variants:
      value.variants === undefined
        ? undefined
        : (value.variants as Array<any>).map(MediaToJSON),
  };
}
