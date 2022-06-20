import { all } from "redux-saga/effects";
// import {addVocabularySaga,handleGetVocabularySaga,handleDeleteVocabularySaga,editVocabularySaga} from "../slices/Vocabulary.slice"
// import {getVocabularyCheckingSaga} from "../slices/VocabularyChecking.slice"
import { 
    loginFaceBook,
    loginGoogle
} from "../slices/Login.slice"
import { 
    signUp
} from "../slices/SignUp.slice"

const sagasList = [
    loginFaceBook(),
    loginGoogle(),
    signUp()
    // addVocabularySaga(),
    // handleGetVocabularySaga(),
    // handleDeleteVocabularySaga(),
    // editVocabularySaga(),
    // getVocabularyCheckingSaga()
]
export default function* () {
    yield all(sagasList);
}
  