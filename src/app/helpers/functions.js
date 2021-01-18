

export const buildQuery = (params) => {
    if(typeof params !== 'object') return '';

    let query = '';
    Object.keys(params).forEach(key => {
        if(query) query += '&';
        else query += '?';

        if(params[key]) query += `${key}=${params[key]}`;
        else query += `${key}=`;
    });

    return query;
}

export const dateString = (str) => {
    return str.replace('T', ' ').slice(0, 19);
}

export const isValidURL = (string) => {
    if(!string) return false;
    
    let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

export const getUserPermission = (current, permission) => {
    if(!current || !current.length) return null;

    for(var i = 0; i < current.length; i++){
        if(current[i].type === permission.type){
            return current[i];
        }
    }

    return null;
}