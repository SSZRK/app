import A4Template from "../a4-template.tsx";
import Handwritten from "../handwritten.tsx";
import {useEffect} from "react";
import HandwrittenArea from "../handwritten-area.tsx";
import HandwrittenUnderline from "../handwritten-underline.tsx";

type Props = {
    data: any;
    pageIndex: number;
    updatePage: (index: number, data: any) => void;
}

export default function AnnouncementPostMovementLogPage({data, pageIndex, updatePage}: Props) {
    useEffect(() => {
        if (data.rows.length !== 20)
            updatePage(pageIndex, {
                ...data,
                rows: Array.from({length: 20}, (_, i) => {
                    if (data.rows[i]) {
                        return data.rows[i];
                    } else {
                        return {
                            index: i,
                            trainNumberEven: '',
                            trainNumberOdd: '',
                            track: '',
                            freeRoad: ':',
                            trainDeparted: ':',
                            trainArrived: ':',
                            remarks: '',
                            notified: ['', '', '', '', '', ''],
                        }
                    }
                })
            });
    }, [data]);

    const handleChange = (field: string, value: any) => {
        updatePage(pageIndex, {
            ...data,
            [field]: value,
        });
    }

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
            <span className="text-center mb-2 mt-[-10px]">
                <span
                    className={`cursor-pointer ${data.type === 'space' && 'line-through decoration-2 decoration-blue-700'}`}
                    onClick={() => handleChange('type', 'trail')}>Szlak</span>/<span
                className={`cursor-pointer ${data.type === 'trail' && 'line-through decoration-2 decoration-blue-700'}`}
                onClick={() => handleChange('type', 'space')}>odstęp</span> z i do:
                <HandwrittenUnderline text={data.fromAndTo}
                                      setText={(value) => handleChange('fromAndTo', value)}
                                      size="0.9rem" width="220px"/>
            </span>
            <table className="table-auto border-collapse border-2 border-black">
                <thead>
                <tr>
                    <th rowSpan={1} colSpan={2}
                        className="font-normal border border-black border-b-2 border-r-2 text-sm">
                        Nr pociągu
                    </th>
                    <th rowSpan={2} colSpan={1}
                        className="font-normal border border-black border-r-2 text-[14px] border-b-2 leading-4 py-4 w-10">
                        Tor sta- cyj- ny
                    </th>
                    <th rowSpan={1} colSpan={2}
                        className="font-normal border border-black border-b-2 border-r-2 text-sm">
                        Droga wolna
                    </th>
                    <th rowSpan={1} colSpan={2}
                        className="font-normal border border-black border-b-2 border-r-2 text-sm">
                        Pociąg odjechał
                    </th>
                    <th rowSpan={1} colSpan={2}
                        className="font-normal border border-black border-b-2 border-r-2 text-sm">
                        Pociąg przyje- chał
                    </th>
                    <th rowSpan={2} colSpan={1}
                        className="font-normal border border-black border-b-2 border-r-2 text-sm">
                        Uwagi
                    </th>
                    <th rowSpan={1} colSpan={6} className="font-normal border border-black border-b-2 text-xs">
                        O jeździe pociągu zawiadomiono dróżników przejazdowych
                    </th>
                </tr>
                <tr>
                    <th className="font-normal border border-black border-b-2 text-sm w-16">
                        nieparzysty
                    </th>
                    <th className="font-normal border border-black border-b-2 border-r-2 text-sm w-16">
                        parzysty
                    </th>
                    <th className="font-normal border border-black border-b-2 text-sm w-8">
                        g.
                    </th>
                    <th className="font-normal border border-black border-b-2 border-r-2 text-sm w-8">
                        m.
                    </th>
                    <th className="font-normal border border-black border-b-2 text-sm w-8">
                        g.
                    </th>
                    <th className="font-normal border border-black border-b-2 border-r-2 text-sm w-8">
                        m.
                    </th>
                    <th className="font-normal border border-black border-b-2 text-sm w-8">
                        g.
                    </th>
                    <th className="font-normal border border-black border-b-2 border-r-2 text-sm w-8">
                        m.
                    </th>
                    <th className="font-normal border border-black border-b-2 text-sm w-6"></th>
                    <th className="font-normal border border-black border-b-2 text-sm w-6"></th>
                    <th className="font-normal border border-black border-b-2 text-sm w-6"></th>
                    <th className="font-normal border border-black border-b-2 text-sm w-6"></th>
                    <th className="font-normal border border-black border-b-2 text-sm w-6"></th>
                    <th className="font-normal border border-black border-b-2 text-sm w-6"></th>
                </tr>
                <tr>
                    <th className="font-normal border border-black text-xs">
                        1
                    </th>
                    <th className="font-normal border border-black border-r-2 text-xs">
                        2
                    </th>
                    <th className="font-normal border border-black border-r-2 text-xs">
                        3
                    </th>
                    <th colSpan={2} className="font-normal border border-black border-r-2 text-xs">
                        4
                    </th>
                    <th colSpan={2} className="font-normal border border-black border-r-2 text-xs">
                        5
                    </th>
                    <th colSpan={2} className="font-normal border border-black border-r-2 text-xs">
                        6
                    </th>
                    <th className="font-normal border border-black border-r-2 text-xs">
                        7
                    </th>
                    <th colSpan={6} className="font-normal border border-black text-xs">
                        8
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    data.rows.map((row: any, index: number) => {
                        return <tr key={index} className="h-11 relative">
                            <td className="border border-black"><Handwritten text={row.trainNumberOdd}
                                                                             setText={(e) => handleRowChange('trainNumberOdd', e, index)}
                                                                             width="5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten text={row.trainNumberEven}
                                                                                        setText={(e) => handleRowChange('trainNumberEven', e, index)}
                                                                                        width="5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten text={row.track}
                                                                                        setText={(e) => handleRowChange('track', e, index)}
                                                                                        align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.freeRoad.split(':')[0]}
                                                                             setText={(e) => handleRowChange('freeRoad', `${e}:${row.freeRoad.split(':')[1]}`, index)}
                                                                             align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.freeRoad.split(':')[1]}
                                setText={(e) => handleRowChange('freeRoad', `${row.freeRoad.split(':')[0]}:${e}`, index)}
                                align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.trainDeparted.split(':')[0]}
                                                                             setText={(e) => handleRowChange('trainDeparted', `${e}:${row.trainDeparted.split(':')[1]}`, index)}
                                                                             align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.trainDeparted.split(':')[1]}
                                setText={(e) => handleRowChange('trainDeparted', `${row.trainDeparted.split(':')[0]}:${e}`, index)}
                                align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.trainArrived.split(':')[0]}
                                                                             setText={(e) => handleRowChange('trainArrived', `${e}:${row.trainArrived.split(':')[1]}`, index)}
                                                                             align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.trainArrived.split(':')[1]}
                                setText={(e) => handleRowChange('trainArrived', `${row.trainArrived.split(':')[0]}:${e}`, index)}
                                align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten text={row.remarks}
                                                                                        setText={(e) => handleRowChange('remarks', e, index)}
                                                                                        align="center"/>
                            </td>
                            {
                                row.notified.map((notified: string, notifiedIndex: number) => {
                                    return <td key={notifiedIndex} className="border border-black">
                                        <Handwritten text={notified}
                                                     setText={(e) => {
                                                         const notified = [...row.notified];
                                                         notified[notifiedIndex] = e;
                                                         handleRowChange('notified', notified, index);
                                                     }} size="0.6rem"
                                                     align="center"/>
                                    </td>
                                })
                            }
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
    )
        ;
}