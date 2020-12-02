import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";
const { primaryColor, accentColor } = Colors;

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : primaryColor
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        )
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites",
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        )
    }
  }
};
0;

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: accentColor,
          labelStyle: {
            fontFamily: "open-sans-bold"
          }
        }
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
