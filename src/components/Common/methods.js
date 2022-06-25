import { LANGUAGE_STATE_EN } from './Language/lang_en'
import { LANGUAGE_STATE_VI } from './Language/lang_vi'
import { MessageCommon } from "../Common/message";
import { LANGUAGE } from "./Common_Parameter";
export const MethodCommon = {
    saveLocalStorage,
    getLocalStorage,
    getLanguage
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