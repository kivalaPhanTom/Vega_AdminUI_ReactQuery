import { LANGUAGE_STATE_EN } from './Language/lang_en'
import { LANGUAGE_STATE_VI } from './Language/lang_vi'
import { MessageCommon } from "../Common/message";
import { LANGUAGE } from "./Common_Parameter";
import moment from 'moment';
// import raw from '../langVn.txt';

export const MethodCommon = {
    saveLocalStorage,
    getLocalStorage,
    clearLocalStorage,
    getLanguage,
    formatTime,
    preventSpecialCharacters,
    renderFileLangVnFile,
    convertToTimeStamp
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
function convertToTimeStamp(timeMoment){  
  const timeStamp = new Date(timeMoment).getTime();
  return  timeStamp
}
function renderFileLangVnFile(){

  async function loadText(url) {
    let text = await fetch(url);
    //awaits for text.text() prop 
    //and then sends it to readText()
    readText(await text.text());
}

function readText(text){
    //here you can continue with your JS normal logic
    // console.log(text);
}

loadText('./langVn.txt');
}
  