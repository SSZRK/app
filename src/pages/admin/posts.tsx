import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {callApi, Method} from "../../utils/call_api.ts";
import {AdminOutletContextType} from "../../utils/types.ts";
import {Item, ItemParams, Menu, TriggerEvent, useContextMenu} from "react-contexify";
import Alert, {AlertProps} from "../../components/common/alert.tsx";

export const postTypes = [
    {value: 'bst', label: 'BST - Bocznica stacyjna'},
    {value: 'bsz', label: 'BSZ - Bocznica szlakowa'},
    {value: 'l', label: 'L - Ogólnodostępna bocznica szlakowa'},
    {value: 'lpo', label: 'LPO - Ogólnodostępna bocznica szlakowa i przystanek osobowy'},
    {value: 'm', label: 'M - Mijanka'},
    {value: 'ml', label: 'ML - Mijanka i ładownia'},
    {value: 'mlp', label: 'MLP - Mijanka, ładownia i przystanek osobowy'},
    {value: 'mpo', label: 'MPO - Mijanka i przystanek osobowy'},
    {value: 'odgs', label: 'ODGS - Posterunek odgałęźny i przystanek służbowy'},
    {value: 'odst', label: 'ODST - Posterunek odstępowy'},
    {value: 'pbsp', label: 'PBSP - Posterunek bocznicowy szlakowy i przystanek osobowy'},
    {value: 'pbst', label: 'PBST - Posterunek bocznicowy stacyjny'},
    {value: 'pbsz', label: 'PBSZ - Posterunek bocznicowy szlakowy'},
    {value: 'pgl', label: 'PGL - Posterunek odgałęźny i ładownia'},
    {value: 'pglp', label: 'PGLP - Posterunek odgałęźny, przystanek osobowy i ładownia'},
    {value: 'pgr', label: 'PGR - Przejście graniczne'},
    {value: 'pk', label: 'PK - Przystanek osobowy w kolejowej komunikacji autobusowej'},
    {value: 'po', label: 'PO - Przystanek osobowy publiczny'},
    {value: 'podg', label: 'PODG - Posterunek odgałęźny'},
    {value: 'pods', label: 'PODS - Przystanek osobowy i posterunek odstępowy'},
    {value: 'pogm', label: 'POGM - Posterunek odgałęźny i mijanka'},
    {value: 'pogp', label: 'POGP - Przystanek osobowy i posterunek odgałęźny'},
    {value: 'pogt', label: 'POGT - Przystanek osobowy i grupa torów towarowych'},
    {value: 'pp', label: 'PP - Punkt przeładunkowy'},
    {value: 'st', label: 'ST - Stacja'},
    {value: 'stth', label: 'STTH - Stacja techniczna'},
];

type PostData = {
    id: string;
    createdAt: number;
    projectId: string;
    fullName?: string;
    shortName?: string;
    type?: string;
    organisationalUnit?: string;
    superiorPost?: string;
    ableToCast?: boolean;
    closed?: boolean;
    shpInstalled?: boolean;
    recorderInstalled?: boolean;
    remoteControl?: boolean;
    crewAnnouncesEnd?: boolean;
    uponRequest?: boolean;
    departureOnRd1?: boolean;
    apo?: boolean;
    uzs?: boolean;
    r307?: boolean;
    sl?: boolean;
    radioChannels?: string;
    openOn?: string;
}

