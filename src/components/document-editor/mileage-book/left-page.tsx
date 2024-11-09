import A4Template from "../a4-template.tsx";
import Handwritten from "../handwritten.tsx";
import {useEffect} from "react";
import HandwrittenArea from "../handwritten-area.tsx";

type Props = {
    data: any;
    pageIndex: number;
    updatePage: (index: number, data: any) => void;
}

export default function MileageBookLeftPage({data, pageIndex, updatePage}: Props) {
    useEffect(() => {
        if (data.rows.length !== 21)
            updatePage(pageIndex, {
                ...data,
                rows: Array.from({length: 21}, (_, i) => {
                    if (data.rows[i]) {
                        return data.rows[i];
                    } else {
                        return {
                            index: i,
                            trainNumber: '',
                            from: '',
                            onTrack: '',
                            arrivalIn: '',
                            arrivalTime: ':',
                            arrivalSignal: ':',
                            realArrival: ':',
                            remarks: '',
                        }
                    }
                })
            });
    }, [data]);
    const handleRowChange = (field: string, value: any, index: number) => {
        const rows = [...data.rows];
        rows[index][field] = value;
        updatePage(pageIndex, {
            ...data,
            rows: rows,
        });
    }

    const handleWideText = (value: any, index: number) => {
        const rows = [...data.rows];
        rows[index].wide = value;
        updatePage(pageIndex, {
            ...data,
            rows: rows,
        });
    }

    const handleCrossOut = (index: number) => {
        const rows = [...data.rows];
        rows[index].crossedOut = !rows[index].crossedOut;
        updatePage(pageIndex, {
            ...data,
            rows: rows,
        });
    }

    return (
        <A4Template>
            <table className="table-auto border-collapse border-2 border-black">
                <thead>
                <tr>
                    <th rowSpan={1} colSpan={3} className="font-normal border border-black border-r-2 text-sm">
                        Przygotować wjazd
                    </th>
                    <th rowSpan={1} colSpan={3} className="font-normal border border-black border-r-2 text-sm px-5">
                        Wjazd przygotowany (tor wolny)
                    </th>
                    <th rowSpan={1} colSpan={2} className="font-normal border border-black border-r-2 text-xs px-2">
                        Dać sygn. zezwala- jący na semafo- rze wjaz- dowym
                    </th>
                    <th rowSpan={1} colSpan={2} className="font-normal border border-black border-r-2 text-sm">
                        Pociąg wjechał
                    </th>
                    <th rowSpan={2} colSpan={1} className="font-normal border border-black text-sm">
                        Uwagi
                    </th>
                </tr>
                <tr>
                    <th className="font-normal border border-black text-sm w-20 px-4">
                        pociągu nr
                    </th>
                    <th className="font-normal border border-black text-sm w-20">
                        z (skrót sąsiedn. poster. zapow.)
                    </th>
                    <th className="font-normal border border-black border-r-2 text-sm w-14 px-4">
                        na tor
                    </th>
                    <th className="font-normal border border-black text-sm w-16 px-2">
                        w okręgu
                    </th>
                    <th className="font-normal border border-black text-sm w-10">
                        g.
                    </th>
                    <th className="font-normal border border-black border-r-2 text-sm w-10">
                        m.
                    </th>
                    <th className="font-normal border border-black text-sm w-10">
                        g.
                    </th>
                    <th className="font-normal border border-black border-r-2 text-sm w-10">
                        m.
                    </th>
                    <th className="font-normal border border-black text-sm w-10">
                        g.
                    </th>
                    <th className="font-normal border border-black border-r-2 text-sm w-10">
                        m.
                    </th>
                </tr>
                <tr>
                    <th className="font-normal border border-black text-xs">
                        1
                    </th>
                    <th className="font-normal border border-black text-xs">
                        2
                    </th>
                    <th className="font-normal border border-black border-r-2 text-xs">
                        3
                    </th>
                    <th className="font-normal border border-black text-xs">
                        4
                    </th>
                    <th colSpan={2} className="font-normal border border-black border-r-2 text-xs">
                        5
                    </th>
                    <th colSpan={2} className="font-normal border border-black border-r-2 text-xs">
                        6
                    </th>
                    <th colSpan={2} className="font-normal border border-black border-r-2 text-xs">
                        7
                    </th>
                    <th className="font-normal border border-black text-xs">
                        8
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    data.rows.map((row: any, index: number) => {
                        return <tr key={index} className="h-10 relative">
                            <td className="border border-black"><Handwritten text={row.trainNumber}
                                                                             setText={(e) => handleRowChange('trainNumber', e, index)}
                                                                             width="5rem" align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.from}
                                                                             setText={(e) => handleRowChange('from', e, index)}
                                                                             width="5rem"
                                                                             align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten text={row.onTrack}
                                                                                        setText={(e) => handleRowChange('onTrack', e, index)}
                                                                                        width="3.5rem"
                                                                                        align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.arrivalIn}
                                                                             setText={(e) => handleRowChange('arrivalIn', e, index)}
                                                                             width="4rem" align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.arrivalTime.split(':')[0]}
                                                                             setText={(e) => handleRowChange('arrivalTime', e + ':' + row.arrivalTime.split(':')[1], index)}
                                                                             width="2.5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.arrivalTime.split(':')[1]}
                                setText={(e) => handleRowChange('arrivalTime', row.arrivalTime.split(':')[0] + ':' + e, index)}
                                width="2.5rem"
                                align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.arrivalSignal.split(':')[0]}
                                                                             setText={(e) => handleRowChange('arrivalSignal', e + ':' + row.arrivalSignal.split(':')[1], index)}
                                                                             width="2.5rem" align="center"/>
                            </td>

                            <td className="border border-black border-r-2"><Handwritten
                                text={row.arrivalSignal.split(':')[1]}
                                setText={(e) => handleRowChange('arrivalSignal', row.arrivalSignal.split(':')[0] + ':' + e, index)}
                                width="2.5rem"
                                align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.realArrival.split(':')[0]}
                                                                             setText={(e) => handleRowChange('realArrival', e + ':' + row.realArrival.split(':')[1], index)}
                                                                             width="2.5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.realArrival.split(':')[1]}
                                setText={(e) => handleRowChange('realArrival', row.realArrival.split(':')[0] + ':' + e, index)}
                                width="2.5rem" height="full"
                                align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.remarks}
                                                                             setText={(e) => handleRowChange('remarks', e, index)}
                                                                             align="center"/>
                            </td>
                            {<div className="absolute flex flex-row h-10 left-[-44px] opacity-0 hover:opacity-100">
                                <button
                                    onClick={() => handleWideText((row.wide === null || row.wide === undefined) ? '' : null, index)}>
                                    <svg className="hover:fill-gray-700 size-6" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24">
                                        <title>Tekst na szerokosć</title>
                                        <path
                                            d="M20.5,18L17.5,21V19H5V17H17.5V15L20.5,18M10.13,10H13.88L12,4.97L10.13,10M12.75,3L17.5,14H15.42L14.5,11.81H9.5L8.58,14H6.5L11.25,3H12.75Z"/>
                                    </svg>
                                </button>
                                <button onClick={() => handleCrossOut(index)}>
                                    <svg className="hover:fill-gray-700 size-5" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24">
                                        <title>Przekreślenie</title>
                                        <path d="M3,14H21V12H3M5,4V7H10V10H14V7H19V4M10,19H14V16H10V19Z"/>
                                    </svg>
                                </button>
                            </div>}
                            {row.crossedOut &&
                                <span className="absolute border-b-2 border-blue-700 h-5 left-0 w-full"></span>}
                            {(row.wide !== null && row.wide !== undefined) &&
                                <span className="absolute h-10 left-0 w-full"> <HandwrittenArea
                                    text={row.wide}
                                    setText={(e) => handleWideText(e, index)}
                                    size="0.75rem" bg="transparent" align="center"/></span>}
                        </tr>
                    })
                }
                </tbody>
            </table>
        </A4Template>
    );
}