import { extrasConstants } from '../_constants'
import { extrasService } from '../_services'

export function setFAQs(faqs) {
    return {
        type: extrasConstants.GET_FAQS,
        faqs
    }
}

export function fetchFAQs() {
    return dispatch => {
        extrasService.getFAQs()
        .then(data => dispatch(setFAQs(data.faqs)));
    }
}

export function addFAQs(faqs) {
    return {
        type: extrasConstants.ADD_FAQS,
        faqs
    }
}

export function saveFAQs() {
    return dispatch => {
        extrasService.saveFAQs()
        .then(data => dispatch(addFAQs(data.faqs)));
    }
}

