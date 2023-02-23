import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { ReactNode } from "react";

export default function Background(props: { children: React.ReactNode }) {
  const image = require("../../assets/bg.png");
  return <ImageBackground source={image} style={styles.image}>{props.children}</ImageBackground>;
}

const styles = StyleSheet.create({
  image: {
    flex:1,
    resizeMode: "cover",
    width: "100%",
  },
});
