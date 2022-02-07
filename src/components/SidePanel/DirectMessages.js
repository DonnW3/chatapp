import React from 'react'
import firebase from '../../firebase'
<<<<<<< HEAD
import { connect } from 'react-redux'
import { setCurrentChannel, setPrivateChannel } from '../../actions'
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
import { Menu, Icon } from 'semantic-ui-react'
import { NimbleEmoji } from 'emoji-mart'

class DirectMessages extends React.Component {
    state = {
<<<<<<< HEAD
        activeChannel: '',
=======
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
        users: [],
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
<<<<<<< HEAD
        presenceRef: firebase.database().ref('presence')
=======
        presenceRef: firebase.database().ref('presence'),
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.uid)
        }
    }

    addListeners = currentUserUid => {
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap => {
            if (currentUserUid !== snap.key) {
                let user = snap.val();
                user["uid"] = snap.key;
                user["status"] = 'offline';
                loadedUsers.push(user);
                this.setState({ users: loadedUsers });
            }
        });

        this.state.connectedRef.on('value', snap => {
            if (snap.val() === true) {
                const ref = this.state.presenceRef.child(currentUserUid)
                ref.onDisconnect().remove(err => {
                    if (err !== null) {
                        console.error(err)
                    }
                })
            }
        })

        this.state.presenceRef.on('child_added', snap => {
            if (currentUserUid !== snap.key) {
                this.addStatusToUser(snap.key)
            }
        })

        this.state.presenceRef.on('child_removed', snap => {
            if (currentUserUid !== snap.key) {
                this.addStatusToUser(snap.key, false)
            }
        })
    }

    addStatusToUser = (userId, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc, user) => {
            if (user.uid === userId) {
                user['status'] = `${connected ? 'online' : 'offline'}`
            }
            return acc.concat(user)
        }, [])
        this.setState({ users: updatedUsers})
    }

<<<<<<< HEAD
    isUserOnline = user => user.status === "online";

    
    changeChannel = user => {
        const channelId = this.getChannelId(user.uid);
        const channelData = {
            id: channelId,
            name: user.name
        }
        this.props.setCurrentChannel(channelData)
        this.props.setPrivateChannel(true)
        this.setActiveChannel(user.uid)
    }
    
    getChannelId = userId => {
        const currentUserId = this.state.user.uid;
        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`
    }

    setActiveChannel = userId => {
        this.setState({ activeChannel: userId })
    }

    
    render() {
        const { users, activeChannel } = this.state;
=======
    isUserOnline = user => user.status === 'online'
    
    
    render() {
        const { users } = this.state;
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="mail" /> DIRECT MESSAGES
                    </span>{''}
                    ({ users.length })
                </Menu.Item>
                {users.map(user => (
                    <Menu.Item
                    key={user.uid}
<<<<<<< HEAD
                    active={user.uid === activeChannel}
                    onClick={() => this.changeChannel(user)}
=======
                    onClick={() => console.log(user)}
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
                    style={{ opacity: 0.5, fontStyle: 'italic'}}
                    >
                        <Icon
                            name="circle"
<<<<<<< HEAD
                            color={this.isUserOnline(user) ? 'green' : 'grey'}
=======
                            color={this.isUserOnline(user) ? 'green' : 'purple'}
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
                        />
                        @ {user.name}
                    </Menu.Item>
                ))}
            </Menu.Menu>
        )
    }
}

<<<<<<< HEAD
export default connect(null, { setCurrentChannel, setPrivateChannel })
( DirectMessages);
=======
export default DirectMessages;
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
