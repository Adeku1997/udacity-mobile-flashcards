import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Platform, StatusBar, View } from "react-native";
import Constants from "expo-constants";
import { createStackNavigator,HeaderBackButton } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation-tabs";
import {
  createAppContainer,
} from "react-navigation";
import { clearLocalNotification, setLocalNotification } from "./utils/helpers";
import { Icon } from "react-native-elements";

import reducer from "./reducers";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";

const store = createStore(reducer);

const tabNavigatorSettings = {
  routeConfigs: {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: (
          <Icon
            name="cards-outline"
            type="material-community"
            iconStyle={{ color: "white" }}
          />
        ),
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: (
          <Icon name="add" type="material" iconStyle={{ color: "white" }} />
        ),
      },
    },
  },
  navigationOptions: {
    navigationOptions: { header: null },
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "white",
      inactiveBackgroundColor: "gray",
      activeBackgroundColor: "dimgray",
      style: {
        backgroundColor: "dimgray",
      },
    },
  },
};

const stackNavigatorSettings = {
  navigationOptions: {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "dimgray",
    },
  },
};

const MainNavigator = createStackNavigator({
  Home: {
    screen:
      Platform.OS === "ios"
        ? createBottomTabNavigator(
            tabNavigatorSettings.routeConfigs,
            tabNavigatorSettings.navigationOptions
          )
        : createMaterialTopTabNavigator(
            tabNavigatorSettings.routeConfigs,
            tabNavigatorSettings.navigationOptions
          ),
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation, screenProps }) => ({
      ...stackNavigatorSettings.navigationOptions,
      title: "Deck",
      headerLeft: (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate("Decks");
          }}
          tintColor="white"
        />
      ),
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      ...stackNavigatorSettings.navigationOptions,
      title: "New Card",
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      ...stackNavigatorSettings.navigationOptions,
      title: "Quiz",
    },
  },
});

const AppContainer = createAppContainer(MainNavigator);

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  async componentDidMount() {
    // await clearLocalNotification();
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar
            backgroundColor="dimgray"
            barStyle="light-content"
          />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
