// import "xp.css/dist/98.css";
import {useState} from "react";

export default function Serwo() {
    const [tab, setTab] = useState(0);

    return (
        <div className="window h-screen">
            <div className="title-bar">
                <div className="title-bar-text">Stacja BIELSKO-BIAŁA GŁÓWNA - system SERWO wersja 1.0.3.201</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <section className="tabs mt-1 h-full max-h-[calc(100vh-60px)]">
                <menu role="tablist" aria-label="Sample Tabs">
                    <button role="tab" aria-selected={tab === 0} onClick={() => setTab(0)}><span
                        className="flex flex-row gap-1"><img src="/public/assets/98-icons/keys-1.png"/> SERWO</span>
                    </button>
                    <button role="tab" aria-selected={tab === 1} onClick={() => setTab(1)}><span
                        className="flex flex-row gap-1"><img
                        src="/public/assets/98-icons/message_file-1.png"/> Druk Rozkazów</span></button>
                    <button role="tab" aria-selected={tab === 2} onClick={() => setTab(2)}><span
                        className="flex flex-row gap-1"><img
                        src="/public/assets/98-icons/address_book-1.png"/> Książka Ostrzeżeń</span></button>
                    <button role="tab" aria-selected={tab === 3} onClick={() => setTab(3)}><span
                        className="flex flex-row gap-1"><img
                        src="/public/assets/98-icons/notepad_file-1.png"/> Rejestr Rozkazów</span></button>
                    <button role="tab" aria-selected={tab === 4} onClick={() => setTab(4)}><span
                        className="flex flex-row gap-1"><img height={16} width={16}
                                                             src="/public/assets/98-icons/server_window.png"/> Dane Stałe</span>
                    </button>
                    <button role="tab" aria-selected={tab === 5} onClick={() => setTab(5)}><span
                        className="flex flex-row gap-1"><img
                        src="/public/assets/98-icons/users-1.png"/> Lista Osób</span></button>
                    <button role="tab" aria-selected={tab === 6} onClick={() => setTab(6)}><span
                        className="flex flex-row gap-1"><img
                        src="/public/assets/98-icons/gears_tweakui_a-0.png"/> Opcje</span></button>
                    <button role="tab" aria-selected={tab === 7} onClick={() => setTab(7)}><span
                        className="flex flex-row gap-1"><img
                        src="/public/assets/98-icons/help_question_mark-1.png"/> Pomoc</span></button>
                </menu>
                {tab === 0 && (
                    <article role="tabpanel" style={{
                        background: "url(/public/assets/nastawnia.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundBlendMode: "multiply",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        padding: "0 0 0 0",
                    }} className="h-full">
                        <div className="h-full w-full bg-white bg-opacity-30">
                            <div className="absolute border flex flex-col items-end p-5 right-4 bottom-4">
                                <span className="text-black text-[14px]">zalogowano: <b> Mateusz Smoczyński</b></span>

                                <button className="flex flex-row gap-1 w-fit mt-4 py-1"><img
                                    src="/public/assets/98-icons/msg_error-2.png"/> Wyloguj
                                </button>
                            </div>
                        </div>
                    </article>
                )}
                {tab === 1 && (
                    <article role="tabpanel">
                    </article>
                )}
            </section>
        </div>
    );
}