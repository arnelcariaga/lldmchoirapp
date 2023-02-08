import React, { useState, useMemo } from "react";
import { ListItem, Text } from "@rneui/base";
import { UIManager, Platform, LayoutAnimation, FlatList } from "react-native";
import { useSelector } from "react-redux";
import SongList from "./../Home/SongList";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CategoryAccordion({ title, songs, navigation }) {
  const [expand, setExpand] = useState(false);
  const favorites = useSelector((store) => store.songsData.favorites);

  const expandFunc = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpand(!expand);
  };

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        <SongList s={item} navigation={navigation} favorites={favorites} />,
    [navigation, favorites]
  );
  const keyExtractor = (item) => item.song_id.toString();

  return (
    <>
      <ListItem onPress={expandFunc} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {title} <Text>({songs.length})</Text>
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          type="font-awesome-5"
          name={expand ? "chevron-down" : "chevron-up"}
        />
      </ListItem>

      {expand && (
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </>
  );
}
