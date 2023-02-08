import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {getFavoriteAction} from './../Redux/songsDucks';
import {useDispatch, useSelector} from 'react-redux';
import SongList from './../Home/SongList';
import {Text} from '@rneui/base';
import {useTranslation} from 'react-i18next';

export default function Favorites({navigation}) {
  const dispatch = useDispatch();
  const favorites = useSelector(store => store.songsData.favorites);
  const [data, setData] = React.useState([]);
  const searchFavorites = useSelector(
    store => store.headerData.searchFavorites,
  );
  const {t} = useTranslation();

  React.useEffect(() => {
    dispatch(getFavoriteAction());
  }, [dispatch]);

  React.useEffect(() => {
    setData(favorites);
  }, [favorites]);

  const filteredItems = data.filter(item => {
    let categories = item.categories.some(
      c =>
        c.category_name &&
        c.category_name.toLowerCase().match(searchFavorites.toLowerCase()),
    );
    return (
      (item.song_name &&
        item.song_name.toLowerCase().match(searchFavorites.toLowerCase())) ||
      categories
    );
  });

  const renderItem = ({item}) => {
    return <SongList s={item} navigation={navigation} favorites={favorites} />;
  };

  const keyExtractor = item => item.song_id.toString();

  return (
    <>
      {data.length === 0 ? (
        <Text style={styles.noFavoriteSong}>{t('youHaveNoFavPraises')}</Text>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  noFavoriteSong: {
    margin: 10,
  },
});
