import React from "react";
import { Text, StyleSheet } from "react-native";

export default function CenterElements({ title }) {
  return (
    <>
      <Text style={styles.logo}>
        Coro{" "}
        <Text style={styles.slogan}>
          LLDM{" "}
          <Text style={styles.title}>
            {title !== undefined && "| " + title}
          </Text>
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: "normal",
    fontSize: 18,
    color: "#fff",
  },
  title: {
    fontWeight: "normal",
    fontSize: 13,
  },
  slogan: {
    fontWeight: "bold",
  },
});
