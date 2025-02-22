import {DateTime} from "luxon";
import {Schedule, ScheduleWeekdayEnum} from "@/openapi";

export function authHeaders(token: string, type = 'bearer'): object {
    if (type === 'bearer') {
        return { authorization: 'Bearer ' + token };
    }

    return {};
}

export function jsonHeaders(): object {
    return { 'content-type': 'application/json' };
}

export function randomString(length = 4) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const charLength = chars.length;

    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }

    return result;
}

export function sameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export function currentTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function dateTimezone(date: Date): string {
    return date.toString().match(/([A-Z]+[+-][0-9]+.*)/)[1];
}

export function dateFormatted(date: Date | string | null): string | null {
    if (date === null) {
        return null;
    }

    date = new Date(date);

    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return day + '/' + month + '/' + year;
}

export function timeFormatted(date: Date | string | null): string | null {
    if (date === null) {
        return null;
    }

    date = new Date(date);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return hours + ':' + minutes;
}

export function priceFormatted(price: number | null): string | null {
    if (price === null || price === undefined) {
        return null;
    }

    if (Number.isInteger(price)) {
        return price + ' ₴';
    }

    return price.toFixed(2) + ' ₴';
}

export function sortByPopularity(items: object[]): object[] {
    return items.sort((a, b) => (b?.['popularity'] ?? 0) - (a?.['popularity'] ?? 0));
}

export function sortSchedules(items: Schedule[]): Schedule[] {
    const schedules = [];

    for (const scheduleWeekdayEnumKey in ScheduleWeekdayEnum) {
        const weekday = ScheduleWeekdayEnum[scheduleWeekdayEnumKey];
        const schedule = items.find((s) => s.weekday === weekday);

        if (schedule) {
            schedules.push(schedule);
        }
    }

    return schedules;
}
export function filterAndSortSchedules(items: Schedule[]): Schedule[] {
    const filtered = items.filter((schedule) => !schedule.archived);
    const schedules = [];

    for (const scheduleWeekdayEnumKey in ScheduleWeekdayEnum) {
        const weekday = ScheduleWeekdayEnum[scheduleWeekdayEnumKey];
        const schedule = filtered.find((s) => s.weekday === weekday);

        if (schedule) {
            schedules.push(schedule);
        }
    }

    return schedules;
}
export function getCurrentUtcWithOffset(timezoneOffset: number) {
    // Get the current UTC time and apply the timezone offset
    return DateTime.utc()
      .plus({minutes: timezoneOffset});
}

export function getNextOccurrence(baseDate: DateTime, weekday: string) {
    // Map weekday name to a number (1 = Monday, 7 = Sunday)
    const weekdayMap = {
        monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7,
    };

    const targetWeekday = weekdayMap[weekday.toLowerCase()];
    const daysUntilNext = (targetWeekday + 7 - baseDate.weekday) % 7;

    return baseDate.plus({days: daysUntilNext});
}

export function getUpcomingSchedules(now: DateTime, schedules: Schedule[], timezoneOffset: number): object[] {
    const upcomingSchedules = [];

    schedules.forEach(schedule => {
        // Find the next occurrence of the schedule's weekday
        let nextOccurrenceBeg = getNextOccurrence(now, schedule.weekday)
          .set({hour: schedule.begHour, minute: schedule.begMinute, second: 0, millisecond: 0})
          .minus({minutes: timezoneOffset}); // Adjust back to UTC

        let nextOccurrenceEnd = getNextOccurrence(now, schedule.weekday)
          .set({hour: schedule.endHour, minute: schedule.endMinute, second: 0, millisecond: 0})
          .minus({minutes: timezoneOffset}); // Adjust back to UTC

        // Handle cross-date schedules (end time is before start time)
        if (nextOccurrenceEnd < nextOccurrenceBeg) {
            nextOccurrenceEnd = nextOccurrenceEnd.plus({days: 1});
        }


        if (nextOccurrenceBeg.toMillis() < now.toMillis()) {
            if (nextOccurrenceEnd > now.toMillis()) {
                upcomingSchedules.push({
                    weekday: schedule.weekday,
                    closestBegDate: nextOccurrenceBeg,
                    closestEndDate: nextOccurrenceEnd,
                });

                nextOccurrenceBeg = nextOccurrenceBeg.plus({days: 7});
                nextOccurrenceEnd = nextOccurrenceEnd.plus({days: 7});
            } else {
                nextOccurrenceBeg = nextOccurrenceBeg.plus({days: 7});
                nextOccurrenceEnd = nextOccurrenceEnd.plus({days: 7});
            }
        }

        upcomingSchedules.push({
            weekday: schedule.weekday,
            closestBegDate: nextOccurrenceBeg,
            closestEndDate: nextOccurrenceEnd,
        });
    });

    return upcomingSchedules.sort((a, b) => a.closestBegDate - b.closestBegDate);
}

export class ResponseErrors {
    public status?: number;
    public statusText?: string | null;
    public message?: string;
    public errors?: string[] | object;

    constructor(message: string | null = null, errors: string[] | object | null = null) {
        if (message) {
            this.message = message;
        }
        if (errors) {
            this.errors = errors;
        }
    }

    public static async from(response: Response | null): Promise<ResponseErrors> {
        if (!response || response.ok) {
            return new ResponseErrors()
        }

        try {
            const result = new ResponseErrors()

            if (response.status) {
                result.status = response.status;
            }
            if (response.statusText) {
                result.statusText = response.statusText;
            }

            const json = await response.json();
            if (json.message) {
                result.message = json.message;
            }
            if (json.errors) {
                result.errors = json.errors;
            }
            if (result.errors === undefined && (result.status < 200 || result.status > 299)) {
                result.errors = {
                    base: [json.message ?? result.statusText ?? 'Error occurred'],
                };
            }

            return result;
        } catch (e) {
            return new ResponseErrors()
        }
    }

    /**
     * Determines if there are any errors.
     * 
     * @returns {boolean}
     */
    public hasErrors(): boolean {
        return this.errors !== undefined;
    }

    /**
     * Determines if there is an error message.
     * 
     * @returns {boolean}
     */
    public hasMessage(): boolean {
        return this.message !== undefined;
    }

    /**
     * Determines if there is no error.
     * 
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return !this.hasErrors() && !this.hasMessage();
    }

    /**
     * Determines if there is an error.
     * 
     * @returns {boolean}
     */
    public isNotEmpty(): boolean {
        return !this.isEmpty();
    }

    /**
     * Extracts errors about specific attribute.
     * 
     * @returns {string[]|null}
     */
    public about(attribute: string): string[] | null {
        return this.hasErrors() ? this.errors[attribute] : null;
    }
}