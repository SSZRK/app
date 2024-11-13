import '../index.css';
import {useEffect, useState} from "react";
import Loading from "../components/common/loading.tsx";
import {callApi, Method} from "../utils/call_api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {getJwt, removeJwt} from "../utils/jwt.ts";
import {listen} from "@tauri-apps/api/event";

export default function ModuleSelector() {
    const navigate = useNavigate();
    const {projectId} = useParams();
    const [jwt, setJwt] = useState<string | null>('');

    const [loading, setLoading] = useState(true);
    const [isUserLogged, setIsUserLogged] = useState(true);
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    const [isUserBanned, setIsUserBanned] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(true);

    const [user, setUser] = useState<any>({});

    useEffect(() => {
        getData();
    }, []);

    listen('open-admin', () => {
        navigate(`/${projectId}/admin`);
    });

    const getData = async () => {
        const token = await getJwt();
        setJwt(token);

        const response = await callApi('/users/get-by-auth-id', {
            token,
            projectId,
        }, Method.POST);

        if (!response.data || response.data.error) {
            setLoading(false);
            switch (response.data.error.code) {
                case 'email-not-verified':
                    return setIsEmailVerified(false);
                case 'user-banned':
                    return setIsUserBanned(true);
                case 'user-not-verified':
                    return setIsUserVerified(false);
                case 'user-not-found':
                    return setIsUserLogged(false);
                default:
                    return setIsUserLogged(false);
            }
        }

        setIsUserLogged(true);
        setLoading(false);
        setUser(response.data.data);
    }

    const handleVerificationSend = async () => {
        setLoading(true);
        await callApi('/auth/send-email-verification', {
            token: jwt,
        }, Method.POST);
        setLoading(false);
    }

    const logout = async () => {
        await removeJwt();
        navigate(`/${projectId}/login`);
    }

    if (loading)
        return (
            <div
                className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center select-none h-screen">
                <Loading enabled={loading}/>
            </div>
        );

    if (!isUserLogged)
        return (
            <div
                className="bg-gray-100 bg-[url(../public/Przejazd.webp)] bg-scroll bg-cover bg-no-repeat bg-center flex items-center justify-center select-none h-screen">
                <a href="/about"
                   className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                    <img src="/icon-full.png" alt="logo"/>
                </a>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-2">Nie jesteś zalogowany</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Aby wyświetlić tę stronę musisz się
                        zalogować</p>
                    <button type="submit" onClick={() => navigate(`/${projectId}/login`)}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Wróć
                        do logowania
                    </button>
                </div>
            </div>
        );

    if (!isEmailVerified)
        return (
            <div
                className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center select-none h-screen">
                <a href="/about"
                   className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                    <img src="/icon-full.png" alt="logo"/>
                </a>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-2">Weryfikacja email</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Aby zalogować się do tego projektu musisz
                        zweryfikować swój adres email.</p>
                    <button type="submit" onClick={() => handleVerificationSend()}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Wyślij
                        email
                    </button>
                    <button type="submit" onClick={() => window.location.reload()}
                            className="w-full bg-gray-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Odśwież
                    </button>
                </div>
            </div>
        );

    if (isUserBanned)
        return (
            <div
                className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center select-none h-screen">
                <a href="/about"
                   className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                    <img src="/icon-full.png" alt="logo"/>
                </a>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-2">Zostałeś zbanowany</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Twoje konto zostało zbanowane przez
                        administratorów projektu. Jeśli chcesz uzyskać więcej informacji, skontaktuj się bezpośrednio z
                        administratorami tego projektu lub sprawdź swoją skrzynkę e-mail.</p>
                    <button type="submit" onClick={() => logout()}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Wyloguj
                        się
                    </button>
                </div>
            </div>
        );

    if (!isUserVerified)
        return (
            <div
                className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center select-none h-screen">
                <a href="/about"
                   className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                    <img src="/icon-full.png" alt="logo"/>
                </a>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-2">Niezweryfikowany</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Twoje konto nie zostało jeszcze zweryfikowane
                        lub weryfikacja została odrzucona przez administratorów projektu. Jeśli chcesz uzyskać więcej
                        informacji, skontaktuj się bezpośrednio z administratorami tego projektu lub sprawdź swoją
                        skrzynkę e-mail.</p>
                    <button type="submit" onClick={() => logout()}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Wyloguj
                        się
                    </button>
                    <button type="submit" onClick={() => window.location.reload()}
                            className="w-full bg-gray-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Odśwież
                    </button>
                </div>
            </div>
        );

    return (
        <div
            className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center select-none h-screen">
            <a href="/about"
               className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                <img src="/icon-full.png" alt="logo"/>
            </a>
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg shadow-black max-w-4xl w-full">
                <h2 className="text-2xl font-semibold text-center mb-8">Witaj, {user.username}</h2>
                <div className="grid items-center grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        className="flex flex-col rounded-lg items-center px-10 py-4 bg-white shadow-xl hover:scale-105 transition-all ">
                        <svg className="p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>train</title>
                            <path
                                d="M12,2C8,2 4,2.5 4,6V15.5A3.5,3.5 0 0,0 7.5,19L6,20.5V21H8.23L10.23,19H14L16,21H18V20.5L16.5,19A3.5,3.5 0 0,0 20,15.5V6C20,2.5 16.42,2 12,2M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M11,10H6V6H11V10M13,10V6H18V10H13M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17Z"/>
                        </svg>
                        <span className="text-lg font-semibold">Maszynista</span>
                    </button>
                    <button
                        className="flex flex-col rounded-lg items-center px-10 py-4 bg-white shadow-xl hover:scale-105 transition-all ">
                        <svg className="p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>diversify</title>
                            <path
                                d="M19 2V4H12C10.9 4 10 4.89 10 6V9H12V6H19V8L22 5L19 2M19 9V11H14V13H19V15L22 12L19 9M11.05 10C9.94 10 9.04 10.87 9.03 12S9.9 14 11 14C12.11 14 13 13.11 13 12C13 10.91 12.13 10.03 11.05 10M2 11V13H8V11H2M10 15V18C10 19.11 10.9 20 12 20H19V22L22 19L19 16V18H12V15H10Z"/>
                        </svg>
                        <span className="text-lg font-semibold">Dyżurny ruchu</span>
                    </button>
                    <button
                        className="flex flex-col rounded-lg items-center px-10 py-4 bg-white shadow-xl hover:scale-105 transition-all ">
                        <svg className="p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>railroad-light</title>
                            <path
                                d="M17.67,10.5C16.4,10.5 15.27,11.3 14.85,12.5H13.17V7.77L16.66,9.86L17.66,8.14L14.11,6L17.68,3.86L16.68,2.14L13.17,4.23V2H11.17V4.23L7.68,2.14L6.68,3.86L10.23,6L6.66,8.14L7.66,9.86L11.17,7.77V12.5H9.5C8.36,9.32 3.66,10.13 3.66,13.5C3.66,16.87 8.36,17.68 9.5,14.5H11.17V20A2,2 0 0,0 9.17,22H15.17A2,2 0 0,0 13.17,20V14.5H14.85C15.66,16.8 18.73,17.22 20.13,15.23C21.53,13.24 20.1,10.5 17.67,10.5M6.67,14.5C5.78,14.5 5.33,13.42 5.96,12.79C6.59,12.16 7.67,12.61 7.67,13.5A1,1 0 0,1 6.67,14.5M17.67,14.5C16.78,14.5 16.33,13.42 16.96,12.79C17.59,12.16 18.67,12.61 18.67,13.5A1,1 0 0,1 17.67,14.5Z"/>
                        </svg>
                        <span className="text-lg font-semibold">Dróżnik</span>
                    </button>
                    <button
                        className="flex flex-col rounded-lg items-center px-10 py-4 bg-white shadow-xl hover:scale-105 transition-all ">
                        <svg className="p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>account-tie-hat</title>
                            <path
                                d="M16 14.5C16 15.6 15.7 18 13.8 20.8L13 16L13.9 14.1C13.3 14.1 12.7 14 12 14S10.7 14.1 10.1 14.1L11 16L10.2 20.8C8.3 18.1 8 15.6 8 14.5C5.6 15.2 4 16.5 4 18V22H20V18C20 16.5 18.4 15.2 16 14.5M6 4.5C6 3.1 8.7 2 12 2S18 3.1 18 4.5C18 4.9 17.8 5.2 17.5 5.5C16.6 4.6 14.5 4 12 4S7.4 4.6 6.5 5.5C6.2 5.2 6 4.9 6 4.5M15.9 7.4C16 7.6 16 7.8 16 8C16 10.2 14.2 12 12 12S8 10.2 8 8C8 7.8 8 7.6 8.1 7.4C9.1 7.8 10.5 8 12 8S14.9 7.8 15.9 7.4M16.6 6.1C15.5 6.6 13.9 7 12 7S8.5 6.6 7.4 6.1C8.1 5.5 9.8 5 12 5S15.9 5.5 16.6 6.1Z"/>
                        </svg>
                        <span className="text-lg font-semibold">Kierownik pociągu</span>
                    </button>
                    <button
                        className="flex flex-col rounded-lg items-center px-10 py-4 bg-white shadow-xl hover:scale-105 transition-all ">
                        <svg className="p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>account</title>
                            <path
                                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                        </svg>
                        <span className="text-lg font-semibold">Konto</span>
                    </button>
                    <button onClick={() => logout()}
                            className="flex flex-col rounded-lg items-center px-10 py-4 bg-white shadow-xl hover:scale-105 transition-all ">
                        <svg className="p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>logout</title>
                            <path
                                d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"/>
                        </svg>
                        <span className="text-lg font-semibold">Wyloguj się</span>
                    </button>
                </div>
            </div>
        </div>
    );
}