import {CSSProperties} from "react";

export default function Handwritten({
                                        signature = false,
                                        size = '1rem',
                                        width = '100%',
                                        height = 'auto',
                                        align = 'start',
                                        text = '',
                                        bg = 'white',
                                        setText = (e) => {
                                        }
                                    }) {
    return (
        <input value={text} onChange={(e) => setText(e.target.value)} name={'handwritten'}
               className={`text-blue-700 font-normal px-0.5 outline-blue-400 bg-${bg} text-${align}`}
               style={{
                   fontFamily: 'Pacifico',
                   height: height,
                   width: width,
                   fontSize: size,
               } as CSSProperties
               }/>
    );
}