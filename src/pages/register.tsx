import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useState} from "react";
import {callApi, Method} from "../utils/call_api.ts";
import Alert, {AlertProps} from "../components/common/alert.tsx";
import Loading from "../components/common/loading.tsx";

export default function Register() {
    const {projectId} = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        closeNotification();

        if (!email || !password || !repeatPassword)
            return setAlertData({
                title: 'Błąd',
                message: 'Wypełnij wszystkie pola',
                type: 'error',
            });

        if (password !== repeatPassword)
            return setAlertData({
                title: 'Błąd',
                message: 'Hasła nie są takie same',
                type: 'error',
            });

        setLoading(true);
        const response = await callApi(
            '/auth/register',
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
                case 'email-already-used':
                    return setAlertData({
                        title: 'Błąd',
                        message: 'Ten adres e-mail jest już powiązany z kontem',
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

        if (response.data.success) {
            setAlertData({
                title: 'Sukces',
                message: 'Zarejestrowano pomyślnie',
                type: 'success',
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate(`/${projectId}/login`);
        }

        setLoading(false);
        setAlertData({
            title: 'Błąd',
            message: 'Wystąpił błąd podczas rejestracji',
            type: 'error',
        });
    }

    const closeNotification = () => setAlertData(null);

    return (
        <div className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center justify-center h-screen">
            <Loading enabled={loading}/>
            <Alert alertData={alertData} closeNotification={() => closeNotification()}/>
            <a href="/about"
               className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                <img src="/icon-full.png" alt="logo"/>
            </a>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Rejestracja</h2>
                <form onSubmit={formSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 text-sm font-semibold mb-2">Hasło</label>
                        <input type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 text-sm font-semibold mb-2">Powtórz hasło</label>
                        <input type="password" id="password" value={repeatPassword}
                               onChange={(e) => setRepeatPassword(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"/>
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Zarejestruj
                        się
                    </button>
                    <p className="text-gray-600 text-xs text-center mt-4">
                        Masz już konto?&nbsp;
                        <a href="login" className="text-blue-500 hover:underline">Zaloguj się</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}