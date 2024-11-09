import {ReactNode} from "react";

type Props = {
    children?: ReactNode;
}

export default function A4Template({children}: Props) {
    return (
        <div className="flex flex-col w-[21cm] h-[29.7cm] p-[1cm] bg-white border-2 border-gray-300 shadow-lg rounded-md" style={{ fontFamily: 'Times New Roman'}}>
            {children}
        </div>
    );
}