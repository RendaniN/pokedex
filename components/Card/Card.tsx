import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import theme from '../../theme';

type PokemonType = {
  type: {
    name: string;
  };
};

type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
};

type CardProps = {
  data: Pokemon;
} & TouchableOpacityProps;



export function Card({ data, ...rest }: CardProps) {
    return (
        <View style={styles.container}>
          <View style={styles.card}>
            <ImageBackground style={styles.image} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}}>
              <View style={styles.cardInner}>
                <Text style={styles.name}>{data.name}</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    image:{
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    cardInner:{
      padding: 10,
    },
    card:{
      width: 150,
      height: 150,
      borderRadius: 10,
      margin: 5,
      alignItems:'center',
      backgroundColor: theme.colors.background,
    },
    name: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
    },

  });
  