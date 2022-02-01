import React from 'react'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'
import { Segment, Comment } from 'semantic-ui-react'
import firebase from '../../firebase'

class Messages extends React.Component {
  state = {
<<<<<<< HEAD
    privateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref('privateMessages'),
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numUniqueUsers: "",
    searchTerm: '',
    searchLoading: false,
    searchResults: []
  }

  componentDidMount() {
    const { channel, user } = this.state

    if (channel && user ) {
      this.addListeners(channel.id)
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId)
  }

  addMessageListener = channelId => {
    let loadedMessages = []
<<<<<<< HEAD
    const ref = this.getMessagesRef()
    ref.child(channelId).on('child_added', snap => {
=======
    this.state.messagesRef.child(channelId).on('child_added', snap => {
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
      this.countUniqueUsers(loadedMessages)
    })
  }

<<<<<<< HEAD
  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state
    return privateChannel ? privateMessagesRef : messagesRef
  }

=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages]
    const regex = new RegExp(this.state.searchTerm, 'gi')
    const searchResults = channelMessages.reduce((acc, message) => {
      if(message.content && message.content.match(regex)) {
        acc.push(message)
      }
      return acc
    }, [])
    this.setState({ searchResults })
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    }, () => this.handleSearchMessages())
  }

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if(!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : " "}`
    this.setState({ numUniqueUsers })
  }

  displayMessages = messages => (
    messages.length > 0 && messages.map(message =>(
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))
  )

<<<<<<< HEAD
  displayChannelName = channel => {
    return channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` : '' 
  }

  render() {
    const { messagesRef, messages, channel, user, numUniqueUsers, searchTerm, searchResults, privateChannel } = this.state
=======
  displayChannelName = channel => channel ? `#${channel.name}` : '';

  render() {
    const { messagesRef, messages, channel, user, numUniqueUsers, searchTerm, searchResults } = this.state
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9

    return (
      <React.Fragment>
        <MessagesHeader 
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          channelName={this.displayChannelName(channel)}
<<<<<<< HEAD
          // searchLoading={searchLoading}
          isPrivateChannel={privateChannel}
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
        />

        <Segment>
          <Comment.Group className="messages">
          {searchTerm ? this.displayMessages(searchResults) :
          this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
<<<<<<< HEAD
          getMessagesRef={this.getMessagesRef}
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isPrivateChannel={privateChannel}
=======
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
        />
      </React.Fragment>
    )
  }
}
 export default Messages
