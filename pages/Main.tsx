import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import Background from "../components/Background/Background";
import { useNavigation } from "@react-navigation/native";
import pokedexapi from "../services/pokedexapi";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import theme from "../theme";
import { color } from "react-native-reanimated";
import { Card } from "../components/Card/Card";

type PokemonType = {
  type: {
    name: string;
  };
};

export interface PokemonObject {
  id: string;
  name: string;
}

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
}

export interface Request {
  id: number;
  types: PokemonType[];
}

export default function Main() {
  const navigation = useNavigation();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [list, setList] = useState<{id: string, title: string}[]>([]);
  const [pokedex, setPokedex] = useState<Pokemon[]>([])
  const [searchfeild, setSearchfeild] = useState('');

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    handleSearchChange
  }, [searchfeild]);

  async function getPokemons(): Promise<void> {
    try {
      const response = await pokedexapi.get('/pokemon?limit=50');
      const { results } = response.data;
      const { next } = response.data;
      setNext(next);
      const payloadPokemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfoAboutPokemonsByUrl(
            pokemon.url
          );

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );

      setPokemons(payloadPokemons as Pokemon[]);
      setPokedex(payloadPokemons as Pokemon[])
    } catch (err) {
      Alert.alert("ops, algo de errado aconteceu, tente mais tarde");
    } 
  }
  
  async function getMoreInfoAboutPokemonsByUrl(url: string): Promise<Request> {
    const response = await pokedexapi.get(url);

    const { id, types } = response.data as Request;

    return { id, types };
  }

  function handleNavigationPokemonDetail(pokemonId: number) {
    navigation.navigate("About", {
      pokemonId,
    });
  }

  async function getLessPokemon() {
    try {
      const response = await pokedexapi.get(`${previous}`);

      setNext(response.data.next);
      setPrevious(response.data.previous);

      const { results } = response.data;

      const payloadPokemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfoAboutPokemonsByUrl(
            pokemon.url
          );

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );

      setPokemons(payloadPokemons as Pokemon[]);
      // payloadPokemons.map(item => {
      //   pokemons.push(item);
      // })
      //pokemons.push(payloadPokemons);
    } catch (err) {
      Alert.alert("Error");
    }
  }

  async function getMorePokemon() {
    try {
      const response = await pokedexapi.get(`${next}`);

      setNext(response.data.next);
      setPrevious(response.data.previous);
      const { results } = response.data;

      const payloadPokemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfoAboutPokemonsByUrl(
            pokemon.url
          );

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );

      setPokemons(payloadPokemons as Pokemon[]);

    } catch (err) {
      Alert.alert("Error");
    } 
  }

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View>
        <Button onPress={getMorePokemon} title="Next"></Button>
        {previous ? (
          <Button onPress={getLessPokemon} title="Previous"></Button>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const getSuggestions = useCallback(async (q: string) => {

      const filter = q.toLowerCase();
      if (typeof q !== "string") {
        setList([])
        return;
      }  

      const  response  = await pokedexapi.get(`/pokemon/${filter}`);
      const { id, name } = response.data
      const pokedex = [{
        id: id, 
        title: name
      }]

      setList(pokedex)
   
  }, []);

  const SearchBar = () => {

    return (
      <View
        style={{
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          clearButtonMode={"always"} 
          placeholder={"Search"}
          onSubmitEditing={ (text) => handleSearchChange(text) }
          returnKeyType={"search"}
          placeholderTextColor={'black'}
          style={styles.searchfeild}
          editable
        />
      </View>
    );
  };

  const handleSearchChange = (text: SyntheticEvent) => {
    if(text.nativeEvent.text){

      const formattedQuery = text.nativeEvent.text.toLowerCase().replace(/[^a-z]/gi, '');
      const newData = pokemons.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toLowerCase()
            : ''.toLowerCase();
          return itemData.indexOf(formattedQuery) > -1;
      });

      newData.length > 0 ? setPokemons(newData) : setPokemons(pokedex)
     setSearchfeild(formattedQuery)
    }else{
      setPokemons(pokedex)
      setSearchfeild(text.nativeEvent.text)
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <FlatList
          numColumns={2}
          ListHeaderComponent={<SearchBar/>}
          columnWrapperStyle={{ justifyContent: "center" }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={pokemons}
          keyExtractor={(pokemon) => pokemon.id}
          showsVerticalScrollIndicator={true}
          renderItem={({ item: pokemon }) => (
            <TouchableOpacity style={{marginBottom: 5}} onPress={() => handleNavigationPokemonDetail(pokemon.id)}>
              <Card data={pokemon} />
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          extraData={next}
        />
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1
  },
  searchfeild: {
    height: 40,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#fff',
    maxWidth: '80%',
    minWidth: '80%',
    borderRadius: 5,
    alignSelf: 'center'
  },
});
