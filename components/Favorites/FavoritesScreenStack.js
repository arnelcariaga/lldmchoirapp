import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import Header from "../parts/Header";
import { searchFavoritesAction } from "../Redux/headerDucks";
import { useDispatch } from "react-redux";
import exitApp from "./../parts/exit-app";

const FavoritesScreenStackNavigator = createStackNavigator();

function FavoritesScreenStack() {
  exitApp();
  const dispatch = useDispatch();
  const placeholder = "Buscar favoritos...";
  const title = "Favoritos";
  const iSSearchable = true;
  const onChange = (val) => {
    dispatch(searchFavoritesAction(val));
  };

  return (
    <FavoritesScreenStackNavigator.Navigator>
      <FavoritesScreenStackNavigator.Screen
        name="LLDM Chior"
        component={Index}
        options={() => Header({ onChange, placeholder, title, iSSearchable })}
      />
    </FavoritesScreenStackNavigator.Navigator>
  );
}
export default FavoritesScreenStack;
