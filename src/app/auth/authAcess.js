export const checkAccess = (user, type) => {
    if(user.role === 'ADMIN') return true;

    if(!user.permissions || !user.permissions.length) return false;

    for(var i = 0; i < user.permissions.length; i++){
        if(user.permissions[i].type === type) return true;
    }

    return false;
}