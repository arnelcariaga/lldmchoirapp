import React, { useCallback } from "react";
import { Alert, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchAction } from "../Redux/headerDucks";

const useExitOnBack = () => {
  const dispatch = useDispatch();
  const toggleSearch = useSelector((store) => store.headerData.toggleSearch);

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (toggleSearch) {
          dispatch(toggleSearchAction(false));
          return true;
        } else {
          Alert.alert(
            "LLDM Choir",
            "¿ Salir de la aplicación ?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Aceptar", onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, [toggleSearch, dispatch])
  );
};

export default useExitOnBack;
