import {useNavigate, Link} from 'react-router-dom';

export default function About() {

    return (
        <div className="h-full bg-gray-200 p-8">
            <div className="bg-white rounded-lg shadow-xl pb-8">
                <div className="w-full h-[250px]">
                    <img src="/assets/tory.webp" className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"/>
                </div>
                <div className="flex flex-col items-center -mt-20">
                    <Link to="/" > <img src="/assets/icons/icon-full.webp" className="w-40"/></Link>
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl">Symulacyjny System Zarządzania Ruchem Kolejowym</p>
                    </div>
                    <p className="text-gray-700">Copyright © { new Date().getFullYear() }</p>
                </div>
            </div>

            <div className="my-4">
                <div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Ważne inforamcje</h4>
                        <ul className="mt-1 text-gray-700">
                            <li className="flex border-y py-2">
                                <span className="text-gray-700">System w fazie wczesnych testów, w razie napotkania jakichkolwiek błędów, prosimy zgłaszać je na naszym discordzie.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8 mt-4">
                        <h4 className="text-xl text-gray-900 font-bold">Autorzy</h4>
                        <ul className="mt-2 text-gray-700">
                            <li className="flex border-y py-2">
                                <span className="font-bold w-40">Główna koncepcja</span>
                                <span className="text-gray-700">Prezes2137</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-40">Programiści</span>
                                <span className="text-gray-700">Prezes2137, smoczysko12</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-40">Materiały źródłowe</span>
                                <span className="text-gray-700">smoczysko12, Marcin</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Changelog</h4>
                        <div className="relative px-4">
                            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
                            <ChangelogElement title="Dodano:" description="Ekrany SIP na stacji" date="25.04.2024"/>
                            <ChangelogElement title="Dodano:" description="Moduły SIP" date="24.04.2024"/>
                            <ChangelogElement title="Dodano:" description="Regulamin" date="21.04.2024"/>
                            <ChangelogElement title="Zaktualizowano:" description="Generator rozkładów jazdy" date="21.04.2024"/>
                            <ChangelogElement title="Dodano:" description="Ekran SWDR" date="03.01.2024"/>
                            <ChangelogElement title="Dodano:" description="Logowanie i rejestrację" date="01.01.2024"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChangelogElement(props) {
    const {title, description, date} = props;

    return (
        <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
                <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
                <p className="text-md text-gray-800 font-bold">{title}</p>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="text-xs text-gray-300 ">{date}</p>
            </div>
        </div>
    );
}