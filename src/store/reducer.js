import { combineReducers } from "redux";

const userList = {
    questions: [],
    answers: []
}

const getQuestionsList = (state = userList.questions, action) => {
    switch(action.type){
        case 'QUESTIONS_LIST':
            return  action.payload
        default:
            return state
    }
}

const getUserDetails = (state = '', action) => {
    switch(action.type){
        case 'USER_DETAILS':
            return {
                email: action.payload
            }
        default:
            return {
                email: state
            }
    }
}

const getUserAnswers = (state = userList.answers, action) => {
    switch(action.type){
        case 'USER_ANSWERS':
            return {
                answers: action.payload
            }
        default:
            return {
                answers: state
            }
    }
}

const getUserScore = (state = 'Please login and solve first', action) => {
    switch(action.type){
        case 'USER_SCORE':
            return {
                score: action.payload
            }
        default:
            return {
                score: state
            }
    }
}

const rootReducer = combineReducers({
    allQuestions: getQuestionsList,
    userDetails: getUserDetails,
    userAnswers: getUserAnswers,
    userScore: getUserScore
});

export default rootReducer;