export default function PostsAdmin() {
    const MENU_ID = 'admin-posts-menu';
    const {projectId} = useParams();
    const {jwt} = useOutletContext<AdminOutletContextType>();

    const [loading, setLoading] = useState(true);
    const [alertData, setAlertData] = useState<AlertProps | null>(null);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [postDataPopup, setPostDataPopup] = useState(false);
    const [editingPost, setEditingPost] = useState<PostData | null>(null);

    const {show} = useContextMenu({
        id: MENU_ID
    });

    const handleContextMenu = (e: TriggerEvent, id: string) => {
        show({
            event: e,
            props: {
                id,
            }
        });
    }

    const handleCopyId = async (e: ItemParams) => {
        await navigator.clipboard.writeText(e.props.id);
    }

    const handleEditData = async (e: ItemParams) => {
        const post = posts.find(p => p.id === e.props.id);
        if (!post) return;
        setEditingPost(post);
        setPostDataPopup(true);
    }

    useEffect(() => {
        getPosts();
    }, [jwt]);

    const getPosts = async () => {
        if (!jwt) return;
        setLoading(true);
        const response = await callApi('/admin/posts/get-posts', {
            jwt,
            projectId,
        }, Method.POST);
        setLoading(false);

        if (response.data.error) {
            console.log(response.data.error);
            setAlertData({
                title: 'Błąd',
                message: 'Wystąpił błąd podczas pobierania danych',
                type: 'error',
            });
            return;
        }

        let _posts = response.data.data;
        _posts.sort((a: PostData, b: PostData) => a.fullName?.toLowerCase() ?? '' > (b.fullName?.toLowerCase() ?? '') ? 1 : -1);

        setPosts(_posts);
    }

    const newPost = () => {
        setEditingPost({
            id: '',
            createdAt: new Date().getTime(),
            projectId,
            shpInstalled: true,
            recorderInstalled: true,
        } as PostData);
        setPostDataPopup(true);
    }

    const setEditingPostField = (field: string, value: string | boolean) => {
        setEditingPost({
            ...editingPost,
            [field]: value,
        } as PostData);
    }

    const handlePostSave = async () => {
        if (!editingPost?.fullName || !editingPost?.shortName || !editingPost?.type)
            return setAlertData({
                title: 'Błąd',
                message: 'Wypełnij wymagane pola',
                type: 'error',
            });

        if (!editingPost?.id) {
            setLoading(true);
            const response = await callApi('/admin/posts/new-post', {
                jwt,
                ...editingPost,
            }, Method.POST);
            setLoading(false);

            if (response.data.error) {
                console.log(response.data.error);
                setAlertData({
                    title: 'Błąd',
                    message: 'Wystąpił błąd podczas zapisywania danych',
                    type: 'error',
                });
                return;
            }

            setAlertData({
                title: 'Sukces',
                message: 'Posterunek został dodany',
                type: 'success',
            });
            setPostDataPopup(false);
            setEditingPost(null);
            let _posts = [...posts, editingPost];
            _posts.sort((a, b) => a.fullName?.toLowerCase() ?? '' > (b.fullName?.toLowerCase() ?? '') ? 1 : -1);
            setPosts(_posts);
        } else {
            setLoading(true);
            const response = await callApi('/admin/posts/update-post', {
                jwt,
                ...editingPost,
            }, Method.POST);
            setLoading(false);

            if (response.data.error) {
                console.log(response.data.error);
                setAlertData({
                    title: 'Błąd',
                    message: 'Wystąpił błąd podczas zapisywania danych',
                    type: 'error',
                });
                return;
            }

            setAlertData({
                title: 'Sukces',
                message: 'Dane zostały zapisane',
                type: 'success',
            });
            setPostDataPopup(false);
            setEditingPost(null);
            let _posts = posts.map(p => p.id === editingPost.id ? editingPost : p);
            _posts.sort((a: PostData, b: PostData) => a.fullName?.toLowerCase() ?? '' > (b.fullName?.toLowerCase() ?? '') ? 1 : -1);
            setPosts(_posts);
        }
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
            <div className="absolute w-full left-0 top-14">
                <Alert alertData={alertData} closeNotification={closeNotification}/>
            </div>
            <Menu id={MENU_ID}>
                <Item onClick={handleCopyId}>Skopiuj ID</Item>
                <Item onClick={handleEditData}>Edytuj dane</Item>
            </Menu>
            {postDataPopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 py-20 flex items-center justify-center">
                    <div className="bg-white overflow-auto max-h-full p-5 rounded-md min-w-1/2">
                        <h2 className="text-xl mb-4 font-bold">Dane posterunku</h2>
                        <form>
                            <InputElement label="Pełna nazwa" value={editingPost?.fullName}
                                          onChange={(value) => setEditingPostField('fullName', value)}/>
                            <InputElement label="Skrót posterunku" value={editingPost?.shortName}
                                          onChange={(value) => setEditingPostField('shortName', value)}/>
                            <div className="mb-4">
                                <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">Typ
                                    posterunku</label>
                                <select id="type" value={editingPost?.type}
                                        onChange={(e) => setEditingPostField('type', e.target.value)}
                                        defaultValue=""
                                        className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled value="">Wybierz typ</option>
                                    {postTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <InputElement label="Jednostka organizacyjna" value={editingPost?.organisationalUnit}
                                          onChange={(value) => setEditingPostField('organisationalUnit', value)}/>
                            <InputElement label="Posterunek nadrzędny (id)" value={editingPost?.superiorPost}
                                          onChange={(value) => setEditingPostField('superiorPost', value)}/>
                            <CheckboxElement label="Możliwość obsadzenia"
                                             checked={editingPost?.ableToCast}
                                             onChange={(e) => setEditingPostField('ableToCast', e)}/>
                            <CheckboxElement label="Posterunek zamknięty"
                                             checked={editingPost?.closed}
                                             onChange={(e) => setEditingPostField('closed', e)}/>
                            <CheckboxElement label="Zainstalowane urządzenia SHP"
                                             checked={editingPost?.shpInstalled}
                                             onChange={(e) => setEditingPostField('shpInstalled', e)}/>
                            <CheckboxElement label="Rejestrowanie rozmów w sieci radiołączności"
                                             checked={editingPost?.recorderInstalled}
                                             onChange={(e) => setEditingPostField('recorderInstalled', e)}/>
                            <CheckboxElement label="Zdalne sterowanie"
                                             checked={editingPost?.remoteControl}
                                             onChange={(e) => setEditingPostField('remoteControl', e)}/>
                            <CheckboxElement label="Drużyna pociągowa stwierdza koniec pociągu"
                                             checked={editingPost?.crewAnnouncesEnd}
                                             onChange={(e) => setEditingPostField('crewAnnouncesEnd', e)}/>
                            <CheckboxElement label="Na żądanie"
                                             checked={editingPost?.uponRequest}
                                             onChange={(e) => setEditingPostField('uponRequest', e)}/>
                            <CheckboxElement label="Wyjazd na Rd1"
                                             checked={editingPost?.departureOnRd1}
                                             onChange={(e) => setEditingPostField('departureOnRd1', e)}/>
                            <CheckboxElement label="APO"
                                             checked={editingPost?.apo}
                                             onChange={(e) => setEditingPostField('apo', e)}/>
                            <CheckboxElement label="UZS"
                                             checked={editingPost?.uzs}
                                             onChange={(e) => setEditingPostField('uzs', e)}/>
                            <CheckboxElement label="R307"
                                             checked={editingPost?.r307}
                                             onChange={(e) => setEditingPostField('r307', e)}/>
                            <CheckboxElement label="Posterunek SL"
                                             checked={editingPost?.sl}
                                             onChange={(e) => setEditingPostField('sl', e)}/>
                            <InputElement label="Kanały radiołączności" value={editingPost?.radioChannels}
                                          placeholder="R2, R4, R7, GSM-R"
                                          onChange={(value) => setEditingPostField('radioChannels', value)}/>
                            <InputElement label="Otwarty tylko w" value={editingPost?.openOn}
                                          placeholder="(9-17) (1-5)"
                                          onChange={(value) => setEditingPostField('openOn', value)}/>
                        </form>
                        <div className="mt-5">
                            <button onClick={handlePostSave}
                                    className="bg-blue-500 hover:bg-blue-700 w-44 text-white py-2 px-4 rounded-md mr-9">
                                Zapisz
                            </button>
                            <button onClick={() => setPostDataPopup(false)}
                                    className="bg-red-500 hover:bg-red-700 w-44 text-white py-2 px-4 rounded-md">
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={newPost}
                    className="bg-blue-500 hover:bg-blue-700 w-44 self-end text-white py-2 px-4 rounded-md mr-9">
                Dodaj posterunek
            </button>
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-white border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Nazwa posterunku
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Typ posterunku
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Jednostka organizacyjna
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Utworzono
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                posts.map((post, index) => (
                                    <tr key={post.id} onClick={(e) => handleContextMenu(e, post.id)}
                                        className={`border-b ${index % 2 == 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.fullName}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {postTypes.find(t => t.value === post.type)?.label}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {post.organisationalUnit}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {new Date(post.createdAt as EpochTimeStamp).toLocaleString()}
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

type InputElementProps = {
    label: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

function InputElement({label, value, onChange, placeholder}: InputElementProps) {
    return (
        <div className="mb-4">
            <label htmlFor={label}
                   className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
            <input type="text" id={label} value={value} placeholder={placeholder} autoComplete="off"
                   onChange={(e) => onChange(e.target.value)}
                   className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
            />
        </div>
    );
}

type CheckboxElementProps = {
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
};

function CheckboxElement({label, checked, onChange}: CheckboxElementProps) {
    return (
        <div className="mb-4 select-none">
            <label className="flex cursor-pointer items-start gap-4">
                <div className="flex items-center">
                    &#8203;
                    <input type="checkbox" className="size-4 rounded border-gray-300" id={label}
                           checked={checked} onChange={(e) => onChange(e.target.checked)}/>
                </div>
                <div>
                    <strong className="font-normal text-gray-900">{label}</strong>
                </div>
            </label>
        </div>
    );
}