import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from "./src/screens/ChatScreen";


const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Home",
      headerTintColor: "white", //Header button colors
      headerStyle: {
        backgroundColor: "#74B9FF" // header bg color
      },
      headerTitleStyle: {
        color: "black" // header font color
      }
    }
  }
);
export default createAppContainer(MainNavigator);