import React from 'react'
import './Modal.css'
function Modal({ text, copy, mt }) {

    let handleCopy = () => {
        let code = text.split(":- ").pop()
        navigator.clipboard.writeText(code)
    }
    return (
        <div className='modalroot'>
            <div className='mainmodal'>
                <div style={{marginTop:`${mt}`}} className='popup'>
                    <h4> {text} </h4>
                    {
                        copy && <span className="material-symbols-outlined btncopy" onClick={handleCopy}>
                            content_copy
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal