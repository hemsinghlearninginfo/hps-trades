import { header } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';


export const dataInitialiseService = {
    getMasterData,
};


async function getMasterData(type) {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };
    return fetch(`${myConfig.ApiUrl}mdata/?type=${type}`, requestOptions)
        .then(commonService.handleResponse);
}