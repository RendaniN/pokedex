import React, { useEffect } from 'react';
import { useWindowDimensions, View, ViewProps } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [
        {
          translateX: cardOffset.value,
        },
      ],
    };
  });

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 1000 });
    cardOffset.value = withTiming(0, { duration: 1000 });
  },);

  return (
    <View {...rest} style={animatedStyle}>
      {children}
    </View>
  );
}