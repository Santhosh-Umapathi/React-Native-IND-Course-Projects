import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {Form, Item, Label, Input, Button, Container} from 'native-base';


class HomeScreen extends Component{



    state = {
        name:''
    }

    render() {

        return (
          <Container style={styles.container}>
            <Form>
              <Item floatingLabel>
                <Label>UserName</Label>
              </Item>

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={name => {
                  console.log(name);
                  this.setState({ name });
                }}
              />

              <Button
                full
                rounded
                primary
                style={{
                  marginHorizontal: 70,
                  marginTop: 20,
                  backgroundColor: "#74B9FF"
                }}
                onPress={() => {
                  this.props.navigation.navigate("Chat", {
                    name: this.state.name
                  });
                }}
              >
                <Text style={{ fontSize: 20 }}>Start Chat</Text>
              </Button>
            </Form>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
    }

});

export default HomeScreen;