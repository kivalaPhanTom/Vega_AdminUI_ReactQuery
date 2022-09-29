const RESULT_STATUS= {
    SUCCESS: 1,
    ERROR:2,
    DATA_EXIST:3,
    ACCOUNT_NOT_FOUND:4,
    PASSWORD_ERROR:5,
    EMAIL_NOT_FOUND:6,
    ERROR_SYSTEM:7,
    REFRESH_TOKEN_SUCCESS:8,
    ERROR_AUTHENTICATE:9,
    GUESS_ACCOUNT:10
};

const METHOD_LOGIN = {
     TRANDITIONAL:0,
     SOCIAL:1,
     GUESS:2,
}
const USER_ROLE = {
    ADMIN:0,
    USER:1,
    GUESS:2
}
const LANGUAGE = {
    VI:0,
    EN:1
}
const PAGINATION_DEFAULT ={
    pageCurrent: 1,
    pageSize: 10
}
const TIME_TO_CALL_API = 2000
module.exports = {
    RESULT_STATUS ,
    METHOD_LOGIN,
    USER_ROLE,
    LANGUAGE,
    PAGINATION_DEFAULT,
    TIME_TO_CALL_API
};
