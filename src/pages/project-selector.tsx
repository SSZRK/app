import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import Loading from "../components/common/loading.tsx";
import Alert, {AlertProps} from "../components/common/alert.tsx";
import {callApi, Method} from "../utils/call_api.ts";

export default function ProjectSelector() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);

    const [selectedProject, setSelectedProject] = useState('');
    const [search, setSearch] = useState('');
    const [showHints, setShowHints] = useState(false);

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

    const selectProject = (projectId) => {
        const project = projects.find((project) => project.id === projectId);
        setSearch(project.name);
        setShowHints(false);
        setSelectedProject(projectId);
    }

    const openHints = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        setShowHints(true);
    }

    const searchProjects = (text) => {
        setShowHints(true);
        setSearch(text);
    }

    const closeNotification = () => setAlertData(null);

    return (
        <div onClick={() => setShowHints(false)}
             className="bg-gray-100 bg-[url(../public/Przejazd.webp)] flex items-center select-none justify-center h-screen">
            <Loading enabled={loading}/>
            <Alert alertData={alertData} closeNotification={() => closeNotification()}/>
            <a href="/about"
               className="flex absolute right-0 bottom-0 h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
                <img src="/icon-full.png" alt="logo"/>
            </a>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Wybierz projekt</h2>
                <form onSubmit={formSubmit}>
                    <div className="mb-6">
                        <label htmlFor="select"
                               className="block text-gray-700 text-sm font-semibold mb-2"></label>
                        <input id="select" onFocus={() => openHints()}
                               value={search} onChange={(e) => searchProjects(e.target.value)}
                               className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 border-gray-300 focus:ring-blue-500"/>
                        <div
                            className={`absolute w-full max-w-80 max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg ${showHints ? '' : 'hidden'}`}>
                            {projects.length === 0 &&
                                <div className="p-2"><p className="text-sm text-gray-700">Brak wyników</p></div>}
                            {projects.map((project) => {
                                if (project.name.toLowerCase().includes(search.toLowerCase()))
                                    return <div className="p-2 cursor-pointer" onClick={() => selectProject(project.id)}
                                                key={project.id}>
                                        <p className="text-sm text-gray-700">{project.name ?? ''}</p>
                                    </div>;
                            })}
                        </div>
                    </div>

                    <button type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Przejdź
                        dalej
                    </button>
                    <p className="text-gray-600 text-xs text-center mt-4">
                        Przechodząc dalej akceptujesz <a href="#"
                                                         className="text-blue-500 hover:underline">Regulamin</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}