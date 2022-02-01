import * as actionTypes from './types'
// user actions
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  }
}

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
}

//channel actions

export const setCurrentChannel = (channel) => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}
<<<<<<< HEAD

export const setPrivateChannel = isPrivateChannel => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel
    }
  }
}
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
