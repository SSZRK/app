import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {callApi, Method} from "../../utils/call_api.ts";
import {Item, ItemParams, Menu, Submenu, TriggerEvent, useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import Alert, {AlertProps} from "../../components/common/alert.tsx";
import {AdminOutletContextType, User} from "../../utils/types.ts";

export default function UsersAdmin() {
    const MENU_ID = 'admin-users-menu';
    const {jwt} = useOutletContext<AdminOutletContextType>();
    const {projectId} = useParams();

    const {show} = useContextMenu({
        id: MENU_ID
    });

    const [users, setUsers] = useState<Array<User>>([]);

    const [loading, setLoading] = useState(true);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const [sendMessagePopup, setSendMessagePopup] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [jwt]);
    const fetchUsers = async () => {
        if (!jwt) return

        setLoading(true);
        const response = await callApi('/admin/get-users', {
            jwt,
            projectId,
        }, Method.POST);

        if (response.data.success)
            setUsers(response.data.users);
        else {
            setUsers([]);
            setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas pobierania użytkowników',
                type: 'error',
            });
        }
        setLoading(false);
    }

    const handleContextMenu = (e: TriggerEvent, id: string) => {
        show({
            event: e,
            props: {
                id,
            }
        });
    }

    const handleRoleChange = async (params: ItemParams<any, any>) => {
        setLoading(true);
        const response = await callApi('/admin/change-role', {
            jwt,
            projectId,
            userId: params.props.id,
            role: params.data.changeTo,
        }, Method.POST);
        setLoading(false);

        if (response.data.error)
            return setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas zmiany roli użytkownika',
                type: 'error',
            });

        await fetchUsers();
    }

    const handleMessageSend = async (params: ItemParams<any, any>) => {
        setSendMessagePopup(true);
        setSelectedUser(params.props.id);
    }

    const sendMessage = async () => {
        setLoading(true);
        const response = await callApi('/admin/send-message', {
            jwt,
            projectId,
            message,
            userEmail: users.find(user => user.id === selectedUser)?.email,
        }, Method.POST);
        setLoading(false);

        console.log(response);

        if (response.data.error)
            return setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas wysyłania wiadomości',
                type: 'error',
            });

        if (response.data.success)
            setAlertData({
                title: 'Sukces',
                message: 'Wiadomość została wysłana',
                type: 'success',
            });

        setSendMessagePopup(false);
        setMessage('');
    }

    const closeNotification = () => setAlertData(null);

    if (loading)
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );

    return (
        <div className="flex flex-col">
            <Menu id={MENU_ID}>
                <Submenu label="Zmień rolę">
                    <Item onClick={handleRoleChange} data={{changeTo: 'user'}}>Użytkownik</Item>
                    <Item onClick={handleRoleChange} data={{changeTo: 'dispatcher'}}>Dyżurny ruchu</Item>
                    <Item onClick={handleRoleChange} data={{changeTo: 'admin'}}>Administrator</Item>
                </Submenu>
                <Item>Zbanuj użytkownika</Item>
                <Item onClick={handleMessageSend}>Wyślij wiadomość</Item>
            </Menu>
            {sendMessagePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 w-1/2 rounded-lg">
                        <h1 className="text-lg font-bold">Wyślij wiadomość</h1>
                        <textarea className="w-full h-32 mt-2 p-2 border border-gray-300 rounded-lg" value={message}
                                  onChange={(e) => setMessage(e.target.value)}/>
                        <div className="flex justify-end mt-2">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                                    onClick={() => setSendMessagePopup(false)}>Anuluj
                            </button>
                            <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg ml-2"
                                    onClick={sendMessage}>Wyślij
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="absolute w-full left-0 top-14">
                <Alert alertData={alertData} closeNotification={closeNotification}/>
            </div>
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-white border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Nazwa użytkownika
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    E-mail
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Rola
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Pole weryfikacyjne 1
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Pole weryfikacyjne 2
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Utworzono
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={user.id} onClick={(e) => handleContextMenu(e, user.id ?? '')}
                                        className={`border-b ${index % 2 == 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.role}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.verificationField1}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.verificationField2}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {new Date(user.createdAt as EpochTimeStamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}