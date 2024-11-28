export class TokenUtilities {
    static getToken() {
        return localStorage.getItem('auth_token');
    }

    static deleteToken() {
        localStorage.removeItem('auth_token');
    }

    static setToken(token) {
        localStorage.setItem('auth_token', token);
    }

    static isAuthorized() {
        const token = TokenUtilities.getToken();
        return !!token;
    }
}
