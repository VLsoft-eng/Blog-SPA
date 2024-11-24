export class TokenUtilities {
    static getToken() {
        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        if (token) {
            return token.split('=')[1]
        }
        return null;
    }

    static deleteToken() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    static setToken(token) {
        document.cookie = `auth_token=${token}; path=/; samesite=strict`;
    }
}