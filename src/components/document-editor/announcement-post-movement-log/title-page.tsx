import HandwrittenUnderline from "../handwritten-underline.tsx";
import A4Template from "../a4-template.tsx";

type Props = {
    data: any;
    pageIndex: number;
    updatePage: (index: number, data: any) => void;
};

export default function AnnouncementPostMovementLogTitlePage({data, pageIndex, updatePage}: Props) {


    const handleChange = (field: string, value: any) => {
        updatePage(pageIndex, {
            ...data,
            [field]: value,
        });
    }

    return (
        <A4Template>
            <span className="font-bold text-xl">Zakład: <HandwrittenUnderline text={data.institution}
                                                                              setText={(value) => handleChange('institution', value)}
                                                                              size="1.25rem" width="270px" bold/></span>
            <span className="font-bold text-xl mt-4">Stacja: <HandwrittenUnderline text={data.station}
                                                                                   setText={(value) => handleChange('station', value)}
                                                                                   size="1.25rem" width="275px"
                                                                                   bold/></span>
            <span className="mt-4 flex flex-row">
                <span className="flex flex-col">
                    <span onClick={() => handleChange('type', 'signalbox')}
                          className={`border-b border-black w-[75px] cursor-pointer ${data.type === 'post' && 'line-through decoration-2 decoration-blue-700'}`}> nastawnia </span>
                    <span onClick={() => handleChange('type', 'post')}
                          className={`cursor-pointer ${data.type === 'signalbox' && 'line-through decoration-2 decoration-blue-700'}`}> posterunek </span>
                </span>
                <HandwrittenUnderline text={data.signalBoxOrPost}
                                      setText={(value) => handleChange('signalBoxOrPost', value)}
                                      size="1rem" height="30px" width="275px"/>
            </span>
            <span className="mt-1 flex flex-row">
                <span className="flex flex-col">
                    <span onClick={() => handleChange('type1', 'trail')}
                          className={`border-b border-black w-[75px] cursor-pointer ${data.type1 === 'space' && 'line-through decoration-2 decoration-blue-700'}`}> szlak </span>
                    <span onClick={() => handleChange('type1', 'space')}
                          className={`cursor-pointer ${data.type1 === 'trail' && 'line-through decoration-2 decoration-blue-700'}`}> odstęp </span>
                </span>
                <HandwrittenUnderline text={data.trailOrSpace1}
                                      setText={(value) => handleChange('trailOrSpace1', value)}
                                      size="1rem" height="30px" width="275px"/>
            </span>
            <span className="mt-1">
                i
            </span>
            <span className="mt-1 flex flex-row">
                <span className="flex flex-col">
                    <span onClick={() => handleChange('type2', 'trail')}
                          className={`border-b border-black w-[75px] cursor-pointer ${data.type2 === 'space' && 'line-through decoration-2 decoration-blue-700'}`}> szlak </span>
                    <span onClick={() => handleChange('type2', 'space')}
                          className={`cursor-pointer ${data.type2 === 'trail' && 'line-through decoration-2 decoration-blue-700'}`}> odstęp </span>
                </span>
                <HandwrittenUnderline text={data.trailOrSpace2}
                                      setText={(value) => handleChange('trailOrSpace2', value)}
                                      size="1rem" height="30px" width="275px"/>
            </span>
            <span className="font-bold text-6xl text-center mt-20"> DZIENNIK RUCHU </span>
            <span className="font-bold text-2xl text-center mt-4"> POSTERUNKU ZAPOWIADAWCZEGO </span>
            <span className="text-xl text-end mt-36"> Zaczęty dnia <HandwrittenUnderline text={data.startedDay}
                                                                                         setText={(value) => handleChange('startedDay', value)}
                                                                                         size="1.2rem"
                                                                                         width="195px"/> 20 <HandwrittenUnderline
                text={data.startedYear} setText={(value) => handleChange('startedYear', value)} size="1.5rem"
                width="65px"/> r. </span>
            <span className="text-xl text-end mt-8"> Zakończony dnia <HandwrittenUnderline size="1.2rem"
                                                                                           text={data.finishedDay}
                                                                                           setText={(value) => handleChange('finishedDay', value)}
                                                                                           width="160px"/> 20 <HandwrittenUnderline
                size="1.5rem" width="65px" text={data.finishedYear}
                setText={(value) => handleChange('finishedYear', value)}/> r. </span>
            <span className="text-xl text-end mt-4"> Liczba stron ponumerowanych <HandwrittenUnderline size="1.5rem"
                                                                                                       text={data.numberOfPages}
                                                                                                       setText={(value) => handleChange('numberOfPages', value)}
                                                                                                       width="160px"/> </span>
            <span className="text-xl text-end mt-2"> <HandwrittenUnderline align="center" size="1.2rem" width="410px"
                                                                           text={data.pagesInWords}
                                                                           setText={(value) => handleChange('pagesInWords', value)}/> </span>
            <span className="text-sm text-end mr-44 mt-1"> (słownie) </span>
            <span className="text-xl text-end mt-2"> <HandwrittenUnderline signature align="center" size="1.9rem"
                                                                           height="50px"
                                                                           width="410px" text={data.chiefSignature}
                                                                           setText={(value) => handleChange('chiefSignature', value)}/> </span>
            <span className="text-sm text-end mr-32 mt-1"> (podpis naczelnika sekcji) </span>
            <span
                className="text-sm text-start font-bold mt-14 border-black border-b-2 w-fit">  PKP 2728-161-11 (R-146) </span>
            <span className="text-sm text-start font-bold"> SSZRK Dokumenty </span>
        </A4Template>
    );
}