import HandwrittenUnderline from "../handwritten-underline.tsx";
import A4Template from "../a4-template.tsx";
import Handwritten from "../handwritten.tsx";
import {useEffect} from "react";
import HandwrittenArea from "../handwritten-area.tsx";

export default function MileageBookRightPage({
                                                 data, pageIndex, updatePage = (index, data) => {
    }
                                             }) {
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
                            to: '',
                            fromTrack: '',
                            departureIn: '',
                            departureTime: ':',
                            departureSignal: ':',
                            realDeparture: ':',
                            remarks: '',
                        };
                    }
                }),
            });
    }, [data]);

    const handleTrainNumberChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        trainNumber: value,
                    }
                }
                return row;
            })
        });
    }

    const handleToChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        to: value,
                    }
                }
                return row;
            })
        });
    }

    const handleFromTrackChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        fromTrack: value,
                    }
                }
                return row;
            })
        });
    }

    const handleDepartureInChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        departureIn: value,
                    }
                }
                return row;
            })
        });
    }

    const handleDepartureTimeHoursChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        departureTime: value + ':' + data.rows[index].departureTime.split(':')[1],
                    }
                }
                return row;
            })
        });
    }

    const handleDepartureTimeMinutesChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        departureTime: data.rows[index].departureTime.split(':')[0] + ':' + value,
                    }
                }
                return row;
            })
        });
    }

    const handleDepartureSignalHoursChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        departureSignal: value + ':' + data.rows[index].departureSignal.split(':')[1],
                    }
                }
                return row;
            })
        });
    }

    const handleDepartureSignalMinutesChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        departureSignal: data.rows[index].departureSignal.split(':')[0] + ':' + value,
                    }
                }
                return row;
            })
        });
    }

    const handleRealDepartureHoursChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        realDeparture: value + ':' + data.rows[index].realDeparture.split(':')[1],
                    }
                }
                return row;
            })
        });
    }

    const handleRealDepartureMinutesChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        realDeparture: data.rows[index].realDeparture.split(':')[0] + ':' + value,
                    }
                }
                return row;
            })
        });
    }

    const handleRemarksChange = (index, value) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        remarks: value,
                    }
                }
                return row;
            })
        });
    }

    const handleCrossOut = (index) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        crossedOut: !row.crossedOut,
                    }
                }
                return row;
            })
        });
    }

    const handleWideText = (e, index) => {
        updatePage(pageIndex, {
            ...data,
            rows: data.rows.map((row, i) => {
                if (i === index) {
                    return {
                        ...row,
                        wide: e,
                    }
                }
                return row;
            })
        });
    }

    return (
        <A4Template>
            <table className="table-auto border-collapse border-2 border-black">
                <thead>
                <tr>
                    <th rowSpan={1} colSpan={3} className="font-normal border border-black border-r-2 text-sm">
                        Przygotować wyjazd
                    </th>
                    <th rowSpan={1} colSpan={3} className="font-normal border border-black border-r-2 text-sm px-5">
                        Wyjazd przygotowany (tor wolny)
                    </th>
                    <th rowSpan={1} colSpan={2} className="font-normal border border-black border-r-2 text-xs px-2">
                        Dać sygn. zezwala- jący na semafo- rze wyjaz- dowym
                    </th>
                    <th rowSpan={1} colSpan={2} className="font-normal border border-black border-r-2 text-sm">
                        Pociąg wyjechał
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
                        do (skrót sąsiedn. poster. zapow.)
                    </th>
                    <th className="font-normal border border-black border-r-2 text-sm w-14 px-4">
                        z toru
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
                    data.rows.map((row, index) => {
                        return <tr key={index} className="h-10 relative">
                            <td className="border border-black"><Handwritten text={row.trainNumber}
                                                                             setText={(e) => handleTrainNumberChange(index, e)}
                                                                             width="5rem" align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.to}
                                                                             setText={(e) => handleToChange(index, e)}
                                                                             width="5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten text={row.fromTrack}
                                                                                        setText={(e) => handleFromTrackChange(index, e)}
                                                                                        width="3.5rem"
                                                                                        align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.departureIn}
                                                                             setText={(e) => handleDepartureInChange(index, e)}
                                                                             width="4rem" align="center"/>
                            </td>
                            <td className="border border-black"><Handwritten text={row.departureTime.split(':')[0]}
                                                                             setText={(e) => handleDepartureTimeHoursChange(index, e)}
                                                                             width="2.5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.departureTime.split(':')[1]}
                                setText={(e) => handleDepartureTimeMinutesChange(index, e)}
                                width="2.5rem"
                                align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.departureSignal.split(':')[0]}
                                                                             setText={(e) => handleDepartureSignalHoursChange(index, e)}
                                                                             width="2.5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.departureSignal.split(':')[1]}
                                setText={(e) => handleDepartureSignalMinutesChange(index, e)}
                                width="2.5rem"
                                align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.realDeparture.split(':')[0]}
                                                                             setText={(e) => handleRealDepartureHoursChange(index, e)}
                                                                             width="2.5rem" align="center"/>
                            </td>
                            <td className="border border-black border-r-2"><Handwritten
                                text={row.realDeparture.split(':')[1]}
                                setText={(e) => handleRealDepartureMinutesChange(index, e)}
                                width="2.5rem"
                                align="center"/></td>
                            <td className="border border-black"><Handwritten text={row.remarks}
                                                                             setText={(e) => handleRemarksChange(index, e)}
                                                                             align="center"/>
                            </td>
                            {<div className="absolute flex flex-row h-10 right-[-42px] opacity-0 hover:opacity-100">
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