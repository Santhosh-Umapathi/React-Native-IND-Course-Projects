//import screens
import HomeScreen from "./screens/HomeScreen";
import AddNewContactScreen from "./screens/AddNewContactScreen";
import EditContactScreen from "./screens/EditContactScreen";
import ViewContactScreen from "./screens/ViewContactScreen";

//import react navigation
import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home:  HomeScreen,
    Add:  AddNewContactScreen,
    View:  ViewContactScreen,
    Edit:  EditContactScreen
  },
  {
    defaultNavigationOptions:
    {
      headerTintColor: "#fff",
      headerStyle:
      {
        backgroundColor: "lightblue"
      },
      headerTitleStyle:
      {
        color: "black"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
