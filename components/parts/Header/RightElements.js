import React from 'react';
import {
  Alert,
  Linking,
  BackHandler,
  Share,
  View,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import {Icon, Button, ListItem} from '@rneui/base';
import OptionsMenu from './option-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';

const languagesList = ['es', 'en'];

function RightElements({openSearch, iSSearchable}) {
  const {width, height} = Dimensions.get('window');
  const [modalVisible, setModalVisible] = React.useState(false);
  const {t, i18n} = useTranslation();

  const requestSong = () => {
    Alert.alert(
      t('headerTitle'),
      t('requestPraiseDescription'),
      [
        {
          text: t('cancelBtnLabel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('requestBtnLabel'),
          onPress: async () =>
            await Linking.openURL('mailto:arnelcariaga@hotmail.com'),
        },
      ],
      {cancelable: false},
    );
  };

  const report = () => {
    Alert.alert(
      t('headerTitle'),
      t('reportOrSuggestionsDescription'),
      [
        {
          text: t('cancelBtnLabel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('reportOrSuggestionsBtnLabel'),
          onPress: async () =>
            await Linking.openURL('mailto:arnelcariaga@hotmail.com'),
        },
      ],
      {cancelable: false},
    );
  };

  const aboutFunc = () => {
    Alert.alert(
      t('headerTitle'),
      t('aboutAppDescription'),
      [
        {
          text: t('acceptBtnLabel'),
          onPress: () => console.log('Aceptar Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  const exitApp = () => {
    Alert.alert(
      t('headerTitle'),
      t('quitAppQuestion'),
      [
        {
          text: t('cancelBtnLabel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('acceptBtnLabel'), onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

  const rateApp = async () => {
    await Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.lldmchoirapp',
    );
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: t('shareAppDescription'),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const langPickerFunc = () => {
    let icon,
      langName = i18n.language;
    if (langName === 'es') {
      icon = require('./../../../assets/es.png');
    } else if (langName === 'en') {
      icon = require('./../../../assets/us.png');
    }
    return (
      <Image
        source={icon}
        style={{
          width: width * 0.07,
          height: height * 0.02,
        }}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Button
        icon={langPickerFunc}
        onPress={() => setModalVisible(!modalVisible)}
        type="clear"
        containerStyle={{
          marginHorizontal: 6,
        }}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {languagesList.map((item, i) => {
          let icon, langName;
          if (item === 'es') {
            icon = require('./../../../assets/es.png');
          } else if (item === 'en') {
            icon = require('./../../../assets/us.png');
          }

          if (item === 'es') {
            langName = 'Español';
          } else if (item === 'en') {
            langName = 'English';
          }

          return (
            <ListItem
              key={i}
              bottomDivider
              onPress={async () => {
                await AsyncStorage.setItem('locale', item);
                setModalVisible(!modalVisible);
                RNRestart.Restart();
              }}>
              <Image
                source={icon}
                style={{
                  width: width * 0.07,
                  height: height * 0.02,
                }}
                resizeMode="cover"
              />
              <ListItem.Content>
                <ListItem.Title>{langName}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </Modal>

      {iSSearchable && (
        <Icon
          type="material"
          name="search"
          color="#fff"
          containerStyle={{
            marginRight: 10,
          }}
          onPress={openSearch}
        />
      )}
      <OptionsMenu
        customButton={
          <Icon type="material" name="more-vert" color="#fff" size={25} />
        }
        destructiveIndex={1}
        options={[
          t('shareApp'),
          t('rateApp'),
          t('requestPraise'),
          t('reportOrSuggestions'),
          t('aboutApp'),
          t('quit'),
        ]}
        actions={[shareApp, rateApp, requestSong, report, aboutFunc, exitApp]}
      />
    </View>
  );
}

export default RightElements;
