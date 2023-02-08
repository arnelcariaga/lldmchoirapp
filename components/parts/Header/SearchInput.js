import React from "react";
import { UIManager, Platform, LayoutAnimation } from "react-native";
import { SearchBar, Icon } from "@rneui/base";
import { useDispatch } from "react-redux";
import { toggleSearchAction } from "../../Redux/headerDucks";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SearchInput({ placeholder, onChange }) {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const onChangeText = (val) => {
    setValue(val);
    onChange(val);
  };

  LayoutAnimation.configureNext({
    duration: 125,
    create: { type: "easeInEaseOut", property: "scaleX" },
  });

  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoFocus={true}
      clearIcon={
        <Icon
          type="material"
          name="close"
          onPress={() => dispatch(toggleSearchAction(false))}
        />
      }
      containerStyle={{
        backgroundColor: undefined,
        borderTopWidth: 0,
        borderBottomWidth: 0.5,
      }}
      inputStyle={{
        backgroundColor: undefined,
      }}
      inputContainerStyle={{
        backgroundColor: undefined,
      }}
      searchIcon={
        <Icon
          type="material"
          name="arrow-back"
          onPress={() => dispatch(toggleSearchAction(false))}
        />
      }
    />
  );
}
