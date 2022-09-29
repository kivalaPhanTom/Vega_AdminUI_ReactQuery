import { LANGUAGE_STATE_EN } from './Language/lang_en'
import { LANGUAGE_STATE_VI } from './Language/lang_vi'
import { MessageCommon } from "../Common/message";
import { LANGUAGE } from "./Common_Parameter";
var moment = require('moment'); 
export const MethodCommon = {
    saveLocalStorage,
    getLocalStorage,
    clearLocalStorage,
    getLanguage,
    formatTime,
    preventSpecialCharacters
};

//save to local storage
function saveLocalStorage(name,value){
    localStorage.setItem(name, JSON.stringify(value));
}
//get value from local storage
function getLocalStorage(name_localstorage){
  var result = localStorage.getItem(name_localstorage);
  result = JSON.parse(result)
  return result
}
//clear localStorage
function clearLocalStorage(name_localstorage){
  localStorage.removeItem(name_localstorage);
}
//get language system
function getLanguage(){
    let ln = getLocalStorage("langVega")
    let result_ln = null
    if( ln === null)
    {
        localStorage.setItem("langVega", LANGUAGE.VI);
        ln = getLocalStorage("langVega")
    }
    switch (ln) {
        case LANGUAGE.VI:
            result_ln = LANGUAGE_STATE_VI
            break;
        case LANGUAGE.EN:
            result_ln = LANGUAGE_STATE_EN
            break;
        default:
            result_ln = LANGUAGE_STATE_VI
            break;
    }
    return result_ln
  }

  //format time
  function formatTime(value){
      if(value === "") {
        return 
      }else if (value === null) {
        return
      }else{
        return moment(value).utc(0).format("DD-MM-YYYY HH:mm")
      }
  }

function preventSpecialCharacters(characters){  
    return  characters.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  }
  