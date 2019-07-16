import React, { Component } from 'react';
import Components from '../index';
import { connect } from 'react-redux';
import { fetchFAQs, saveFAQs } from '../../_actions';
import { Button } from 'reactstrap';

// import styles from './extras.css'
import { iconConstants } from '../../_constants';

class FAQs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showModalWindow: false,
        };
    }

    showModal = () => {
        this.setState({ showModalWindow: true });
    }

    hideModal = () => {
        this.setState({ showModalWindow: false });
    }

    render() {
        const { requestLoading } = this.props;

        const faqs = (<div className="container ">
            <div className="panel-group" id="faqAccordion">
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle collapsed"
                        data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                        <h4 className="panel-title">
                            <a href="#" className="ing">Q: What is Lorem Ipsum?</a>
                        </h4>
                    </div>
                    <div id="question0" className="panel-collapse collapse">
                        <div className="panel-body">
                            <h5><span className="label label-primary">Answer</span></h5>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five <a href="http://jquery2dotnet.com/" className="label label-success">http://jquery2dotnet.com/</a> centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
        
        const addNewFaqs = (<div><Button color="primary" size="sm">Add New FAQs</Button></div>);

        return (
            <Components.PageTemplate iconType={iconConstants.QUESTION} heading="FAQs" >
                {requestLoading && (<Components.Loading message="loading" />)}
                {faqs}
                {addNewFaqs}
            </Components.PageTemplate >
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    if (match.params._id) {
        return {
            faqs: state.faqs
        }
    }
    return { faqs: null };
}

export default connect(mapStateToProps, { fetchFAQs, saveFAQs })(FAQs);
