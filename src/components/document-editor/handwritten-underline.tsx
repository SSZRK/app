import {CSSProperties} from "react";

export default function HandwrittenUnderline({
                                                 bold = false,
                                                 signature = false,
                                                 align = 'start',
                                                 size = '1rem',
                                                 width = '100%',
                                                 height = '100%',
                                                 text = '',
                                                 setText = (e) => {
                                                 }
                                             }) {
    return (
        <input value={text} onChange={(e) => setText(e.target.value)} name={'handwritten-underline'}
               className={`text-blue-700 font-normal px-2 outline-blue-400 ${bold ? 'border-b-[3px] border-black border-dotted' : 'border-b-2 border-black border-dotted'}`}
               style={signature ? {
                   fontFamily: 'Great Vibes', width: width, height: height, textAlign: align, fontSize: size,
               } as CSSProperties : {
                   fontFamily: 'Pacifico', width: width, height: height, textAlign: align, fontSize: size,
               } as CSSProperties
               }/>
    );
}