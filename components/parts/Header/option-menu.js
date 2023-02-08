import React, { useState, useRef } from "react";
import {
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle,
  Pressable,
} from "react-native";

const OptionMenu = (props) => {
  const inputRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = (index) => {
    let options = props.options;
    for (var i = 0; i < options.length; i++) {
      if (index === i) {
        if (index === options.length) {
          setOpen(!open);
        } else {
          if (props.actions[i] !== null) {
            props.actions[i]();
          }
        }
      }
    }
  };

  const handlePress = () => {
    let options = props.options;
    if (Platform.OS === "ios") {
      let destructiveIndex = -1;
      if (
        Number.isInteger(props.destructiveIndex) &&
        props.destructiveIndex >= 0
      ) {
        destructiveIndex = props.destructiveIndex;
      }
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: options,
          destructiveButtonIndex: destructiveIndex,
          cancelButtonIndex: options.length - 1,
        },
        (buttonIndex) => {
          handleClick(buttonIndex);
        }
      );
    } else if (Platform.OS === "android") {
      UIManager.showPopupMenu(
        findNodeHandle(inputRef.current),
        options,
        () => console.log("something went wrong with the popup menu"),
        (e, i) => {
          handleClick(i);
        }
      );
    }
  };

  return (
    <Pressable ref={inputRef} onPress={handlePress}>
      {props.customButton}
    </Pressable>
  );
};

export default OptionMenu;
