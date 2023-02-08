import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
function CustomStatusBar() {
  const fullScreen = useSelector((store) => store.songsData.fullScreen);
  return (
    <StatusBar
      hidden={fullScreen}
      barStyle="light-content"
      backgroundColor="#1c2a67"
    />
  );
}
export default CustomStatusBar;
