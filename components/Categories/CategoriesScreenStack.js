import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "./index";
import Header from "../parts/Header";
import { searchCategoriesAction } from "../Redux/headerDucks";
import { useDispatch } from "react-redux";
import exitApp from "./../parts/exit-app";

const CategoriesScreenStackNavigator = createStackNavigator();

function CategoriesScreenStack() {
  exitApp();
  const dispatch = useDispatch();
  const placeholder = "Buscar por categoría...";
  const title = "Categorías";
  const iSSearchable = true;
  const onChange = (val) => {
    dispatch(searchCategoriesAction(val));
  };

  return (
    <CategoriesScreenStackNavigator.Navigator>
      <CategoriesScreenStackNavigator.Screen
        name="LLDM Chior"
        component={Categories}
        options={() =>
          Header({
            onChange,
            placeholder,
            undefined,
            iSSearchable,
            title,
          })
        }
      />
    </CategoriesScreenStackNavigator.Navigator>
  );
}
export default CategoriesScreenStack;
