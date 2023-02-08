import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import Video from "react-native-video";
import Controls from "./Controls";
import Pdf from "react-native-pdf";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux";
import { Text, Badge } from "@rneui/base";
import Loading from "../parts/loading";

function SongView({ propHaveVoice }) {
  const haveVoice = propHaveVoice;
  const songSelected = useSelector((store) => store.songsData.songSelected);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [isNetConnected, setIsNetConnected] = useState();
  const audioRef = useRef();
  const dataToJSON = JSON.parse(songSelected)[0];
  const source = {
    uri: "bundle-assets://" + dataToJSON.pdf_file,
    cache: false,
  };

  const [pdfTotalPage, setPdfTotalPage] = useState();
  const PDFRef = useRef();
  const [pDFCurrentPage, setPDFCurrentPage] = useState();
  const fullScreen = useSelector((store) => store.songsData.fullScreen);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsNetConnected(state.isInternetReachable);
    });
    unsubscribe();
  }, []);

  const durationFunc = (data) => {
    setTotalLength(Math.floor(data.duration));
  };

  const timeFunc = (data) => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const onForward = () => {
    audioRef.current && audioRef.current.seek(0);
    setTimeout(() => {
      setCurrentPosition(0);
      setTotalLength(1);
      setPaused(false);
      setCurrentIndex(
        currentIndex + 1 > dataToJSON.voices.length - 1 ? 0 : currentIndex + 1
      );
    }, 0);
  };

  const onBack = () => {
    if (currentPosition < 10 && currentIndex > 0) {
      audioRef.current && audioRef.current.seek(0);
      setTimeout(() => {
        setCurrentPosition(0);
        setTotalLength(1);
        setPaused(false);
        setCurrentIndex(
          currentIndex === 0 ? dataToJSON.voices.length - 1 : currentIndex - 1
        );
      }, 0);
    } else {
      audioRef.current && audioRef.current.seek(0);
      setCurrentPosition(0);
    }
  };

  const seek = (time) => {
    time = Math.round(time);
    audioRef.current && audioRef.current.seek(time);
    setCurrentPosition(time);
    setPaused(false);
  };

  const onStop = () => {
    audioRef.current && audioRef.current.seek(0);
    setTimeout(() => {
      setCurrentPosition(0);
      setPaused(true);
    }, 0);
  };

  const onEnd = () => {
    audioRef.current && audioRef.current.seek(0);
    setCurrentPosition(0);
    setPaused(true);
  };

  const onPressPlay = async () => {
    if (isNetConnected) {
      setPaused(false);
    } else {
      alert("No estas conectado a internet para reproducir los audios.");
    }
  };

  const totalPDFPages = () => {
    let arr = [];
    for (let index = 1; index < pdfTotalPage + 1; index++) {
      arr.push(index);
    }
    return arr.map((res) => {
      return (
        <Badge
          value={res}
          key={res.toString()}
          badgeStyle={{
            backgroundColor: pDFCurrentPage === res ? "#0059b8" : "gray",
            margin: 2.5,
          }}
          onPress={() => PDFRef.current.setPage(res)}
        />
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Pdf
        source={source}
        ref={PDFRef}
        fitPolicy={0}
        onError={(error) => {
          console.log(error);
        }}
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        onLoadComplete={(numberOfPage) => setPdfTotalPage(numberOfPage)}
        onPageChanged={(page) => {
          setPDFCurrentPage(page);
        }}
        renderActivityIndicator={Loading}
      />
      {isNetConnected && haveVoice ? (
        <Video
          ref={audioRef}
          source={
            typeof dataToJSON.voices[currentIndex].voice_url === "string"
              ? { uri: dataToJSON.voices[currentIndex].voice_url }
              : dataToJSON.voices[currentIndex].voice_url
          }
          paused={paused}
          resizeMode="cover"
          repeat={repeatOn}
          onLoad={durationFunc}
          onProgress={timeFunc}
          onEnd={onEnd}
          onError={(e) => console.log(e)}
          style={{
            height: 0,
            width: 0,
          }}
        />
      ) : null}

      <View
        style={{
          flexDirection: "row",
          margin: 2,
          marginHorizontal: 5,
        }}
      >
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              color: "gray",
            }}
          >
            Ir a p&aacute;gina:{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "75%",
          }}
        >
          {totalPDFPages()}
        </View>
      </View>

      {!fullScreen && (
        <>
          {haveVoice ? (
            <Controls
              onPressRepeat={() => setRepeatOn(!repeatOn)}
              repeatOn={repeatOn}
              onPressPlay={onPressPlay}
              onPressPause={() => setPaused(true)}
              onBack={onBack}
              onForward={onForward}
              paused={paused}
              totalLength={totalLength}
              currentPosition={currentPosition}
              onSlidingStart={() => setPaused(true)}
              onSeek={seek}
              onStop={onStop}
              currentIndex={currentIndex}
              dataToJSON={dataToJSON}
              setCurrentIndexControl={(index) => setCurrentIndex(index)}
              isNetConnected={isNetConnected}
            />
          ) : null}
        </>
      )}
    </View>
  );
}

export default React.memo(SongView);
