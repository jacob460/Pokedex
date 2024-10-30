import { Pressable, View, Text, StyleSheet, ScrollView, Image, Button, ActivityIndicator, ImageBackground } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import {useDispatch, userDispatch, useSelector} from "react-redux";
import { addFav, delFav } from "../store/redux/favorites.js";

//import Sound from "react-native-sound";

import FavButton from "../components/FavButton.js";

function Details(props) {

  //var Sound = require('react-native-sound');
  //Sound.setCategory('Playback');

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const pokemon = props.route.params.current;
  const URL = pokemon.url;

const favPokemonIds = useSelector((state) => state.favPokemon.ids);
const dispatch = useDispatch();
const isFav = favPokemonIds.includes(pokemon.id);

console.log(URL);

function handleButton(){
  console.log("clicekd");
  if(isFav){
    dispatch(delFav({id: pokemon.id}));
  }else{
    dispatch(addFav({id: pokemon.id}));
  }
  
}

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return(<FavButton icon={isFav ? 'heart' : 'heart-outline'} color="red" onPress={handleButton} />);
      }
  });
  });

  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(data => setData(data))    
    .catch(error => console.error(error))
    .finally(()=>setIsLoading(false))
  }, []);

 /* function playSound() {
    const cry = new Sound(data.cries.latest, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      cry.play();
    });
  }*/




    return <View style={styles.container}>
            {isLoading ? (<ActivityIndicator/>) : (
              <View>
              <View style={styles.container}>
                <Image style={{width: 200, height: 200, marginVertical: 50,}} resizeMode="stretch" source={{uri: data.sprites.other.showdown.front_default}} />
                <Button title="cry" onPress={()=>console.log("play")}/>
              </View>
              <View>
                <Text style={styles.header}>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Text>
                <Text style={styles.header}>Weight {data.weight}</Text>
                <Text style={styles.header}>{data.stats[0].stat.name}:  {data.stats[0].base_stat}</Text>
                <Text style={styles.header}>{data.stats[1].stat.name}:  {data.stats[1].base_stat}</Text>
                <Text style={styles.header}>{data.stats[2].stat.name}:  {data.stats[2].base_stat}</Text>
                <Text style={styles.header}>{data.stats[3].stat.name}:  {data.stats[3].base_stat}</Text>
                <Text style={styles.header}>{data.stats[4].stat.name}:  {data.stats[4].base_stat}</Text>
                <Text style={styles.header}>{data.stats[5].stat.name}:  {data.stats[5].base_stat}</Text>
              </View>
              </View>
            )}
        </View>
        
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'top',
    },
    header: {
      textAlign: 'left',
      //    fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 5,
      fontFamily: 'PixeloidMono',
    },
    desc: {
        fontSize: 18,
        padding: 10,
        lineHeight: 30,
        textAlign: 'center',
        backgroundColor: 'red',
      }
      
  });

export default Details;