import { emailService } from '../_services';

export const emailActions = {
    emailNewUser,
};

function emailNewUser(user) {
    return emailService.sendEmail(user);
}
