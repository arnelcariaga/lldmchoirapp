import React from "react";
import { Icon } from "@rneui/base";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function LeftElements() {
  const navigation = useNavigation();

  return (
    <Icon
      type="material"
      name="menu"
      color="#fff"
      containerStyle={{
        marginLeft: 10,
      }}
      size={25}
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
    />
  );
}
