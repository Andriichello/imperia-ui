export function authHeaders(token: string, type = 'bearer'): object {
    if (type === 'bearer') {
        return { authorization: 'Bearer ' + token };
    }

    return {};
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

export class ResponseErrors {
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

    public static async from(response: Response): Promise<ResponseErrors> {
        if (response.ok) {
            return new ResponseErrors()
        }

        try {
            const result = new ResponseErrors()

            const json = await response.json();
            if (json.message) {
                result.message = json.message;
            }
            if (json.errors) {
                result.errors = json.errors;
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