import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import Loading from "../components/common/loading.tsx";
import Alert, { AlertProps } from "../components/common/alert.tsx";
import { callApi, Method } from "../utils/call_api.ts";
import { Project } from "../utils/types.ts";
import DropdownSearch from "../components/common/dropdown-search.tsx";

export default function ProjectSelector() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);

    const [selectedProject, setSelectedProject] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        const response = await callApi(
            '/projects/get-all',
            {},
            Method.GET
        );

        if (!response.data || response.data.error) {
            if (response.data.error.code === 'no-projects')
                return setAlertData({
                    title: 'Błąd',
                    message: 'Nie znaleziono projektów',
                    type: 'error',
                });

            return;
        }

        setLoading(false);
        setProjects(response.data.data);
    }

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();
        closeNotification();

        if (selectedProject === '')
            return setAlertData({
                title: 'Błąd',
                message: 'Wybierz projekt z listy',
                type: 'error',
            });

        navigate(`/${selectedProject}/login`);
    }

    const closeNotification = () => setAlertData(null);

    return (
        <div
            className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center select-none justify-center h-screen">
            <Loading enabled={loading} />
            <Alert alertData={alertData} closeNotification={() => closeNotification()} />
            <a href="/about"
                className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                <img src="/icon-full.png" alt="logo" />
            </a>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Wybierz projekt</h2>
                <form onSubmit={formSubmit}>
                    <DropdownSearch search={search} setSearch={setSearch} selectedElement={selectedProject} setElement={setSelectedProject} hints={projects} noElementsMessage="Nie znaleziono posterunków" />

                    <button type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Przejdź
                        dalej
                    </button>
                    <p className="text-gray-600 text-xs text-center mt-4">
                        Przechodząc dalej akceptujesz <a href="/docs/terms-of-service/pl"
                            className="text-blue-500 hover:underline">Warunki korzystania</a> i <a href="/docs/privacy-policy/pl"
                                className="text-blue-500 hover:underline">Politykę prywatności</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}