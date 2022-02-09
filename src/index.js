import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import firebase from './firebase'

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
<<<<<<< HEAD
// import { composeWithDevTools } from 'redux-devtools-extension'
=======
import { composeWithDevTools } from 'redux-devtools-extension'
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
import rootReducer from './reducers'
import { setUser, clearUser } from './actions'
import Spinner from './Spinner'

<<<<<<< HEAD
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
=======
const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
  componentDidMount() {
    console.log(this.props.isLoading)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
        this.props.setUser(user)
        this.props.history.push('/')
      } else {
        this.props.history.push('/login')
        this.props.clearUser()
      }
    })
  }
  render() {
    return this.props.isLoading ? <Spinner /> : (
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
    )

  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser, clearUser }
    )(Root)
  )

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
