import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from "react-native";

const CategoryGridTile = ({ onSelect, title, color }) => {
  let CustomTouchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.gridItem}>
      <CustomTouchable style={{ flex: 1 }} onPress={onSelect}>
        <View style={{ ...styles.contianer, ...{ backgroundColor: color } }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </CustomTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version > 21 ? "hidden" : "visible",
    elevation: 3
  },
  contianer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "right"
  }
});

export default CategoryGridTile;
