import React from "react";
import { FlatList } from "react-native";
import { getSongsAction, getFavoriteAction } from "./../Redux/songsDucks";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from "@rneui/base";
import Loading from "./../parts/loading";
import SongList from "./SongList";

function Home({ navigation }) {
  const dispatch = useDispatch();
  const songs = useSelector((store) => store.songsData.songs);
  const search = useSelector((store) => store.headerData.searchHome);
  const favorites = useSelector((store) => store.songsData.favorites);
  const songsListRef = React.useRef();
  const [contentVerticalOffset, setContentVerticalOffset] = React.useState(0);

  React.useEffect(() => {
    dispatch(getSongsAction());
    dispatch(getFavoriteAction());
  }, [dispatch]);

  const filteredItems = songs.filter((item) => {
    let categories = item.categories.some(
      (c) =>
        c.category_name &&
        c.category_name.toLowerCase().match(search.toLowerCase())
    );
    return (
      (item.song_name &&
        item.song_name.toLowerCase().match(search.toLowerCase())) ||
      categories
    );
  });

  const renderItem = ({ item }) => {
    return <SongList s={item} navigation={navigation} favorites={favorites} />;
  };

  const keyExtractor = (item) => item.song_id.toString();

  const goUp = () => {
    songsListRef.current.scrollToIndex({ index: 0 });
  };

  return (
    <>
      {songs.length === 0 ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ref={songsListRef}
            onScroll={(event) => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
          />
          <FAB
            visible={contentVerticalOffset > 300}
            onPress={goUp}
            placement="right"
            icon={{ name: "arrow-upward", color: "white" }}
            color="#1c2a67"
          />
        </>
      )}
    </>
  );
}

export default React.memo(Home);
