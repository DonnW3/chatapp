import { combineReducers } from 'redux'
import * as actionTypes from '../actions/types'

const initialUserState = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      }
      case actionTypes.CLEAR_USER:
        return {
          ...state,
          isLoading: false
        }
      default:
        return state
  }
};

const initialChannelState = {
<<<<<<< HEAD
  currentChannel: null,
  isPrivateChannel: false
=======
  currentChannel: null
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
}

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
    return {
      ...state,
      currentChannel: action.payload.currentChannel
      }
<<<<<<< HEAD
      case actionTypes.SET_PRIVATE_CHANNEL:
        return {
          ...state,
          isPrivateChannel: action.payload.isPrivateChannel
        }
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
      default:
        return state
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
})

export default rootReducer
