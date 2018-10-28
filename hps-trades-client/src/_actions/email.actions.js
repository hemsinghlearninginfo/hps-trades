import { emailService } from '../_services';

export const emailActions = {
    emailForNewUserRegistration,
};

function emailForNewUserRegistration(user) {
    return emailService.emailForNewUserRegistration(user);
}
