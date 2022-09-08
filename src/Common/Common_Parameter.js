// const SCREEN_NO={
    
//     Admin_User_List:"User_List",
//     Admin_User_Role:"User_Role",
//     Reading_Question:"Reading_Question",
//     Listening_Photo:"Listening_Photo",
//     Listening_Question_Response:"Listening_Question_Response",
//     Listening_Short_Conversation:"Listening_Short_Conversation",
//     Listening_Short_Talk:"Listening_Short_Talk",
//     Unit_Reading_Question_List:"Unit_Reading_Question_List",
//     Unit_Listening_Photo_List:"Unit_Listening_Photo_List",
//     Unit_Listening_Question_Response_List:"Unit_Listening_Question_Response_List",
//     Unit_Listening_Short_Conversation_List:"Unit_Listening_Short_Conversation_List",
//     Unit_Listening_Short_Talk_List:"Unit_Listening_Short_Talk_List",
//     Grammar:"Grammar",
//     Explaination_Short_Conversation:"Explaination_Short_Conversation",
//     Explaination_Short_Talk:"Explaination_Short_Talk",
//     Writing_Prictures:'Writing_Prictures',
//     Writing_Email:'Writing_Email',
//     Writing_Essay:'Writing_Essay',
//     Speaking_Text:'Speaking_Text',
//     Speaking_Opinion:'Speaking_Opinion',
//     Speaking_Picture:'Speaking_Picture'
// }

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
module.exports = {
    RESULT_STATUS ,
    METHOD_LOGIN,
    USER_ROLE,
    LANGUAGE 
};
