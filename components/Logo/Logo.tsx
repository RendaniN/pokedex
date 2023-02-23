import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Logo(props: {style: React.CSSProperties}) {
  const image = require("../../assets/logo.png");
  return (
      <Image source={image} style={styles.logo} />
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: 400,
    height: 400,
    alignSelf: "center",
    justifyContent: "center",
  }
});
