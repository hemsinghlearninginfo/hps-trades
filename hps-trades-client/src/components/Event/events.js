import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import styles from './calendar.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/'
import { Button } from 'reactstrap';

class Events extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }
    render() {
        return (
            <Components.PageTemplate iconType={iconConstants.Event} heading="Market Events">
                <div>
                    <Button className="btn btn-success pull-right btn-sm">Add New</Button>
                    <table className="table table-striped table-hover table-bordered table-fixed">
                        <thead>
                            <tr>
                                <th className="date">Date</th>
                                <th>Type</th>
                                <th>Message</th>
                                <th className="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="date">Date</td>
                                <td>Type</td>
                                <td>Message</td>
                                <td className="actions">
                                    <a href="#" className="editIcon" title="" data-toggle="tooltip" data-original-title="Edit">{getIcon(iconConstants.EDIT)}</a>
                                    <a href="#" className="deleteIcon" title="" data-toggle="tooltip" data-original-title="Delete">{getIcon(iconConstants.DELETE)}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Components.PageTemplate>
        );
    }
}

export default CSSModules(Events, styles);
