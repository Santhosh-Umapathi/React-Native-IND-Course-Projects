import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Button, TextInput, ScrollView } from 'react-native';

export default class HomeScreen extends Component {

constructor(props) {
    super(props);
    this.state =
    {
        albums: [],
    }
}


    componentDidMount()
    {
        this.getAllData();
    }
    
    //API Call
    getAllData = () => {
        return fetch('https://rallycoding.herokuapp.com/api/music_albums.json')
            .then(response =>response.json())
            .then((responseJSON) =>this.setState({ albums: responseJSON }))
            .catch(error => console.log(error))
        
    };

    renderAlbums = () => {
        return this.state.albums.map(album => (
          <View style={styles.rowView}>
            <View style={styles.rowItem}>
              <Image
                source={{uri: album.thumbnail_image}}
                style={styles.imageStyle}
              />
              <View style={{justifyContent: 'center', marginLeft: 10}}>
                <Text style={{fontSize: 25, marginBottom: 5}}>
                  {album.title}
                </Text>
                <Text style={{fontSize: 15, color: 'gray'}}>
                  {album.artist}
                </Text>
              </View>
            <Button
                title="Buy"                        
            />
            </View>
            <Image
              source={{uri: album.image}}
              style={{
                height: 100,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            />
          </View>
        ));
    }
    
        
        
    render() {        
          return (
            <View style={styles.containerView}>
              <View style={styles.headerView}>
                <Text style={styles.headerStyle}>Albums</Text>
              </View>
              <ScrollView>{this.renderAlbums()}</ScrollView>
            </View>
          );
        
    }
}
        
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  headerStyle: {
    fontSize: 30,
    marginTop: 50,
    alignSelf: 'center',
  },
  headerView: {
    backgroundColor: 'pink',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
  },
  rowView: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'pink',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  rowItem: {
      flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent:'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'pink',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
