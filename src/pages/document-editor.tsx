import {useEffect, useState} from "react";
import MileageBookPagesSwitch from "../components/document-editor/mileage-book/pages-switch.tsx";
import NewFileModal from "../components/document-editor/new-file-modal.tsx";
import {createFileByType} from "../utils/create-file-by-type.ts";
import AnnouncementPostMovementLogPagesSwitch
    from "../components/document-editor/announcement-post-movement-log/pages-switch.tsx";
import {DocumentEditorFile, DocumentEditorPage} from "../utils/types.ts";

export default function DocumentEditor() {
    const isInApp = !!window.__TAURI__;

    const [showHeader, setShowHeader] = useState(false);
    const [showFileDropdown, setShowFileDropdown] = useState(false);
    const [showNewFileModal, setShowNewFileModal] = useState(false);
    const [pagination, setPagination] = useState({page: 0, pages: 1});
    const [file, setFile] = useState<DocumentEditorFile>({});
    const [newPages, setNewPages] = useState<Array<DocumentEditorPage>>([]);

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, [file, newPages]);

    const alertUser = (e: WindowEventMap["beforeunload"]) => {
        e.preventDefault();
    };

    const handleNewFile = () => setShowNewFileModal(true);

    const createNewFile = (type: string) => {
        const newFile = createFileByType(type);
        setFile(newFile);
        setNewPages(newFile.pages!);
        setPagination({page: 0, pages: newFile.pages?.length || 0});
    }

    const handlePageUpdate = (index: number, data: Map<any, any>) => {
        const newPages = [...file.pages as Array<DocumentEditorPage>];
        newPages[index].data = data;
        setNewPages(newPages);
    }

    const handleExport = () => {
        if (isInApp) {
        } else {
            const dataToExport = {
                ...file,
                pages: newPages,
            };
            const blob = new Blob([JSON.stringify(dataToExport)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${Date.now()}.sszrk-document`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.sszrk-document';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target?.result?.toString() || '');
                setFile(data);
                setNewPages(data.pages);
                setPagination({page: 0, pages: data.pages.length});
            }
            reader.readAsText(file as Blob);
        }
        input.click();
    }

    const handlePrint = () => {
        console.log(newPages);
    }

    return (
        <div className="flex flex-col bg-gray-200 h-screen">
            <NewFileModal show={showNewFileModal} onClose={() => setShowNewFileModal(false)} create={createNewFile}/>
            <header
                className={`bg-white border-b shadow-lg transition-all duration-700 ${!showHeader && 'hidden'} ${isInApp && 'hidden'}`}>
                <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Książka przebiegów</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                                    <button onClick={() => setShowFileDropdown(!showFileDropdown)}
                                            className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        Plik
                                    </button>
                                    <button onClick={() => setShowFileDropdown(!showFileDropdown)}
                                            className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                                        <span className="sr-only">Menu</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className={`absolute z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg ${(!showFileDropdown || !showHeader) && 'hidden'}`}
                                    role="menu"
                                >
                                    <div className="p-2">
                                        <button onClick={handleNewFile}
                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                role="menuitem"
                                        >
                                            Nowy
                                        </button>
                                        <button
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            Zapisz
                                        </button>
                                        <button onClick={handleImport}
                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                role="menuitem"
                                        >
                                            Importuj
                                        </button>
                                        <button onClick={handleExport}
                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                role="menuitem"
                                        >
                                            Eksportuj
                                        </button>
                                        <button onClick={handlePrint}
                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                role="menuitem"
                                        >
                                            Drukuj
                                        </button>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                            role="menuitem"
                                        >
                                            Wyjdź
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <button onClick={() => setShowHeader(!showHeader)}
                    className={`absolute right-0 rounded-full z-10 border border-indigo-600 bg-indigo-600 m-4 p-3 fill-white hover:bg-transparent hover:fill-indigo-600 focus:outline-none focus:ring active:fill-indigo-500 ${isInApp && 'hidden'}`}
            >
                <span className="sr-only"> Download </span>
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title>
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
                </svg>
            </button>
            {/* PAGINATION */}
            <div className="absolute right-6 top-2 z-10 bg-gray-300 bg-opacity-200 px-1 rounded-md">
                {pagination.page + 1} / {pagination.pages}
            </div>
            <button onClick={() => setPagination({...pagination, page: pagination.page - 2})}
                    disabled={pagination.page < 2}
                    className='absolute left-0 bottom-0 z-10 rounded-full border border-indigo-600 bg-indigo-600 m-4 p-3 fill-white hover:bg-transparent hover:fill-indigo-600 focus:outline-none focus:ring active:fill-indigo-500 '
            >
                <span className="sr-only"> Previous page </span>
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title>
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                </svg>
            </button>
            <button onClick={() => setPagination({...pagination, page: pagination.page + 2})}
                    disabled={pagination.page + 2 >= pagination.pages}
                    className="absolute right-0 bottom-0 z-10 rounded-full border border-indigo-600 bg-indigo-600 m-4 p-3 fill-white hover:bg-transparent hover:fill-indigo-600 focus:outline-none focus:ring active:fill-indigo-500"
            >
                <span className="sr-only"> Next page </span>
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>arrow-right</title>
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                </svg>
            </button>
            {newPages.length === 0 && <div
                className="flex h-full w-full text-gray-600 select-none justify-center text-center items-center">Brak
                stron</div>}
            <div
                className="h-full overflow-y-auto justify-items-center select-none grid xl:grid-cols-2 gap-x-1 gap-y-4 py-2">
                {newPages.map((page, index) => {
                    if (index >= pagination.page && index < pagination.page + 2) {
                        switch (file.type) {
                            case 'mileage-book':
                                return <div key={index}
                                            className={` ${index % 2 == 0 ? 'justify-self-center xl:justify-self-end' : 'justify-self-center xl:justify-self-start'}`}>
                                    <MileageBookPagesSwitch
                                        pageType={page.type} updatePage={handlePageUpdate} pageIndex={page.index}
                                        data={page.data}/></div>;
                            case 'announcement-post-movement-log':
                                return <div key={index}
                                            className={` ${index % 2 == 0 ? 'justify-self-center xl:justify-self-end' : 'justify-self-center xl:justify-self-start'}`}>
                                    <AnnouncementPostMovementLogPagesSwitch
                                        pageType={page.type} updatePage={handlePageUpdate} pageIndex={page.index}
                                        data={page.data}/></div>;
                            default:
                                return null;
                        }
                    }
                })}
            </div>
        </div>
    );
}