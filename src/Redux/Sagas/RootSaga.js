import { all } from "redux-saga/effects";
// import {addVocabularySaga,handleGetVocabularySaga,handleDeleteVocabularySaga,editVocabularySaga} from "../slices/Vocabulary.slice"
// import {getVocabularyCheckingSaga} from "../slices/VocabularyChecking.slice"
import { 
    loginFaceBook,
    loginGoogle
} from "../slices/Login.slice"


const sagasList = [
    loginFaceBook(),
    loginGoogle(),
    // addVocabularySaga(),
    // handleGetVocabularySaga(),
    // handleDeleteVocabularySaga(),
    // editVocabularySaga(),
    // getVocabularyCheckingSaga()
]
export default function* () {
    yield all(sagasList);
}
  