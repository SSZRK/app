import HandwrittenUnderline from "../handwritten-underline.tsx";
import A4Template from "../a4-template.tsx";

type Props = {
    data: any;
    pageIndex: number;
    updatePage: (index: number, data: any) => void;
};
export default function MileageBookTitlePage({data, pageIndex, updatePage}: Props) {

    const handleChange = (field: string, value: any) => {
        updatePage(pageIndex, {
            ...data,
            [field]: value,
        });
    }

    return (
        <A4Template>
            <span className="font-bold text-xl">Zakład <HandwrittenUnderline text={data.institution}
                                                                             setText={(e) => handleChange('institution', e)}
                                                                             size="1.25rem" width="270px" bold/> </span>
            <span className="flex flex-col mt-4">
                <span onClick={() => handleChange('type', 'signalbox')}
                      className={`border-b border-gray-400 w-[335px] cursor-pointer ${data.type === 'switchpost' && 'line-through decoration-2 decoration-blue-700'}`}> Nastawnia </span>
                <span onClick={() => handleChange('type', 'switchpost')}
                      className={`cursor-pointer ${data.type === 'signalbox' && 'line-through decoration-2 decoration-blue-700'}`}> posterunek zwrotniczego </span>
            </span>
            <span className="font-bold text-5xl text-center mt-56"> KSIĄŻKA PRZEBIEGÓW </span>
            <span className="text-xl text-end mt-64"> Zaczęty dnia <HandwrittenUnderline text={data.startedDay}
                                                                                         setText={(e) => handleChange('startedDay', e)}
                                                                                         size="1.2rem"
                                                                                         width="195px"/> 20 <HandwrittenUnderline
                text={data.startedYear} setText={(e) => handleChange('startedYear', e)}
                size="1.5rem"
                width="65px"/> r. </span>
            <span className="text-xl text-end mt-8"> Zakończony dnia <HandwrittenUnderline size="1.2rem"
                                                                                           text={data.finishedDay}
                                                                                           setText={(e) => handleChange('finishedDay', e)}
                                                                                           width="160px"/> 20 <HandwrittenUnderline
                size="1.5rem" width="65px" text={data.finishedYear}
                setText={(e) => handleChange('finishedYear', e)}
            /> r. </span>
            <span className="text-xl text-end mt-4"> Liczba stron ponumerowanych <HandwrittenUnderline size="1.5rem"
                                                                                                       text={data.numberOfPages}
                                                                                                       setText={(e) => handleChange('numberOfPages', e)}
                                                                                                       width="160px"/> </span>
            <span className="text-xl text-end mt-2"> <HandwrittenUnderline align="center" size="1.2rem" width="410px"
                                                                           text={data.pagesInWords}
                                                                           setText={(e) => handleChange('pagesInWords', e)}
            /> </span>
            <span className="text-sm text-end mr-44 mt-1"> (słownie) </span>
            <span className="text-xl text-end mt-2"> <HandwrittenUnderline signature align="center" size="1.9rem"
                                                                           height="50px"
                                                                           width="410px" text={data.chiefSignature}
                                                                           setText={(e) => handleChange('chiefSignature', e)}
            /> </span>
            <span className="text-sm text-end mr-32 mt-1"> (podpis naczelnika sekcji) </span>
            <span
                className="text-sm text-start font-bold mt-14 border-black border-b-2 w-fit">  PKP 2728-130-01 (R-142) </span>
            <span className="text-sm text-start font-bold"> SSZRK Dokumenty </span>
        </A4Template>
    );
}