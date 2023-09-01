export const userDetailsAction = (details) => ({
    type: 'USER_DETAILS',
    payload: details
})

export const questionsListAction = (questions) => ({
    type: 'QUESTIONS_LIST',
    payload: questions
})

export const userAnswersAction = (answers) => ({
    type: 'USER_ANSWERS',
    payload: answers
})

export const userScoreAction = (score) =>({
    type: 'USER_SCORE',
    payload: score
})