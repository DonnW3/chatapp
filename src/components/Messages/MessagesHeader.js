import React from 'react'
import { Header, Segment, Input, Icon } from 'semantic-ui-react'


class MessagesHeader extends React.Component {
  render() {
<<<<<<< HEAD
      const { 
        channelName, 
        numUniqueUsers, 
        handleSearchChange,
        searchLoading,
        isPrivateChannel 
      } = this.props
=======
      const { channelName, numUniqueUsers, handleSearchChange } = this.props
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9

    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
          {channelName}
<<<<<<< HEAD
          {!isPrivateChannel && <Icon name={"star outline"} color="black"/>}
=======
          <Icon name={"star outline"} color="black"/>
>>>>>>> 8928e5605a37df077aa5702aa4e32523f9f4e4a9
          </span>
          <Header.Subheader> {numUniqueUsers} </Header.Subheader>
        </Header>
        
        <Header floated="right">
          <Input
          onChange={handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
          />
        </Header>
      </Segment>
    )
  }
}


export default MessagesHeader
