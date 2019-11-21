import { createStore } from 'redux'

let defaultState = {
    novelList:[],
    category: [],
    detail:{},
    myBook:[],
    currentIndex:0
    
}
let reducer = (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_STATE":
            newState[action.key] = action.value
            return newState
        default: return state
    }
}

let store = createStore(reducer)

export default store