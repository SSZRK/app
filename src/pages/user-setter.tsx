import {useParams, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {callApi, Method} from "../utils/call_api.ts";
import Alert, {AlertProps} from "../components/common/alert.tsx";
import Loading from "../components/common/loading.tsx";
import {getJwt} from "../utils/jwt.ts";

export default function UserSetter() {
    const {projectId} = useParams();
    const navigate = useNavigate();
    const [jwt, setJwt] = useState<string | null>('');

    const [username, setUsername] = useState('');
    const [verificationField1, setVerificationField1] = useState('');
    const [verificationField2, setVerificationField2] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);

    useEffect(() => {
        getJwt().then((jwt) => {
            setJwt(jwt);
        });
    }, []);

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!username) {
            return setAlertData({
                title: 'Błąd',
                message: 'Podaj nazwę użytkownika',
                type: 'error',
            });
        }

        setLoading(true);
        const response = await callApi('/users/create', {
            token: jwt,
            projectId: projectId,
            username: username,
            verificationField1: verificationField1,
            verificationField2: verificationField2,
        }, Method.POST);

        if (!response.data || response.data.error) {
            setLoading(false);
            switch (response.data.error.code) {
                case 'user-exists':
                    return setAlertData({
                        title: 'Błąd',
                        message: 'Użytkownik już istnieje',
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

        setLoading(false);
        navigate(`/${projectId}/module-selector`);
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
                <h2 className="text-2xl font-semibold text-center mb-2">Utwórz konto w projekcie</h2>
                <p className="text-center text-sm text-gray-500 mb-4">Niezależnie od tego, czy masz już konto w innym
                    projekcie, czy nie, aby korzystać z tego projektu musisz utworzyć nowe konto.</p>
                <form onSubmit={formSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Nazwa
                            użytkownika</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="verification1"
                               className="block text-gray-700 text-sm font-semibold mb-2">Pole weryfikacyjne 1</label>
                        <input type="text" id="verification1" value={verificationField1}
                               onChange={(e) => setVerificationField1(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="verification2"
                               className="block text-gray-700 text-sm font-semibold mb-2">Pole weryfikacyjne 2</label>
                        <input type="text" id="verification2" value={verificationField2}
                               onChange={(e) => setVerificationField2(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Przejdź
                        dalej
                    </button>
                </form>
            </div>
        </div>
    );
}