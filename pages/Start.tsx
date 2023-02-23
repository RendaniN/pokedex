import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Background from "../components/Background/Background";
import Logo from "../components/Logo/Logo";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";
import Wizard from "./Wizard";

export default function Start() {
  const image = require("../assets/start.png");
  const  navigation  = useNavigation();

  
  function handleNavigateToHome() {
    navigation.navigate(Wizard, 'Wizard')
  }

  return (
    <Background>
      <Logo style={styles.logoview} />
      <TouchableOpacity style={styles.holder} onPress={handleNavigateToHome}>
        <Image source={image} style={styles.imageholder} />
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  imageholder: {
    width: "50%",
    height: "30%",
    alignSelf: 'center'
  },
  holder: {
    marginVertical: 50,
  },
  logoview: {
    //height: Dimensions.get("screen").height /2,
    shadowColor: theme.colors.backgroundCard.fire,
    shadowOpacity: 0.3,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: Platform.OS == 'ios' ? 0 : 36,
  },
});
