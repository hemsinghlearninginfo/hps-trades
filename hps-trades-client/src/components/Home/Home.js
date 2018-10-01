import React from 'react';
import { emailService } from '../../_services';

const home = () => (
    <div>
        HOME
        <div className="App">
            <p className="App-intro">
                <button
                    onClick={() => {
                        const email = "hemsingh81@gmail.com";
                        if (email) {
                            emailService.sendEmail(email)
                                .then(({ message }) => {
                                    alert('Message : ' + message);
                                });
                        } else {
                            alert("Please add an email");
                        }
                    }}
                >
                    Send Email
                </button>
            </p>
        </div>
    </div>
);

export default home;