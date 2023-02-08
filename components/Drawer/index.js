import React from 'react';
import {Icon, Text} from '@rneui/base';
import {View, Image, ScrollView} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeScreenStack from './../Home/HomeScreenStack';
import CategoriesScreenStack from './../Categories/CategoriesScreenStack';
import FavoritesScreenStack from './../Favorites/FavoritesScreenStack';
import ChoirRules from '../ChoirRules/ChoirRulesScreenStack';
import {useTranslation} from 'react-i18next';

function CustomDrawerContent(props) {
  const {t} = useTranslation();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: '#595a5a',
          }}>
          <Image
            source={require('./../../assets/ic_launcher.png')}
            style={{
              flex: 0,
              width: '15%',
              height: 80,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text>{t('headerTitle')} Pro</Text>
        </View>

        <DrawerItemList {...props} />
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 25,
          marginBottom: 15,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#595a5a',
          }}>
          &copy; {t('headerTitle')} {t('versionLabel')} 1.23
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

function drawerOptions(iconName, iconType) {
  return {
    drawerIcon: ({color, size}) => (
      <Icon name={iconName} size={size} type={iconType} color={color} />
    ),
    headerShown: false,
  };
}

const AppDrawerNavigator = createDrawerNavigator();

function Drawer() {
  const {t} = useTranslation();

  return (
    <AppDrawerNavigator.Navigator
      drawerType="back"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <AppDrawerNavigator.Screen
        name={t('praises')}
        component={HomeScreenStack}
        options={drawerOptions('queue-music', 'material')}
      />
      <AppDrawerNavigator.Screen
        name={t('categories')}
        component={CategoriesScreenStack}
        options={drawerOptions('library-music', 'material')}
      />
      <AppDrawerNavigator.Screen
        name={t('favorites')}
        component={FavoritesScreenStack}
        options={drawerOptions('star', 'material')}
      />
      <AppDrawerNavigator.Screen
        name={t('regulation')}
        component={ChoirRules}
        options={drawerOptions('receipt-long', 'material')}
      />
    </AppDrawerNavigator.Navigator>
  );
}
export default Drawer;
