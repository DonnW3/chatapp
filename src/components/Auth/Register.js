import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import md5 from 'md5'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.isFormEmpty = this.isFormEmpty.bind(this)
    this.isPasswordValid = this.isPasswordValid.bind(this)
    this.displayErrors = this.displayErrors.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value})
  }

  isFormValid() {
    let errors = []
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Please fill in all fields"}
      this.setState({ errors: errors.concat(error) })
      return false
    }else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is not valid"}
      this.setState({ errors: errors.concat(error) })
      return false
    }else {
      //form valid
      return true
    }
  }

  isFormEmpty({username, email, password, passwordConfirmation}) {
    return !username.length || !email.length || !password.length ||
    !passwordConfirmation.length
  }

  isPasswordValid({ password, passwordConfirmation }) {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else {
      return password === passwordConfirmation
    }
  }

  displayErrors(errors) { return errors.map((error, i) => <p key={i}>{error.message}</p>) }


  handleSubmit(event) {
<<<<<<< HEAD
    event.preventDefault();
=======
    event.preventDefault()
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true })
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
<<<<<<< HEAD
=======
        console.log(createdUser)
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}d=identicon`
        })
        .then(() => {
          this.saveUser(createdUser).then(() => {
            console.log("user saved")
          })
        })
        .catch(err => {
          console.error(err)
          this.setState({ errors: this.state.errors.concat(err), loading: false})
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ errors: this.state.errors.concat(err), loading: false})
      })
    }
  }

  handleInputError = (errors, inputName) => {
    errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ""
  }

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  render () {
    const { username, email, password, passwordConfirmation, errors, loading} = this.state
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Register for chatapp
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="User Name"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Form.Input
                fluid name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button disabled={loading} className={ loading ? 'loading' : ''} color="orange" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Already a user? <Link to="/login">Login </Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
