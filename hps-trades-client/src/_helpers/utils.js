export const getQueryString = (props, queryStringName) => {
    let result = '';
    const hash = (props.location.hash).toString().replace('#/','');
    if (hash !== '') {
        var urlParams = new URLSearchParams(hash);
        if(urlParams.has(queryStringName))
        {
            result = urlParams.get(queryStringName);
        }
    }
    return result;
}