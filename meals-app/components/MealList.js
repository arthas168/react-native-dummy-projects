import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import MealItem from "./MealItem";

const MealList = ({ listData, navigation }) => {
  const renderMealItem = itemData => {
    const {
      title,
      duration,
      affordability,
      complexity,
      imageUrl,
      id
    } = itemData.item;
    return (
      <MealItem
        title={title}
        onSelectMeal={() => {}}
        complexity={complexity}
        affordability={affordability}
        duration={duration}
        image={imageUrl}
        onSelectMeal={() => {
          navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: id
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MealList;
