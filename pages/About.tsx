import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { CardAnimation } from "../components/Animation/AnimationView";
import pokedexapi from "../services/pokedexapi";
import * as S from "../styles";
import { useTheme } from "styled-components";
import Background from "../components/Background/Background";

interface IAttributes {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface IAbilitys {
  ability: {
    name: string;
  };
}

type PokemonTypes = {
  type: {
    name:
      | "grass"
      | "fire"
      | "water"
      | "poison"
      | "normal"
      | "bug"
      | "flying"
      | "eletric"
      | "ground";
  };
};

type PokemonProps = {
  id: number;
  name: string;
  color: string;
};

type RouteParams = {
  pokemonId: number;
};

export function About(): JSX.Element {
  const route = useRoute();
  const { colors } = useTheme();
  const { pokemonId } = route.params as RouteParams;
  const navigation = useNavigation();

  const [pokemon, setPokemon] = useState<{ id: number, name: string, color: string }[]>([]);

  const [pokemonTypes, setTypes] = useState([]);
  const [popkemonStats, setStats] = useState([]);
  const [popkemonAbilities, setAbilities] = useState([]);

  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerBackVisible: false,
      headerStyle: { backgroundColor: "transparent" },
      headerTitleStyle: {
        alignSelf: Platform.OS === "ios" ? "center" : "center",
      },
      headerTitleAlign: "center",
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 15,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function getPokemonDetail(): Promise<void> {
    const response = await pokedexapi.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    );

    const { id, name } = response.data;
    const { stats } = response.data;
    const { abilities } = response.data;
    const { types } = response.data;

    setTypes(types);
    setStats(stats);
    setAbilities(abilities);

    const currentType = types[0].type.name;
    const color = colors.backgroundCard[currentType];

    setPokemon([{
      id,
      name,
      color,
    }]);
  }
    getPokemonDetail();
  }, [pokemonId, colors.backgroundCard]);

  return (
    <>
      <ImageBackground
        imageStyle={{ height: "50%" }}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
        }}
        style={styles.cardView}
      >
        <Text style={styles.pokemonTitle}>{pokemon.name}</Text>
        <S.ContentImage style={styles.image}>
          <CardAnimation>
            <S.PokemonImage
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
              }}
            />
          </CardAnimation>
        </S.ContentImage>

        <S.Container>
          <ScrollView showsVerticalScrollIndicator={false}>
            <S.Title type={pokemonTypes[0]?.type.name}> Base States </S.Title>
            {popkemonStats?.map((attribute) => (
              <S.StatusBar key={attribute.stat.name}>
                <S.Attributes>{attribute.stat.name}</S.Attributes>
                <S.AttributesNumber>{attribute.base_stat}</S.AttributesNumber>
                <S.ContentBar>
                  <S.ProgressBar
                    type={pokemonTypes?.name}
                    borderWidth={0}
                    progress={100}
                    width={attribute.base_stat}
                    color={pokemon.color}
                  />
                </S.ContentBar>
              </S.StatusBar>
            ))}

            <S.Title type={pokemonTypes[0]?.type.name}> Abilities </S.Title>
            {popkemonAbilities?.map((abilityItem) => (
              <S.Ability key={abilityItem.ability.name}>
                {abilityItem.ability.name}
              </S.Ability>
            ))}
          </ScrollView>
        </S.Container>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  cardView: {
    justifyContent: "flex-end",
    flex: 1,
    height: 50,
  },
  image: {
    justifyContent: "flex-end",
  },
  pokemonTitle: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
});
