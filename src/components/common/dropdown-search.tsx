import {useState} from "react";

export interface DropdownSearchProps {
    search: string;
    setSearch: (search: string) => void;
    hints: Array<DropdownHint>;
    selectedElement: string;
    setElement: (element: string) => void;
    noElementsMessage?: string;
    maxWidth?: string;
}

export type DropdownHint = {
    id: string;
    name: string;
}

export default function DropdownSearch({
                                           search,
                                           setSearch,
                                           hints,
                                           selectedElement,
                                           setElement,
                                           noElementsMessage,
                                           maxWidth = '100%'
                                       }: DropdownSearchProps) {
    const [showHints, setShowHints] = useState(false);

    const hideHints = async () => {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setShowHints(false);
    }

    const selectElement = (hint: DropdownHint) => {
        setShowHints(true);
        setSearch(hint.name);
        setElement(hint.id);
        setShowHints(false);
    }

    return (
        <div className="mb-6" onFocus={() => setShowHints(true)} onBlur={hideHints}>
            <label htmlFor="select"
                   className="block text-gray-700 text-sm font-semibold mb-2"></label>
            <input id="select" autoComplete="off"
                   value={search} onChange={(e) => setSearch(e.target.value)}
                   className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 border-gray-400 focus:ring-blue-500"/>
            <div style={{maxWidth}}
                 className={`absolute w-full max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg ${showHints ? '' : 'hidden'}`}>
                {!hints.some((hint) => hint.name.toLowerCase().includes(search.toLowerCase())) &&
                    <div className="p-2"><p className="text-sm text-gray-400">{noElementsMessage ?? 'Brak wyników'}</p>
                    </div>}
                {hints.map((hint) => {
                    if (hint.name.toLowerCase().includes(search.toLowerCase()))
                        return <div
                            className={selectedElement === hint.id ? "p-2 cursor-pointer bg-blue-300" : "p-2 cursor-pointer hover:bg-gray-100"}
                            onClick={() => selectElement(hint)}
                            key={hint.id}>
                            <p className="text-sm text-gray-700">{hint.name}</p>
                        </div>;
                })}
            </div>
        </div>
    );
}