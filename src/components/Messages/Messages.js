import React from 'react'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'
import { Segment, Comment } from 'semantic-ui-react'
import firebase from '../../firebase'

class Messages extends React.Component {
  state = {
    privateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref('privateMessages'),
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numUniqueUsers: "",
    searchTerm: '',
    searchLoading: false,
    searchResults: [],
    isChannelStarred: false
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
    const ref = this.getMessagesRef()
    ref.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
      this.countUniqueUsers(loadedMessages)
    })
  }

  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state
    return privateChannel ? privateMessagesRef : messagesRef
  }
  
  starChannel = () => {
    if (this.state.isChannelStarred) {
      console.log('star')
    } else {
      console.log('no star')
    }
  }


  handleStar = () => {
    this.setState(prevState => ({
      isChannelStarred: !prevState.isChannelStarred
    }), () => this.starChannel())
  }


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

  displayChannelName = channel => {
    return channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` : '' 
  }

  render() {
    const { 
      messagesRef, 
      messages, 
      channel, 
      user, 
      numUniqueUsers, 
      searchTerm, 
      searchResults, 
      privateChannel,
      isChannelStarred 
    } = this.state

    return (
      <React.Fragment>
        <MessagesHeader 
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          channelName={this.displayChannelName(channel)}
          // searchLoading={searchLoading}
          isPrivateChannel={privateChannel}
          handleStar={this.handleStar}
          isChannelStarred={isChannelStarred}
        />

        <Segment>
          <Comment.Group className="messages">
          {searchTerm ? this.displayMessages(searchResults) :
          this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          getMessagesRef={this.getMessagesRef}
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isPrivateChannel={privateChannel}
        />
      </React.Fragment>
    )
  }
}
 export default Messages
