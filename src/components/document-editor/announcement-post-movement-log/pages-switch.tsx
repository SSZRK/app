import A4Template from "../a4-template.tsx";
import AnnouncementPostMovementLogTitlePage from "./title-page.tsx";
import AnnouncementPostMovementLogPage from "./page.tsx";

export default function AnnouncementPostMovementLogPagesSwitch({pageType = '', data, pageIndex, updatePage}) {
    switch (pageType) {
        case 'title-page':
            return <AnnouncementPostMovementLogTitlePage pageIndex={pageIndex} updatePage={updatePage} data={data}/>;
        case 'blank-a4':
            return <A4Template/>;
        case 'page':
            return <AnnouncementPostMovementLogPage pageIndex={pageIndex} updatePage={updatePage} data={data}/>;
        default:
            return null;
    }
}