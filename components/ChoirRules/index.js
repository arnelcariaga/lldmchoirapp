import React from "react";
import { View } from "react-native";
import Pdf from "react-native-pdf";
import Loading from "./../parts/loading";

export default function ChoirRules() {
  const source = {
    uri: "bundle-assets://utils/M.I.C.E-Reglamento.pdf",
    cache: false,
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
        fitPolicy={0}
        onError={(error) => {
          console.log(error);
        }}
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        renderActivityIndicator={Loading}
      />
    </View>
  );
}
