import React from 'react';
const loading = (props) => (
    <div className={(props.isDropper != undefined && props.isDropper) ? "dropper" : ""}>
        <div className="loading">
            <span>{props.message}</span>
        </div>
    </div>
);
export default loading;