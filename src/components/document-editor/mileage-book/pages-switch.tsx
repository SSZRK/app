import MileageBookTitlePage from "./title-page.tsx";
import A4Template from "../a4-template.tsx";
import MileageBookLeftPage from "./left-page.tsx";
import MileageBookRightPage from "./right-page.tsx";

type Props = {
    pageType?: string;
    data?: any;
    pageIndex: number;
    updatePage?: any;
};

export default function MileageBookPagesSwitch({pageType = '', data, pageIndex, updatePage}: Props) {
    switch (pageType) {
        case 'title-page':
            return <MileageBookTitlePage pageIndex={pageIndex} updatePage={updatePage} data={data}/>;
        case 'blank-a4':
            return <A4Template/>;
        case 'left-page':
            return <MileageBookLeftPage pageIndex={pageIndex} updatePage={updatePage} data={data}/>;
        case 'right-page':
            return <MileageBookRightPage pageIndex={pageIndex} updatePage={updatePage} data={data}/>;
        default:
            return null;
    }
}