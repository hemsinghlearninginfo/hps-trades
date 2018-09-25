import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Footer.css';

const footer = (props) => (
    <footer className="footer">
      <div className="container">
        <span>HPS-Trades.</span>
      </div>
    </footer>
);

export default CSSModules(footer, styles);