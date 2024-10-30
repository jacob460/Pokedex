import { Pressable, View, Text, StyleSheet, ScrollView, Image, Button, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { POKEMON } from "../assets/pokemon_data";
import { useSelector } from "react-redux";
import Card from "../components/Card";

function Favorites(props) {

  const favPokemonIds = useSelector((state) => state.favPokemon.ids);

  const filtered = POKEMON.filter(function(item) {
    return favPokemonIds.indexOf(item.id) != -1;
  });


/*    return (
        <View style={styles.container}>
          <Text>test</Text>
          <Text>{JSON.stringify(filtered, null, 2)}</Text>
        </View>
        
)*/

//Code from  apaleslimghost on github gist
  //https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
  const colours = {
    Normal: '#A8A77A',
    Fire: '#EE8130',
    Water: '#6390F0',
    Electric: '#F7D02C',
    Grass: '#7AC74C',
    Ice: '#96D9D6',
    Fighting: '#C22E28',
    Poison: '#A33EA1',
    Ground: '#E2BF65',
    Flying: '#A98FF3',
    Psychic: '#F95587',
    Bug: '#A6B91A',
    Rock: '#B6A136',
    Ghost: '#735797',
    Dragon: '#6F35FC',
    Dark: '#705746',
    Steel: '#B7B7CE',
    Fairy: '#D685AD',
  };

  const [filterText, setFilterText] =  useState();
  const [display, setDisplay] = useState(filtered);

    function showPokemon() {
      props.navigation.navigate("Details", {});
    }

    function renderCard(data) {

      var current = data.item;

      return(<Card color={colours[current.types[0].name]} currentItem={current} onPress={() => props.navigation.navigate("Details", {current})}/>
      )
    }

    function updateFilterText(txt){
      setFilterText(txt);
      let filterPokemon = filtered.filter(t => t.name.toLowerCase().includes(txt.toLowerCase()));
      setDisplay(filterPokemon);
    }

    function clearFilter(){
      setFilterText();
      setDisplay(filtered);
    }

    // <Button title="View Pokemon Details" onPress={showPokemon}/>

    return <View style={styles.container}>
              
              <View style={styles.header}>
                <TextInput style={styles.filterInput} onChangeText={updateFilterText}>{filterText}</TextInput>
                <Button title="clear" onPress={clearFilter}/>
              </View>

            <FlatList 
              numColumns={2}
              keyExtractor={(item) => item.id}
              data={display} 
              renderItem={renderCard} 
              style={{width: '100%'}}/>
        </View>


}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'top',
    },
    header: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 5,

    },
    desc: {
        fontSize: 18,
        padding: 10,
        lineHeight: 30,
        textAlign: 'center'
      },
      header: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      filterInput:{
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 8,
        marginRight: 10,
        flex: 1,
      },
  });

export default Favorites;