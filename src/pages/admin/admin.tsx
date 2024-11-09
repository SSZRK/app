import {Outlet, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../components/common/loading.tsx";
import {getJwt} from "../../utils/jwt.ts";
import {callApi, Method} from "../../utils/call_api.ts";

export default function Admin() {
    const {projectId} = useParams();

    const [loading, setLoading] = useState(true);
    const [jwt, setJwt] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        await getUser();
        setLoading(false);
    }

    const getUser = async () => {
        const token = await getJwt();
        setJwt(token);
        const response = await callApi('/admin/get-user', {
            jwt: token,
            projectId,
        }, Method.POST);

        console.log(response);
        if (response.data.success)
            return setUser(response.data.user);
        else
            return setUser({});
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Loading enabled={loading}/>
            <div className="bg-white text-white shadow z-10 w-full p-2 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="hidden md:flex items-center">
                        <img src="/public/assets/icons/android-icon-96x96.png" alt="Logo"
                             className="w-10 mr-2"/>
                        <h2 className="font-bold text-black text-xl">Panel administracyjny</h2>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button id="menuBtn">
                            <i className="fas fa-bars text-gray-500 text-lg"></i>
                        </button>
                    </div>
                </div>
                <div className="space-x-5">
                    <button className="text-gray-700">
                        Zalogowany: {user.username}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex">
                <div className="p-2 bg-white w-60 flex flex-col md:flex" id="sideNav">
                    <nav>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white"
                           href="admin">
                            Strona główna
                        </a>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white"
                           href={`/${projectId}/admin/users`}>
                            Użytkownicy
                        </a>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white"
                           href={`/${projectId}/admin/posts`}>
                            Posterunki
                        </a>
                    </nav>

                    <a className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white mt-auto"
                       href={`/${projectId}/module-selector`}>
                        Powrót do modułów
                    </a>

                    <p className="mb-1 px-5 py-3 text-left text-xs text-gray-500">SSZRK
                        © {new Date().getFullYear()} </p>
                </div>

                <div className="flex-1 p-4">
                    <Outlet context={{jwt}}/>
                </div>
            </div>
        </div>
    );
}