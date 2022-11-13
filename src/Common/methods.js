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
    convertToTimeStamp,
    converTimeStampToDate,
    getCookie
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
  
function converTimeStampToDate(timeStamp){
  let d = new Date(timeStamp);

  const year = d.getFullYear()

  let month = d.getMonth() + 1
  if( month < 10) month=`0${month}`
  
  let day = d.getDate()
  if( day < 10) day=`0${day}`
  
  let hours = d.getHours()
  if( hours < 10) hours=`0${hours}`
  
  let minutes = d.getMinutes()
  if( minutes < 10) minutes=`0${minutes}`
  
  let seconds = d.getSeconds();
  if( seconds < 10) seconds=`0${seconds}`
  
  const result = `${day}/${month}/${year}`
  return result
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}