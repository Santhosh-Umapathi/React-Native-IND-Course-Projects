import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "native-base";
import { FontAwesome } from '@expo/vector-icons';

var itemArray = new Array(25).fill("empty");

export default class ScratchWin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        randomNumber: ""
      };
    }
  
  componentDidMount()
  {
    this.setState({randomNumber: this.generateRandomNumber()})
  };

  generateRandomNumber = () =>
  {
    let randomNumber = Math.floor(Math.random() * 25);
    this.setState({ randomNumber, isScratched: true});
    return randomNumber;
  };

  scratchItem = (itemNumber) => {
    if (this.state.randomNumber === itemNumber)
    {
       itemArray[itemNumber] = "lucky";
    }
    else
    {
       itemArray[itemNumber] = "unlucky";
    }
    this.forceUpdate();
  };

  itemIcon = (itemNumber) => {
    if (itemArray[itemNumber] === "lucky") {
      return "dollar";
    }
    else if (itemArray[itemNumber] === "unlucky") {
      return "frown-o";
    }
    else
      return "circle";
  };

  itemColor = (itemNumber) => { 
    if (itemArray[itemNumber] === "lucky") {
      return "green";
    } else if (itemArray[itemNumber] === "unlucky") {
      return "red";
    } else return "lightgray";
  };
  
  showAllItem = () => {
    itemArray.fill("unlucky");
    itemArray[this.state.randomNumber] = "lucky";
    this.forceUpdate();
  };

  resetGame = () => {
    this.setState({ randomNumber: this.generateRandomNumber(), scratchCount:[] }, () =>
    {
      itemArray.fill("empty");
      this.forceUpdate();
    })
   };

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.topText}>Scratch & Win</Text>
          </View>
          <View>
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(0);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(0)}
                  size={50}
                  color={this.itemColor(0)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(1);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(1)}
                  size={50}
                  color={this.itemColor(1)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(2);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(2)}
                  size={50}
                  color={this.itemColor(2)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(3);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(3)}
                  size={50}
                  color={this.itemColor(3)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(4);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(4)}
                  size={50}
                  color={this.itemColor(4)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(5);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(5)}
                  size={50}
                  color={this.itemColor(5)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(6);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(6)}
                  size={50}
                  color={this.itemColor(6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(7);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(7)}
                  size={50}
                  color={this.itemColor(7)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(8);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(8)}
                  size={50}
                  color={this.itemColor(8)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(9);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(9)}
                  size={50}
                  color={this.itemColor(9)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(10);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(10)}
                  size={50}
                  color={this.itemColor(10)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(11);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(11)}
                  size={50}
                  color={this.itemColor(11)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(12);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(12)}
                  size={50}
                  color={this.itemColor(12)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(13);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(13)}
                  size={50}
                  color={this.itemColor(13)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(14);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(14)}
                  size={50}
                  color={this.itemColor(14)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(15);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(15)}
                  size={50}
                  color={this.itemColor(15)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(16);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(16)}
                  size={50}
                  color={this.itemColor(16)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(17);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(17)}
                  size={50}
                  color={this.itemColor(17)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(18);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(18)}
                  size={50}
                  color={this.itemColor(18)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(19);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(19)}
                  size={50}
                  color={this.itemColor(19)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(20);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(20)}
                  size={50}
                  color={this.itemColor(20)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(21);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(21)}
                  size={50}
                  color={this.itemColor(21)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(22);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(22)}
                  size={50}
                  color={this.itemColor(22)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(23);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(23)}
                  size={50}
                  color={this.itemColor(23)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.scratchItem(24);
                }}
              >
                <FontAwesome
                  name={this.itemIcon(24)}
                  size={50}
                  color={this.itemColor(24)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            full
            success
            rounded
            style={{ marginTop: 20, marginHorizontal: 5 }}
            onPress={() => {
              this.showAllItem();
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              {" "}
              Show All Coupons{" "}
            </Text>
          </Button>
          <Button
            full
            danger
            rounded
            style={{ marginTop: 20, marginHorizontal: 5 }}
            onPress={() => {
              this.resetGame();
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}> Reset </Text>
          </Button>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  itemRow: {
    flexDirection: "row",
    margin: 5,
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: "center",
    minWidth: 70
  },
  topBar: {
    backgroundColor: "lightblue",
    height: 70,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    marginTop: 80,
    marginBottom:20,
  },
  topText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 40
  }
});
