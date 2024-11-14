import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {User} from "../../utils/types";
import {callApi, Method} from "../../utils/call_api";
import {getJwt} from "../../utils/jwt";

export default function DriverTimetable() {
    const {projectId, timetableId} = useParams();

    const [jwt, setJwt] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        await getUser();
        setLoading(false);
    }

    const getUser = async () => {
        console.log(loading, jwt, user);
        const token = await getJwt();
        setJwt(token || '');
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
        <div>
            <p>Timetable</p>
            <p>Id rozkładu: {timetableId ?? ''}</p>
            <table className="border border-black">
                <thead>
                <tr>
                    <th className="border border-black font-normal p-1 w-10 text-left" rowSpan={6}>
                        Nr Linii
                    </th>
                    <th className="border border-black font-normal p-1" rowSpan={6}>
                        Km
                    </th>
                    <th className="border border-black font-normal p-1" rowSpan={6}>
                        V
                    </th>
                    <th className="border border-black font-normal p-1" rowSpan={6}>
                        V
                    </th>
                    <th className="border border-black font-normal p-1 w-60" rowSpan={6}>
                        Stacja
                    </th>
                    <th className="border border-black font-normal p-1 w-30" colSpan={2} rowSpan={6}>
                        Godzina
                    </th>
                    <th className="border border-black font-normal" rowSpan={2}>
                        LOKI
                    </th>
                    <th className="border border-black font-normal" rowSpan={3}>
                        Brutto
                    </th>
                    <th className="border border-black font-normal" rowSpan={3}>
                        Vmax
                    </th>
                </tr>
                <tr></tr>
                <tr>
                    <th className="border border-black font-normal" rowSpan={2}>
                        LOKII
                    </th>
                </tr>
                <tr>
                    <th className="border border-black font-normal" rowSpan={3}>
                        Dl. Poc.
                    </th>
                    <th className="border border-black font-normal" rowSpan={3}>
                        %
                    </th>
                </tr>
                <tr>
                    <th className="border border-black font-normal" rowSpan={2}>
                        LOKIII
                    </th>
                </tr>
                <tr></tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border border-black text-center" rowSpan={6}>
                        202
                    </td>
                    <td className="border border-black text-center" rowSpan={6}>

                    </td>
                    <td className="border border-black text-center" rowSpan={6}>
                        90
                    </td>
                    <td className="border border-black text-center" rowSpan={6}>
                        90
                    </td>
                    <td className="border border-black" rowSpan={6}>
                        <p>Bałtyk Towarowy gt</p>
                        <p className="text-right">R1 H L RT SS</p>
                    </td>
                    <td className="border border-black text-center" rowSpan={6}>
                        | <br/>
                        10.42
                    </td>
                    <td className="border border-black text-center" rowSpan={6}>
                        2
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                        EU07
                    </td>
                    <td className="border border-black text-center" rowSpan={3}>
                        780
                    </td>
                    <td className="border border-black text-center" rowSpan={3}>
                        90
                    </td>
                </tr>
                <tr></tr>
                <tr>
                    <td className="border border-black text-center" rowSpan={2}>
                        &#8203;
                    </td>
                </tr>
                <tr>
                    <td className="border border-black text-center" rowSpan={3}>
                        180
                    </td>
                    <td className="border border-black text-center" rowSpan={3}>
                        56
                    </td>
                </tr>
                <tr>
                    <td className="border border-black text-center" rowSpan={2}>
                        &#8203;
                    </td>
                </tr>
                <tr></tr>
                </tbody>
            </table>
        </div>
    );
}