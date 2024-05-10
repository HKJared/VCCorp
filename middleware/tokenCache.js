var tokens = [];
const isTokenInCache = (token) => {
    if (!tokens.includes(token)) {
        return false;
    } 
    return true;
}

const addTokenToCache = (token) => {
    tokens.push(token);
}

const removeTokenInCache = (token) => {
    tokens = tokens.filter(item => item !== token);
}



module.exports = {
    isTokenInCache, addTokenToCache, removeTokenInCache
}