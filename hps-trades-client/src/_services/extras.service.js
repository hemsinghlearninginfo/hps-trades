import { authHeaderAppJson } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';
import axios from 'axios';

export const extrasService = {
    getFAQs,
};

async function getFAQs() {
    try {
        const response = await axios.get(`${myConfig.ApiUrl}faqs`);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}


export async function saveFAQs(data) {
    try {
        const response = await axios.post(`${myConfig.ApiUrl}faqs`, data);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}
