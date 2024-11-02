import { View, StyleSheet, FlatList, Button, TextInput} from "react-native";
import { useState} from "react";
import { POKEMON } from "../assets/pokemon_data";
import Card from "../components/Card"
import Colours from "../assets/colours";

function List(props) {

  const [filterText, setFilterText] =  useState();
  const [display, setDisplay] = useState(POKEMON);

    function renderCard(data) {

      var current = data.item;

      return(<Card color={Colours[current.types[0].name]} currentItem={current} onPress={() => props.navigation.navigate("Details", {current})}/>
      )
    }

    function updateFilterText(txt){
      setFilterText(txt);
      let filterPokemon = POKEMON.filter(t => t.name.toLowerCase().includes(txt.toLowerCase()));
      setDisplay(filterPokemon);
    }

    function clearFilter(){
      setFilterText();
      setDisplay(POKEMON);
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
      //flex: 1,

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
    desc: {
        fontSize: 18,
        padding: 10,
        lineHeight: 30,
        textAlign: 'center'
      },
      card: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        backgroundColor: '#00b5ec',
        elevation: 4,
      }
  });

export default List;