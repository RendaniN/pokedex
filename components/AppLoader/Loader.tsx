import React from 'react';

import LottieView from 'lottie-react-native';
import loader from '../../assets/pikachu.json';
import { View } from 'react-native';

export function Loader() {
  return (
    <View>
      <LottieView autoPlay source={loader} loop style={{ width: 250 }} />
    </View>
  );
}

