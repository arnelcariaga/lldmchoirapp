import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import exitApp from "./../parts/exit-app";
import { searchHomeAction } from "../Redux/headerDucks";
import { useDispatch } from "react-redux";
import Header from "./../parts/Header/";

const HomeScreenStackNavigator = createStackNavigator();

function HomeScreenStack() {
  exitApp();
  const dispatch = useDispatch();

  const onChange = (val) => {
    dispatch(searchHomeAction(val));
  };
  const placeholder = "Buscar por nombre o categoría...";
  const title = "Alabanzas";
  const iSSearchable = true;

  return (
    <HomeScreenStackNavigator.Navigator>
      <HomeScreenStackNavigator.Screen
        name="LLDM Chior"
        component={Home}
        options={() => Header({ onChange, placeholder, title, iSSearchable })}
      />
    </HomeScreenStackNavigator.Navigator>
  );
}

export default HomeScreenStack;
