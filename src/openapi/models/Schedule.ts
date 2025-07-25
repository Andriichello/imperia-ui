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
 * Schedule resource object
 * @export
 * @interface Schedule
 */
export interface Schedule {
  /**
   *
   * @type {number}
   * @memberof Schedule
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  weekday: ScheduleWeekdayEnum;
  /**
   * Start hour of the day [0 ; 23].
   * @type {number}
   * @memberof Schedule
   */
  begHour: number;
  /**
   * End hour of the day [0 ; 23]. If less then beg_hour it,
   *      *   then it meens that it's a cross day schedule
   * @type {number}
   * @memberof Schedule
   */
  endHour: number;
  /**
   * Start minute of the day [0 ; 59].
   * @type {number}
   * @memberof Schedule
   */
  begMinute: number;
  /**
   * End minute of the day [0 ; 59].
   * @type {number}
   * @memberof Schedule
   */
  endMinute: number;
  /**
   *
   * @type {number}
   * @memberof Schedule
   */
  restaurantId: number | null;
  /**
   * Number of minutes untill the restaurant starts operating.
   *      If null then restaurant is already operating on this schedule.
   * @type {number}
   * @memberof Schedule
   */
  begsIn: number | null;
  /**
   * Number of minutes untill the restaurant ends operating.
   * @type {number}
   * @memberof Schedule
   */
  endsIn: number | null;
  /**
   *
   * @type {boolean}
   * @memberof Schedule
   */
  isCrossDate: boolean;
  /**
   *
   * @type {Date}
   * @memberof Schedule
   */
  closestDate: Date | null;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  timezone: string | null;
  /**
   * Minutes offset from UTC, which is already applied to `closest_date`
   * @type {number}
   * @memberof Schedule
   */
  timezoneOffset: number | null;
  /**
   *
   * @type {boolean}
   * @memberof Schedule
   */
  archived: boolean;
}

/**
 * @export
 */
export const ScheduleWeekdayEnum = {
  Monday: "monday",
  Tuesday: "tuesday",
  Wednesday: "wednesday",
  Thursday: "thursday",
  Friday: "friday",
  Saturday: "saturday",
  Sunday: "sunday",
} as const;
export type ScheduleWeekdayEnum =
  (typeof ScheduleWeekdayEnum)[keyof typeof ScheduleWeekdayEnum];

/**
 * Check if a given object implements the Schedule interface.
 */
export function instanceOfSchedule(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "type" in value;
  isInstance = isInstance && "weekday" in value;
  isInstance = isInstance && "begHour" in value;
  isInstance = isInstance && "endHour" in value;
  isInstance = isInstance && "begMinute" in value;
  isInstance = isInstance && "endMinute" in value;
  isInstance = isInstance && "restaurantId" in value;
  isInstance = isInstance && "begsIn" in value;
  isInstance = isInstance && "endsIn" in value;
  isInstance = isInstance && "isCrossDate" in value;
  isInstance = isInstance && "closestDate" in value;
  isInstance = isInstance && "timezone" in value;
  isInstance = isInstance && "timezoneOffset" in value;
  isInstance = isInstance && "archived" in value;

  return isInstance;
}

export function ScheduleFromJSON(json: any): Schedule {
  return ScheduleFromJSONTyped(json, false);
}

export function ScheduleFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Schedule {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    type: json["type"],
    weekday: json["weekday"],
    begHour: json["beg_hour"],
    endHour: json["end_hour"],
    begMinute: json["beg_minute"],
    endMinute: json["end_minute"],
    restaurantId: json["restaurant_id"],
    begsIn: json["begs_in"],
    endsIn: json["ends_in"],
    isCrossDate: json["is_cross_date"],
    closestDate:
      json["closest_date"] === null ? null : new Date(json["closest_date"]),
    timezone: json["timezone"],
    timezoneOffset: json["timezone_offset"],
    archived: json["archived"],
  };
}

export function ScheduleToJSON(value?: Schedule | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    type: value.type,
    weekday: value.weekday,
    beg_hour: value.begHour,
    end_hour: value.endHour,
    beg_minute: value.begMinute,
    end_minute: value.endMinute,
    restaurant_id: value.restaurantId,
    begs_in: value.begsIn,
    ends_in: value.endsIn,
    is_cross_date: value.isCrossDate,
    closest_date:
      value.closestDate === null ? null : value.closestDate.toISOString(),
    timezone: value.timezone,
    timezone_offset: value.timezoneOffset,
    archived: value.archived,
  };
}
