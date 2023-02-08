import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Drawer from "./../Drawer/";
import SongView from "./../SongView/SongViewScreenStack";

const screensStackNavigator = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <screensStackNavigator.Navigator>
        <>
          <screensStackNavigator.Screen
            name="LLDM Choir"
            component={Drawer}
            options={() => ({
              headerShown: false,
            })}
          />

          <screensStackNavigator.Screen
            name="SongView"
            component={SongView}
            options={() => ({
              headerShown: false,
            })}
          />
        </>
      </screensStackNavigator.Navigator>
    </NavigationContainer>
  );
}
