import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../../Firebase";

class Chat extends React.Component {

  

  state = {
    messages: []
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.UID
    };
  }

  componentDidMount() {
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        user={this.user}
        onSend={Firebase.shared.send}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Chat;
