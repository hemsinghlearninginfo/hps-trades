import React from 'react';
import './utils.css';

import Wrapper from '../../hoc/Wrapper';
const alert = (props) => (
    <Wrapper>
        {props.message &&
            <div><div className={`alert ${props.type}`}>{props.message}</div></div>
        }
    </Wrapper>
);
export default alert;