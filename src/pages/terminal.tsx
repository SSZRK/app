import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Terminal() {
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);
    const projectId = query.get('projectId');
    const inputRef = useRef(null);

    const [rows, setRows] = useState([
        {
            type: 'text',
            content: `SSZRK Terminal (${import.meta.env.VITE_APP_VERSION})`,
        },
        {type: 'line-break'},
    ]);
    const [input, setInput] = useState('');

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const command = e.target.textContent.trim();
            addRow('previous-command', command);
            await new Promise(r => setTimeout(r, 10));
            inputRef.current.textContent = '';
            await executeCommand(command);
        }
        inputRef.current.focus();
    }

    const executeCommand = async (command) => {
        switch (command) {
            case 'sszrk admin':
                if (projectId) {
                    addRow('text', 'Otwieranie panelu administracyjnego...');
                    await new Promise(r => setTimeout(r, 600));
                    return navigate(`/${projectId}/admin`);
                } else
                    addRow('text', 'Nie znaleziono projektu.');
        }
    }

    const addRow = (type, content) => {
        setRows(old => {
            let newRows = [...old];
            newRows.push({type, content});
            return newRows;
        });
    }

    return (
        <div className="w-full h-screen" onKeyDown={(e) => handleKeyDown(e)}>
            <div className="coding inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased
              bg-gray-800  pb-6 pt-4 leading-normal h-full overflow-hidden">
                {
                    rows.map((row, index) => {
                        switch (row.type) {
                            case 'line-break':
                                return (
                                    <div key={index} className="mt-0.5 flex">
                                        <p className="flex-1 typing items-center">
                                            <br/>
                                        </p>
                                    </div>
                                );
                            case 'text':
                                return (
                                    <div key={index} className="mt-0.5 flex">
                                        <p className="flex-1 typing items-center">
                                            {row.content}
                                        </p>
                                    </div>
                                );
                            case 'previous-command':
                                return (
                                    <div key={index} className="mt-0.5 flex">
                                        <span className="text-green-400">user:~$</span>
                                        <p className="flex-1 typing items-center pl-2">
                                            {row.content}
                                        </p>
                                    </div>
                                );
                        }
                    })
                }

                <div className="mt-0.5 flex">
                    <span className="text-green-400">user:~$</span>
                    <p className="flex-1 typing items-center outline-none pl-2" ref={inputRef} contentEditable
                       onInput={(e) => setInput(e.currentTarget.textContent)}
                       onKeyDown={(e) => handleKeyDown(e)}
                       spellCheck={false}>
                    </p>
                </div>
            </div>
        </div>
    );
}