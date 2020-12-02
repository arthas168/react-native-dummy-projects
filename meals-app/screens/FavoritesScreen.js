import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

import HeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";

const FavoritesScreen = ({ navigation }) => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  } else {
    return <MealList listData={favMeals} navigation={navigation} />;
  }
};

FavoritesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FavoritesScreen;
