import React from "react";
import { ListItem, Icon, Text } from "@rneui/base";
import capitalizeLetterOfEachWord from "./../parts/capitalizeFirstLetterOfEachWord";
import { useDispatch } from "react-redux";
import { getSongSelectedAction } from "./../Redux/songsDucks";
import { StyleSheet, TouchableOpacity } from "react-native";

function SongList(props) {
  const { s, navigation, favorites } = props;
  const dispatch = useDispatch();

  const isFav = () => {
    if (favorites.filter((item) => item.song_id === s.song_id).length > 0) {
      return true;
    }
    return false;
  };

  const goToPage = () => {
    navigation.navigate("SongView", {
      song_name: capitalizeLetterOfEachWord(s.song_name),
      haveVoice: s.have_voices,
      isFav: isFav(),
    });
    dispatch(getSongSelectedAction(JSON.stringify([s])));
  };

  return (
    <ListItem
      key={s.song_id.toString()}
      bottomDivider
      Component={TouchableOpacity}
      onPress={goToPage}
    >
      <Icon type="material" name="music-note" color="#1c2a67" />
      <ListItem.Content
        style={{
          justifyContent: "flex-start",
        }}
      >
        <ListItem.Title>
          {capitalizeLetterOfEachWord(s.song_name)}
        </ListItem.Title>
        {s.categories.map((res) => (
          <ListItem.Subtitle
            key={res.category_id.toString()}
            style={{
              color: "gray",
            }}
          >
            {res.category_name}
          </ListItem.Subtitle>
        ))}
      </ListItem.Content>
      <>
        {isFav() ? (
          <Icon
            type="material"
            containerStyle={styles.favoriteIcon}
            name="star"
            color="#efa203"
            size={15}
          />
        ) : null}
        <Text style={{ marginRight: 5, fontSize: 11 }}>
          P&aacute;g.: {s.song_pages_counter}
        </Text>
        {s.voices.length === 0 ? null : (
          <Icon
            type="material"
            name="mic"
            containerStyle={styles.voiceIcon}
            color="#1c2a67"
            size={15}
          />
        )}
        <Icon type="material" name="chevron-right" size={17} />
      </>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  favoriteIcon: {
    marginRight: 10,
  },
  voiceIcon: {
    marginRight: 5,
  },
});
export default React.memo(SongList);
