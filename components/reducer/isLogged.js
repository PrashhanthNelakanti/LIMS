const initialState = false

export default function loggedReducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN':
            // On SIGN_IN, return true if sessionStorage indicates login
            return sessionStorage.getItem('login') === 'yes'

        case 'LOGOUT':
            // On LOGOUT, clear sessionStorage and reset to false
            sessionStorage.removeItem('login')
            return false

        default:
            return state
    }
}
