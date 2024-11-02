import { View, StyleSheet, Button, TextInput, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { POKEMON } from "../assets/pokemon_data";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Colours from "../assets/colours";

function Favorites(props) {

  const favPokemonIds = useSelector((state) => state.favPokemon.ids);

  const filtered = POKEMON.filter(function(item) {
    return favPokemonIds.indexOf(item.id) != -1;
  });

  const [filterText, setFilterText] =  useState("");
  const [display, setDisplay] = useState(filtered);

    function renderCard(data) {

      var current = data.item;

      return(<Card color={Colours[current.types[0].name]} currentItem={current} onPress={() => props.navigation.navigate("Details", {current})}/>
      )
    }
    useEffect(() => {
      clearFilter();
    }, [favPokemonIds]);

    function updateFilterText(txt){
      setFilterText(txt);
      let filterPokemon = filtered.filter(t => t.name.toLowerCase().includes(txt.toLowerCase()));
      setDisplay(filterPokemon);
    }

    function clearFilter(){
      setFilterText();
      setDisplay(filtered);
    }

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