import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import './Template.css';

const pageTemplate = (props) => (
    <Wrapper>
        <div className="template">
            <div className="contentItem">
                <div className="contentHeading">{props.heading}</div>
                {props.children}
            </div>
        </div>
    </Wrapper>
);

export default pageTemplate;