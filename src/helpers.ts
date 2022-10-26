export function authHeaders(token: string, type = 'bearer'): object {
    if (type === 'bearer') {
        return { authorization: 'Bearer ' + token };
    }

    return {};
}