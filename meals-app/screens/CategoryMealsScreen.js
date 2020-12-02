import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealScreen = ({ navigation }) => {
  const categoryId = navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (displayedMeals.length > 0) {
    return <MealList listData={displayedMeals} navigation={navigation} />;
  } else {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found. Maybe check filters?</DefaultText>
      </View>
    );
  }
};

CategoryMealScreen.navigationOptions = ({ navigation }) => {
  const categoryId = navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(
    category => category.id === categoryId
  );

  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryMealScreen;
