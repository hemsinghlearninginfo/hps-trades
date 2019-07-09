import React from 'react';
import Wrapper from '../../hoc/Wrapper';
const Modal = ({ heading, handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (<Wrapper>
        <div className={showHideClassName}>
            <section className='modal-main'>
                <div className="modal-heading">
                    <span> {heading} </span><span className="modal-close" onClick={handleClose}>X</span >
                </div>
                <div className="modal-children">
                    {children}
                </div>
            </section>
        </div>
    </Wrapper>
    );
};

export default Modal;