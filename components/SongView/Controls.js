import React, { useRef, useState } from "react";
import { View, Animated, ScrollView, useWindowDimensions } from "react-native";
import { Text, Icon, ListItem } from "@rneui/base";
import Slider from "@react-native-community/slider";

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

const Controls = ({
  paused,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressRepeat,
  totalLength,
  currentPosition,
  onSeek,
  onStop,
  dataToJSON,
  currentIndex,
  setCurrentIndexControl,
  isNetConnected,
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(totalLength - currentPosition);
  const [playListOpen, setPlayListOpen] = useState(false);
  const windowHeight = useWindowDimensions().height;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openPlayList = () => {
    setPlayListOpen(!playListOpen);
    if (playListOpen) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: windowHeight / 3.54,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const playFromPlayList = (index) => {
    if (isNetConnected) {
      setCurrentIndexControl(index);
    } else {
      alert("No estas conectado a internet para reproducir los audios.");
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fafafa",
        borderTopWidth: 0.5,
        borderTopColor: "#0059b8",
      }}
    >
      <Animated.View
        style={{
          borderTopWidth: 0.5,
          width: "100%",
          height: fadeAnim,
        }}
      >
        <ScrollView>
          {dataToJSON.voices.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              disabled={
                l.voice_id === dataToJSON.voices[currentIndex].voice_id
                  ? true
                  : false
              }
              onPress={() => playFromPlayList(i)}
            >
              <Icon name="playcircleo" type="ant-design" color="#0059b8" />
              <ListItem.Content>
                <ListItem.Title>{l.voice_name}</ListItem.Title>
                {paused ? null : l.voice_id ===
                  dataToJSON.voices[currentIndex].voice_id ? (
                  <ListItem.Subtitle>Reproduciendo...</ListItem.Subtitle>
                ) : null}
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </Animated.View>

      <View>
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            borderTopWidth: 0.5,
            borderTopColor: "#0059b8",
          }}
        >
          {dataToJSON.voices[currentIndex].voice_name}
        </Text>
      </View>
      <View
        style={{
          marginLeft: "15%",
          marginRight: "15%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
          }}
        >
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <Slider
          value={currentPosition}
          maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
          thumbTintColor="#0059b8"
          minimumTrackTintColor="#0059b8"
          maximumTrackTintColor="gray"
          onSlidingComplete={onSeek}
          style={{
            width: "100%",
          }}
          trackStyle={{
            height: 2,
            borderRadius: 1,
          }}
          thumbStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        />
        <Text
          style={{
            color: "gray",
          }}
        >
          {totalLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <View
        style={{
          paddingRight: "6%",
          paddingLeft: "6%",
          paddingBottom: "2%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Icon
            name="repeat"
            type="feather"
            color={repeatOn ? "gray" : "#0059b8"}
            onPress={onPressRepeat}
          />
        </View>

        <View>
          <Icon
            name="controller-fast-backward"
            type="entypo"
            color="#0059b8"
            onPress={onBack}
          />
        </View>

        <View>
          <Icon
            name="controller-stop"
            type="entypo"
            color={!paused ? "gray" : "#0059b8"}
            onPress={onStop}
          />
        </View>

        <View>
          {!paused ? (
            <Icon
              name="pausecircleo"
              type="ant-design"
              color="#0059b8"
              onPress={onPressPause}
            />
          ) : (
            <Icon
              name="playcircleo"
              type="ant-design"
              color="#0059b8"
              onPress={onPressPlay}
            />
          )}
        </View>

        <View>
          <Icon
            name="controller-fast-forward"
            type="entypo"
            color="#0059b8"
            onPress={onForward}
          />
        </View>

        <View>
          <Icon
            name="folder-music"
            type="entypo"
            color="#0059b8"
            onPress={openPlayList}
          />
        </View>
      </View>
    </View>
  );
};

export default Controls;
