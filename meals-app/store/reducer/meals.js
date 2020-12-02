import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }

    case SET_FILTERS:
      const { filters } = action;
      const { glutenFree, lactoseFree, vegetarian, vegan } = filters;

      const filteredMeals = state.meals.filter(meal => {
        const { isGlutenFree, isLactoseFree, isVegetarian, isVegan } = meal;

        if (glutenFree && !isGlutenFree) {
          return false;
        }
        if (lactoseFree && !isLactoseFree) {
          return false;
        }
        if (vegetarian && !isVegetarian) {
          return false;
        }
        if (vegan && !isVegan) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals: filteredMeals
      };

    default:
      return state;
  }
};

export default mealsReducer;
