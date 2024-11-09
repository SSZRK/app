import {useSearchParams, useParams, useNavigate} from "react-router-dom";
import {FormEvent, useContext, useState} from "react";
import {callApi, Method} from "../utils/call_api.ts";
import Alert, {AlertProps} from "../components/common/alert.tsx";
import useAuth from "../hooks/use-auth.ts";
import Loading from "../components/common/loading.tsx";
import {decodeJwt, saveJwt} from "../utils/jwt.ts";

export default function Login() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const {projectId} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        closeNotification();

        if (!email || !password) {
            setAlertData({
                title: 'Błąd',
                message: 'Wypełnij wszystkie pola',
                type: 'error',
            });
            return;
        }

        setLoading(true);
        const response = await callApi(
            '/auth/login',
            {
                email,
                password,
            },
            Method.POST
        );

        if (!response.data) {
            setLoading(false);
            return;
        }

        if (response.data.error) {
            setLoading(false);
            switch (response.data.error.code) {
                case 'invalid-credentials':
                    return setAlertData({
                        title: 'Błąd',
                        message: 'Nieprawidłowe dane logowania',
                        type: 'error',
                    });
                default:
                    return setAlertData({
                        title: 'Błąd',
                        message: 'Nieznany błąd',
                        type: 'error',
                    });
            }
        }
        console.log(response);

        await saveJwt(response.data.jwt);
        const data = await decodeJwt(response.data.jwt);

        console.log(data);

        if (!data) {
            return setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas logowania',
                type: 'error',
            });
        }

        const check = await callApi(
            '/users/check-user-and-project',
            {
                token: response.data.jwt,
                projectId,
            },
            Method.POST
        );

        if (check.data.error) {
            return setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas sprawdzania użytkownika',
                type: 'error',
            });
        }

        if (check.data.exists)
            navigate(`/${projectId}/module-selector`);
        else
            navigate(`/${projectId}/user-setter`);
    }

    const closeNotification = () =>
        setAlertData(null);

    return (
        <div className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center h-screen">
            <Loading enabled={loading}/>
            <Alert alertData={alertData} closeNotification={() => closeNotification()}/>
            <a href="/about"
               className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                <img src="/icon-full.png" alt="logo"/>
            </a>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Zaloguj się</h2>
                <form onSubmit={formSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                               autoComplete="email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 text-sm font-semibold mb-2">Hasło</label>
                        <input type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                               autoComplete="current-password"
                        />
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Zaloguj
                        się
                    </button>
                    <p className="text-gray-600 text-xs text-center mt-4">
                        Nie masz jeszcze konta?&nbsp;
                        <a href="register" className="text-blue-500 hover:underline">Zarejestruj się</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}