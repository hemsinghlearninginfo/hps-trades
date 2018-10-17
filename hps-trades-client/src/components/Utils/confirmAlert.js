import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.clickCancel = this.clickCancel.bind(this);
        this.clickYes = this.clickYes.bind(this);
    }

    clickCancel() {
        this.setState({
            modal: !this.state.modal
        });
    }

    clickYes(){
        this.clickCancel();
        this.props.yesButtonClick();
    }

    render() {
        const closeBtn = <button className="close" onClick={this.clickCancel}>&times;</button>;

        return (
            <div className="d-inline">
                <Button className={this.props.buttonClassName} color="danger" onClick={this.clickCancel}>{this.props.buttonIcon}{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.clickCancel} className={this.props.modalClassName}>
                    <ModalHeader toggle={this.clickCancel} close={closeBtn}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" color="primary" onClick={this.clickYes}>{this.props.yesButtonLabel}</Button>{' '}
                        <Button size="sm" color="secondary" onClick={this.clickCancel}>{this.props.cancelButtonLabel}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ConfirmAlert;
