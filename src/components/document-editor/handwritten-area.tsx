import {CSSProperties} from "react";

export default function HandwrittenArea({
                                            signature = false,
                                            size = '1rem',
                                            width = '100%',
                                            height = '100%',
                                            align = 'start',
                                            text = '',
                                            bg = 'white',
                                            setText = (e) => {
                                            }
                                        }) {
    return (
        <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} name={'handwritten-area'}
                  className={`text-blue-700 font-normal px-2 pt-0.5 resize-none outline-blue-400`}
                  style={{
                      fontFamily: 'Pacifico',
                      fontSize: size,
                      width: width,
                      height: height,
                      textAlign: align,
                      backgroundColor: bg,
                  } as CSSProperties}/>
    );
}