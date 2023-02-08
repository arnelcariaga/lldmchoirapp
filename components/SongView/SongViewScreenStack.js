import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SongView from './SongView';
import {
  Text,
  View,
  PermissionsAndroid,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {Icon} from '@rneui/base';
import {useTheme} from '@react-navigation/native';
import {
  addFavoriteAction,
  getSongSelectedAction,
  setSongFullScreenAction,
} from './../Redux/songsDucks';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RightElements from '../parts/Header/RightElements';

const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

const HomeScreenStackNavigator = createStackNavigator();

function SongViewScreenStack(props) {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(props.route.params.isFav);
  const haveVoice = props.route.params.haveVoice;
  const songSelected = useSelector(store => store.songsData.songSelected);
  const fullScreen = useSelector(store => store.songsData.fullScreen);
  const songSelectedToJSON = JSON.parse(songSelected);
  const {dark, colors} = useTheme();
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    dispatch(getSongSelectedAction);
  }, [dispatch]);

  const saveFav = async () => {
    setIsFav(!isFav);
    dispatch(addFavoriteAction(songSelectedToJSON));
  };

  const requestToPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'LLDM Choir',
          message:
            'Necesitamos acceder al almacenamiento para guardar la alabanza',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async () => {
    const requested = await requestToPermissions();
    if (requested) {
      download();
    } else {
      alert('Permiso no concedido');
    }
  };

  const download = () => {
    let filePath =
      ReactNativeBlobUtil.fs.dirs.DownloadDir +
      '/' +
      songSelectedToJSON[0].song_name +
      '_lldmchoirapp_' +
      Math.random().toString(36).substr(2, 9) +
      '.' +
      getFileExtention(songSelectedToJSON[0].pdf_file);

    ReactNativeBlobUtil.fs
      .cp(
        ReactNativeBlobUtil.fs.asset(songSelectedToJSON[0].pdf_file),
        filePath,
      )

      .then(() => {
        Alert.alert(
          'Coro LLDM',
          'Se ha descargado la alabanza, busca en la carpeta DESCARGAS o toca en VER.',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancelar Pressed'),
            },
            {
              text: 'Ver',
              onPress: () => lookFile(filePath),
            },
          ],
        );
      })
      .catch(e => {
        alert('Hubo error al descargar la alabanza');
      });
  };

  const lookFile = path => {
    ReactNativeBlobUtil.android.actionViewIntent(path, 'application/pdf');
  };

  return (
    <HomeScreenStackNavigator.Navigator>
      <HomeScreenStackNavigator.Screen
        name="LLDM Chior"
        children={() => <SongView propHaveVoice={haveVoice} />}
        options={{
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name={fullScreen ? 'fullscreen-exit' : 'fullscreen'}
                type="material"
                underlayColor="#000"
                color="#fff"
                containerStyle={{
                  marginRight: 10,
                }}
                onPress={() => dispatch(setSongFullScreenAction(!fullScreen))}
              />
              <Icon
                name={isFav ? 'star' : 'star-outline'}
                type="material"
                underlayColor="#000"
                color={isFav ? '#efa203' : '#fff'}
                containerStyle={{
                  marginRight: 10,
                }}
                onPress={saveFav}
              />
              <Icon
                name="file-download"
                type="material"
                underlayColor="#000"
                color="#fff"
                containerStyle={{
                  marginRight: 5,
                }}
                onPress={handleDownload}
              />
              <RightElements iSSearchable={false} />
            </View>
          ),
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: dark ? colors.card : '#1c2a67',
          },
          headerTitle: () => (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 19,
                color: '#fff',
              }}
              numberOfLines={1}>
              {props.route.params.song_name}
            </Text>
          ),
          headerTitleContainerStyle: {
            width: windowWidth / 2.2,
            marginLeft: 0,
            paddingRight: 10,
          },
        }}
      />
    </HomeScreenStackNavigator.Navigator>
  );
}
export default SongViewScreenStack;
