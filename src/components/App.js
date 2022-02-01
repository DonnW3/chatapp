import React from 'react';
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './App.css';


import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'

<<<<<<< HEAD
const App = ({ currentUser, currentChannel, isPrivateChannel }) => (
=======
const App = ({ currentUser, currentChannel }) => (
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
  <Grid columns="equal" className="app" style={{ background: '#eee'}}>
    <ColorPanel />
    <SidePanel
      currentUser={currentUser}
      key={currentUser && currentUser.uid}
      />

    <Grid.Column style={{ marginLeft: 320}}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
<<<<<<< HEAD
        isPrivateChannel={isPrivateChannel}
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
      />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>

  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
<<<<<<< HEAD
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
=======
  currentChannel: state.channel.currentChannel
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
})

export default connect(mapStateToProps)(App);
