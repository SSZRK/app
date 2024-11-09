import {useState} from "react";

export default function NewFileModal({
                                         show = false, onClose = () => {
    }, create = (a) => {
    }
                                     }) {
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const [showHints, setShowHints] = useState(false);

    const types = [
        {id: 'mileage-book', name: 'Książka przebiegów'},
        {id: 'announcement-post-movement-log', name: 'Dziennik ruchu post. zapowiadawczego'},
    ];

    const openHints = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        setShowHints(true);
    }

    const searchTypes = (text) => {
        setShowHints(true);
        setSearch(text);
    }

    const selectType = (typeId) => {
        const type = types.find((type) => type.id === typeId);
        setSearch(type.name);
        setShowHints(false);
        setType(typeId);
    }

    const createFile = () => {
        if (type) {
            create(type);
            onClose();
        }
    }

    if (show) {
        return (
            <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-4 w-96">
                    <h1 className="text-xl font-bold">Nowy plik</h1>
                    <div className="mt-2">
                        <div className="mb-6">
                            <label htmlFor="select"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Wybierz</label>
                            <input id="select" onFocus={() => openHints()}
                                   value={search} onChange={(e) => searchTypes(e.target.value)}
                                   className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 border-gray-300 focus:ring-blue-500"/>
                            <div
                                className={`absolute w-full max-w-[350px] max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg ${showHints ? '' : 'hidden'}`}>
                                {types.map((type) => {
                                    if (type.name.toLowerCase().includes(search.toLowerCase()))
                                        return <div className="p-2 cursor-pointer"
                                                    onClick={() => selectType(type.id)}
                                                    key={type.id}>
                                            <p className="text-sm text-gray-700">{type.name ?? ''}</p>
                                        </div>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button onClick={createFile}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">Utwórz
                        </button>
                        <button onClick={onClose}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Anuluj
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}