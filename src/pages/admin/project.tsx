import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {callApi, Method} from "../../utils/call_api.ts";
import "react-contexify/dist/ReactContexify.css";
import Alert, {AlertProps} from "../../components/common/alert.tsx";
import {AdminOutletContextType, Project} from "../../utils/types.ts";

export default function ProjectAdmin() {
    const {jwt} = useOutletContext<AdminOutletContextType>();
    const {projectId} = useParams();

    const [project, setProject] = useState<Project | null>(null);
    const [lastAccident, setLastAccident] = useState<Date | null>(null);
    const [isEmailVerificationRequired, setIsEmailVerificationRequired] = useState<boolean>(false);

    const [loading, setLoading] = useState(true);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);


    useEffect(() => {
        fetchProject();
    }, [jwt]);

    const fetchProject = async () => {
        if (!jwt) return
        setLoading(true);
        const response = await callApi('/admin/get-project', {
            jwt,
            projectId,
        }, Method.POST);

        if (response.data.success) {
            setProject(response.data.data);
            setLastAccident(new Date(response.data.data.lastAccident));
            setIsEmailVerificationRequired(response.data.data.isEmailVerificationRequired);
        } else {
            setProject(null);
            setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas pobierania użytkowników',
                type: 'error',
            });
        }
        setLoading(false);
    }

    const handleResetFields = () => {
        setLastAccident(new Date(project?.lastAccident ?? 0) ?? null);
        setIsEmailVerificationRequired(project?.isEmailVerificationRequired ?? false);
    }

    const handleSaveData = async () => {
        setLoading(true);
        const response = await callApi('/admin/update-project', {
            jwt,
            projectId,
            lastAccident: lastAccident?.getTime(),
            isEmailVerificationRequired,
        }, Method.POST);
        console.log(response);

        setLoading(false);
        if (response.data.success) {
            setAlertData({
                title: 'Sukces',
                message: 'Dane zostały zapisane',
                type: 'success',
            });
            setProject({
                ...project,
                lastAccident: lastAccident?.getTime(),
                isEmailVerificationRequired
            } as Project);
        } else {
            setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas zapisywania danych',
                type: 'error',
            });
        }
    }

    const formatDate = (date: Date | null) => date ? `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}T${date.getHours()}:${date.getMinutes()}` : '';

    const closeNotification = () => setAlertData(null);

    if (loading)
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );

    return (
        <div className="flex flex-col">
            <div className="absolute w-full left-0 top-14">
                <Alert alertData={alertData} closeNotification={closeNotification}/>
            </div>
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="mb-4">
                            <label htmlFor="lastAccident"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Nazwa projektu</label>
                            <input type="text" id="lastAccident" autoComplete="off" disabled
                                   value={project?.name || ''}
                                   className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastAccident"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Ostatni wypadek
                                spowodowany przez pracownika</label>
                            <input type="datetime-local" id="lastAccident" autoComplete="off"
                                   value={formatDate(lastAccident) || ''}
                                   onChange={(e) => setLastAccident(new Date(Date.parse(e.target.value)))}
                                   className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastAccident"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Wymagane potwierdzenie
                                adresu email</label>
                            <input type="checkbox" id="emailVerification" autoComplete="off"
                                   checked={isEmailVerificationRequired || false}
                                   onChange={(e) => setIsEmailVerificationRequired(e.target.checked)}
                                   className="form-checkbox w-5 h-5 text-blue-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                                    onClick={handleResetFields}>Resetuj pola
                            </button>
                            <button onClick={handleSaveData}
                                    className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg ml-2">Zapisz
                                dane
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}