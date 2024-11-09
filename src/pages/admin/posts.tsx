import {Item, Menu, Submenu} from "react-contexify";
import Alert from "../../components/common/alert.tsx";
import {useState} from "react";
import {useParams} from "react-router-dom";

type PostData = {
    id: string;
    createdAt: number;
    projectId: string;
    fullName?: string;
    type?: string;
    organizationalUnit?: string;
    superiorPost?: string;
    ableToCast?: boolean;
    shpInstalled?: boolean;
    recorderInstalled?: boolean;
    radioChannels?: string;
}

export default function PostsAdmin() {
    const {projectId} = useParams();

    const [postDataPopup, setPostDataPopup] = useState(false);
    const [editingPost, setEditingPost] = useState<PostData | null>(null);

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

    return (
        <div className="flex flex-col">
            {postDataPopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md w-96">
                        <h2 className="text-xl mb-4 font-bold">Dane posterunku</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 text-sm font-semibold mb-2">Pełna
                                    nazwa</label>
                                <input type="text" id="fullName" value={editingPost?.fullName}
                                       onChange={(e) => setEditingPostField('fullName', e.target.value)}
                                       className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">Typ
                                    posterunku</label>
                                <select id="type" value={editingPost?.type}
                                        onSelect={(e) => setEditingPostField('type', e.target.value)}
                                        defaultValue=""
                                        className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled value="">Wybierz typ</option>
                                    <option value="bst">BST - Bocznica stacyjna</option>
                                    <option value="bsz">BSZ - Bocznica szlakowa</option>
                                    <option value="l">L - Ogólnodostępna bocznica szlakowa</option>
                                    <option value="lpo">LPO - Ogólnodostępna bocznica szlakowa i przystanek osobowy
                                    </option>
                                    <option value="m">M - Mijanka</option>
                                    <option value="ml">ML - Mijanka i ładownia</option>
                                    <option value="mlp">MLP - Mijanka, ładownia i przystanek osobowy</option>
                                    <option value="mpo">MPO - Mijanka i przystanek osobowy</option>
                                    <option value="odgs">ODGS - Posterunek odgałęźny i przystanek służbowy</option>
                                    <option value="odst">ODST - Posterunek odstępowy</option>
                                    <option value="pbsp">PBSP - Posterunek bocznicowy szlakowy i przystanek osobowy
                                    </option>
                                    <option value="pbst">PBST - Posterunek bocznicowy stacyjny</option>
                                    <option value="pbsz">PBSZ - Posterunek bocznicowy szlakowy</option>
                                    <option value="pgl">PGL - Posterunek odgałęźny i ładownia</option>
                                    <option value="pglp">PGLP - Posterunek odgałęźny, przystanek osobowy i ładownia
                                    </option>
                                    <option value="pgr">PGR - Przejście graniczne</option>
                                    <option value="pk">PK - Przystanek osobowy w kolejowej komunikacji autobusowej
                                    </option>
                                    <option value="po">PO - Przystanek osobowy publiczny</option>
                                    <option value="podg">PODG - Posterunek odgałęźny</option>
                                    <option value="pods">PODS - Przystanek osobowy i posterunek odstępowy</option>
                                    <option value="pogm">POGM - Posterunek odgałęźny i mijanka</option>
                                    <option value="pogp">POGP - Przystanek osobowy i posterunek odgałęźny</option>
                                    <option value="pogt">POGT - Przystanek osobowy i grupa torów towarowych</option>
                                    <option value="pp">PP - Punkt przeładunkowy</option>
                                    <option value="st">ST - Stacja</option>
                                    <option value="stth">STTH - Stacja techniczna</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="organizationalUnit"
                                       className="block text-gray-700 text-sm font-semibold mb-2">Jednostka
                                    organizacyjna</label>
                                <input type="text" id="organizationalUnit" value={editingPost?.organizationalUnit}
                                       onChange={(e) => setEditingPostField('organizationalUnit', e.target.value)}
                                       className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="superiorPost"
                                       className="block text-gray-700 text-sm font-semibold mb-2">Posterunek
                                    nadrzędny <i>(id posterunku)</i></label>
                                <input type="text" id="superiorPost" value={editingPost?.superiorPost}
                                       onChange={(e) => setEditingPostField('superiorPost', e.target.value)}
                                       className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="flex cursor-pointer items-start gap-4">
                                    <div className="flex items-center">
                                        &#8203;
                                        <input type="checkbox" className="size-4 rounded border-gray-300"
                                               id="ableToCast"
                                               checked={editingPost?.ableToCast} onChange={
                                            (e) => setEditingPostField('ableToCast', e.target.checked)
                                        }/>
                                    </div>
                                    <div><strong className="font-normal text-gray-900">Możliwość obsadzenia</strong>
                                    </div>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="flex cursor-pointer items-start gap-4">
                                    <div className="flex items-center">
                                        &#8203;
                                        <input type="checkbox" className="size-4 rounded border-gray-300"
                                               id="shpInstalled"
                                               checked={editingPost?.shpInstalled} onChange={
                                            (e) => setEditingPostField('shpInstalled', e.target.checked)
                                        }/>
                                    </div>
                                    <div><strong className="font-normal text-gray-900">Zainstalowane urządzenia
                                        SHP</strong>
                                    </div>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="flex cursor-pointer items-start gap-4">
                                    <div className="flex items-center">
                                        &#8203;
                                        <input type="checkbox" className="size-4 rounded border-gray-300"
                                               id="recorderInstalled"
                                               checked={editingPost?.recorderInstalled} onChange={
                                            (e) => setEditingPostField('recorderInstalled', e.target.checked)
                                        }/>
                                    </div>
                                    <div><strong className="font-normal text-gray-900">Rejestrowanie rozmów w sieci
                                        radiołączności</strong>
                                    </div>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="radioChannels"
                                       className="block text-gray-700 text-sm font-semibold mb-2">Kanały radiołączności</label>
                                <input type="text" id="radioChannels" value={editingPost?.radioChannels} placeholder="R2, R4, R7"
                                       onChange={(e) => setEditingPostField('radioChannels', e.target.value)}
                                       className="form-input w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-700 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                        <div className="mt-5">
                            <button className="bg-blue-500 hover:bg-blue-700 w-44 text-white py-2 px-4 rounded-md mr-9">
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
                            {/*{*/}
                            {/*    users.map((user, index) => (*/}
                            {/*        <tr key={user.id} onClick={(e) => handleContextMenu(e, user.id)}*/}
                            {/*            className={`border-b ${index % 2 == 0 ? 'bg-gray-100' : 'bg-white'}`}>*/}
                            {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>*/}
                            {/*            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">*/}
                            {/*                {user.email}*/}
                            {/*            </td>*/}
                            {/*            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">*/}
                            {/*                {user.role}*/}
                            {/*            </td>*/}
                            {/*            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">*/}
                            {/*                {user.verificationField1}*/}
                            {/*            </td>*/}
                            {/*            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">*/}
                            {/*                {user.verificationField2}*/}
                            {/*            </td>*/}
                            {/*            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">*/}
                            {/*                {new Date(user.createdAt).toLocaleString()}*/}
                            {/*            </td>*/}
                            {/*        </tr>*/}
                            {/*    ))*/}
                            {/*}*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}