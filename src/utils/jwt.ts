import {decodeToken, isExpired} from "react-jwt";

export async function saveJwt(token: string) {
    await localStorage.setItem('jwt', token);
}

export async function getJwt() {
    return localStorage.getItem('jwt');
}

export async function removeJwt() {
    await localStorage.removeItem('jwt');
}

export async function decodeJwt(token: string) {
    const decodedToken = decodeToken(token);
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;

    if (isTokenExpired)
        return null;

    return decodedToken;
}