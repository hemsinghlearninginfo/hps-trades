import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import './Template.css';
import { getIcon } from '../../_helpers/'

const pageTemplate = (props) => (
    <Wrapper>
        <div className="template">
            <div className="contentItem">
                <div className="contentHeading">
                    <div className="row rowForIcons">
                        {getIcon(props.iconType)}
                        {props.heading}
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    </Wrapper>
);

export default pageTemplate;