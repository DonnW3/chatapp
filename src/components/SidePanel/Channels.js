import React from 'react'
import firebase from '../../firebase'
import { connect } from 'react-redux'
<<<<<<< HEAD
import { setCurrentChannel, setPrivateChannel } from '../../actions'
import { Menu, Icon, Modal, Form, Input, Button, Label } from 'semantic-ui-react'
=======
import { setCurrentChannel } from '../../actions'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9

class Channels extends React.Component {
  state = {
    activeChannel: '',
    user: this.props.currentUser,
<<<<<<< HEAD
    channel: null,
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
<<<<<<< HEAD
    messagesRef: firebase.database().ref('messages'),
    notifications: [],
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
    modal: false,
    firstLoad: true
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners = () => {
    let loadedChannels = []
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels}, () => this.setFirstChannel())
<<<<<<< HEAD
      this.addNotificationListener(snap.key)
    })
  }

  addNotificationListener = channelId => {
    this.state.messagesRef.child(channelId).on('value', snap => {
      if(this.state.channel) {
        this.handleNotifications(channelId, this.state.channel.id, this.state.notifications, snap)
      }
    })
  }

  handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0

    let index = notifications.findIndex(notification => notification.id === channelId)

    if(index !== -1) {
      
      if(channelId !== currentChannelId) {
        lastTotal = notifications[index].total

        if(snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren()
    }else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0
      })
    }

    this.setState({ notifications })
  }

=======
    })
  }

>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
  removeListeners = () => {
    this.state.channelsRef.off()
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0]
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
<<<<<<< HEAD
      this.setState({ channel: firstChannel })
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
    }
    this.setState({ firstLoad: false })
  }

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state
    const key = channelsRef.push().key
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: ''})
        this.closeModal()
        console.log('channel added')
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      this.addChannel()
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  changeChannel = channel => {
    this.setActiveChannel(channel)
<<<<<<< HEAD
    this.clearNotifications()
    this.props.setCurrentChannel(channel)
    this.props.setPrivateChannel(false)
    this.setState({ channel })
  }

  clearNotifications = () => {
    let index = this.state.notifications.findIndex(notification => notification.id === this.state.channel.id)

    if(index !== -1) {
      let updatedNotifications = [...this.state.notifications]
      updatedNotifications[index].total = this.state.notifications[index].lastKnownTotal
      updatedNotifications[index].count = 0
      this.setState({ notifications: updatedNotifications })
    }
=======
    this.props.setCurrentChannel(channel)
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

<<<<<<< HEAD
  getNotificationCount = channel => {
    let count = 0


    this.state.notifications.forEach(notification => {
      if(notification.id === channel.id) {
        count = notification.count;
      }
    })

    if(count > 0) return count
  }

=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
  displayChannels = channels => (
    channels.length > 0 && channels.map( channel => (
      <Menu.Item
      key={channel.id}
      onClick={() => this.changeChannel(channel)}
      name={channel.name}
      style={{ opacity: 0.7 }}
      active={ channel.id === this.state.activeChannel}
      >
<<<<<<< HEAD
        {this.getNotificationCount(channel) && (
          <Label color="red">{this.getNotificationCount(channel)}</Label>
        )}
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
      #{channel.name}
      </Menu.Item>
    ))
  )

  isFormValid = ({ channelName, channelDetails}) => channelName && channelDetails

  closeModal = () => this.setState({ modal: false })

  openModal = () => this.setState({ modal: true })


  render() {
    const { channels, modal } = this.state

    return (
      <React.Fragment>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>{ " "}
          ({channels.length}) <Icon name="add" onClick={this.openModal}/>
        </Menu.Item>
        {this.displayChannels(channels)}
      </Menu.Menu>

      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={this.handleChange}
              />
            </Form.Field>

          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={this.handleSubmit}>
            <Icon name="checkmark"/> Add
          </Button>
          <Button color="red" inverted onClick={this.closeModal}>
            <Icon name="remove"/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      </React.Fragment>
    )
  }
}

<<<<<<< HEAD
export default connect(
  null, 
  { setCurrentChannel, setPrivateChannel }
  )(Channels)
=======
export default connect(null, { setCurrentChannel })(Channels)
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
