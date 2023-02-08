import {songsData} from './songsData';
import {categoriesData} from './categoriesData';
import {songsDataEn} from './songsData-en';
import {categoriesDataEn} from './categoriesData-en';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const dataInicial = {
  songs: [],
  categories: [],
  favorites: [],
  songSelected: [],
  fullScreen: false,
};

// types
const GET_SONGS_SUCCESS = 'GET_SONGS_SUCCESS';
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
const GET_SONG_SELECTED_SUCCESS = 'GET_SONG_SELECTED_SUCCESS';
const SET_SONG_FAVORITE_SUCCESS = 'SET_SONG_FAVORITE_SUCCESS';
const SET_SONG_FULLSCREEN_SUCCESS = 'SET_SONG_FULLSCREEN_SUCCESS';

// reducer
export default function filesReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_SONGS_SUCCESS:
      return {...state, songs: action.payload};
    case GET_CATEGORIES_SUCCESS:
      return {...state, categories: action.payload};
    case GET_SONG_SELECTED_SUCCESS:
      return {...state, songSelected: action.payload};
    case SET_SONG_FAVORITE_SUCCESS:
      return {...state, favorites: action.payload};
    case SET_SONG_FULLSCREEN_SUCCESS:
      return {...state, fullScreen: action.payload};
    default:
      return state;
  }
}

// actions
export const getSongsAction = () => async dispatch => {
  try {
    const storedLang = await AsyncStorage.getItem('locale');

    if (storedLang !== null) {
      if (storedLang === 'es') {
        dispatch({
          type: GET_SONGS_SUCCESS,
          payload: songsData,
        });
      } else {
        dispatch({
          type: GET_SONGS_SUCCESS,
          payload: songsDataEn,
        });
      }
    } else {
      dispatch({
        type: GET_SONGS_SUCCESS,
        payload: songsData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesAction = () => async dispatch => {
  try {
    const storedLang = await AsyncStorage.getItem('locale');
    if (storedLang !== null) {
      if (storedLang === 'es') {
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: categoriesData,
        });
      } else {
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: categoriesDataEn,
        });
      }
    } else {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: categoriesData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSongSelectedAction = data => async dispatch => {
  try {
    dispatch({
      type: GET_SONG_SELECTED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFavoriteAction = data => async dispatch => {
  try {
    const song = data;

    const favs = await AsyncStorage.getItem('favorites_songs');
    const arr = [];
    arr.push(song);

    if (favs !== null) {
      let favorites = JSON.parse(favs);
      let index = favorites.findIndex(
        songs => songs.song_id === song[0].song_id,
      );

      if (index !== -1) {
        favorites.splice(index, 1);

        await AsyncStorage.setItem(
          'favorites_songs',
          JSON.stringify(favorites),
        );
      } else {
        favorites.push(song[0]);
        await AsyncStorage.setItem(
          'favorites_songs',
          JSON.stringify(favorites),
        );
      }

      dispatch({
        type: SET_SONG_FAVORITE_SUCCESS,
        payload: favorites,
      });
    } else {
      await AsyncStorage.setItem('favorites_songs', JSON.stringify(arr[0]));
      dispatch({
        type: SET_SONG_FAVORITE_SUCCESS,
        payload: arr[0],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteAction = () => async dispatch => {
  try {
    const favs = await AsyncStorage.getItem('favorites_songs');

    if (favs !== null) {
      const favsParse = JSON.parse(favs);

      dispatch({
        type: SET_SONG_FAVORITE_SUCCESS,
        payload: favsParse,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setSongFullScreenAction = val => dispatch => {
  try {
    dispatch({
      type: SET_SONG_FULLSCREEN_SUCCESS,
      payload: val,
    });
  } catch (error) {
    console.log(error);
  }
};
