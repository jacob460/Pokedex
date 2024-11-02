import { Pressable, View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, ImageBackground} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addFav, delFav } from "../store/redux/favorites.js";

import FavButton from "../components/FavButton.js";
//import { loadAsync } from "expo-font";
import Colours from "../assets/colours";
import { Audio } from "expo-av";

function Details(props) {

  const [data, setData] = useState();
  const [descriptionData, setDescriptionData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [abil1Loading, setAbil1Loading] = useState(true);
  const [abil2Loading, setAbil2Loading] = useState();
  const [dataLoading, setDataLoading] = useState(true);
  const pokemon = props.route.params.current;
  const URL = pokemon.url;
  const [abil1Data, setAbil1Data] = useState();
  const [abil2Data, setAbil2Data] = useState();
  const [abil1Desc, setAbil1Desc] = useState();
  const [abil2Desc, setAbil2Desc] = useState();


  const favPokemonIds = useSelector((state) => state.favPokemon.ids);
  const dispatch = useDispatch();
  const isFav = favPokemonIds.includes(pokemon.id);

  function handleButton(){
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
    .finally(()=>setDataLoading(false));
    console.log(URL);
  }, []);
  
  useEffect(() =>{
    if(dataLoading == false){
      fetch(data.abilities[0].ability.url)
      .then(response => response.json())
      .then(abil1Data => setAbil1Data(abil1Data))
      .catch(error => console.error(error))
      .finally(()=> {
        if(data.abilities[1]!=null){
          setAbil1Loading(false);
        }else{
          setAbil1Loading(false);
          setIsLoading(false);
        }});   
    }
  },[dataLoading]);

  useEffect(() =>{
    if(abil1Loading == false && data.abilities[1] != null){
      fetch(data.abilities[1].ability.url)
      .then(response => response.json())
      .then(abil2Data => setAbil2Data(abil2Data))
      .catch(error => console.error(error))
      .finally(()=> {setAbil2Loading(false); setIsLoading(false);});
    }else if(abil1Loading == false){
      setIsLoading(false);
    }
  },[abil1Loading]);

  useEffect(() => {
    if(abil1Loading == false){
      for(let i = 0; i < abil1Data.effect_entries.length; i++){
        if(abil1Data.effect_entries[i].language.name == "en"){
          setAbil1Desc(abil1Data.effect_entries[i].effect);
        }
      }
    }
    if(abil2Loading == false){
      for(let i = 0; i < abil2Data.effect_entries.length; i++){
        if(abil2Data.effect_entries[i].language.name == "en"){
          setAbil2Desc(abil2Data.effect_entries[i].effect);
        }
      }
    }
  }, [abil1Loading, abil2Loading]);

  async function playCry(){
    if(data.cries.latest != null){
      const sound = new Audio.Sound();
      try{
      await sound.loadAsync({uri: data.cries.latest}); 
      await sound.playAsync();
    }catch{
      console.error((await sound.getStatusAsync()).isLoaded);
      console.error("cant play cry");
    }

    }
  }

  function InfoTab(){
    return(
      <View style={styles.desc}>
        <Text style={styles.header}>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Text>
        { data.height.toString().length == 1 && <Text style={styles.header}>Height:  0.{data.height} m</Text>}
        { data.height.toString().length > 1 && <Text style={styles.header}>Height:  {data.height.toString().substr(0,data.height.toString().length-1)}.{data.height.toString().substr(data.height.toString().length-1)} m</Text>}
        { data.weight.toString().length == 1 && <Text style={styles.header}>Weight:  0.{data.weight} kg</Text>}
        { data.weight.toString().length > 1 && <Text style={styles.header}>Weight:  {data.weight.toString().substr(0,data.weight.toString().length-1)}.{data.weight.toString().substr(data.weight.toString().length-1)} kg</Text>}
        <View style={{flexDirection:'row',}}>
          <View style={[styles.type, {marginRight: 10,backgroundColor: Colours[data.types[0]?.type.name.charAt(0).toUpperCase() + data.types[0]?.type.name.slice(1)]}]}>
            <Text style={{fontFamily: 'PixeloidMono', }}>{data.types[0]?.type.name}</Text>
          </View>
          {data.types[1] && <View style={[styles.type, {backgroundColor: Colours[data.types[1]?.type.name.charAt(0).toUpperCase() + data.types[1]?.type.name.slice(1)]}]}>
              <Text style={{fontFamily: 'PixeloidMono',}}>{data.types[1]?.type.name}</Text>
          </View>}
        </View>
      </View>
    );
  }
  function StatsTab(){
    return(
      <View style={styles.desc}>
        <View style={styles.stats}>
        <Text style={styles.header}>{data.stats[0].stat.name}:</Text>
        <Text style={styles.header}>{data.stats[0].base_stat}</Text>
        </View>
        <View style={styles.stats}>
        <Text style={styles.header}>{data.stats[1].stat.name}:</Text>
        <Text style={styles.header}>{data.stats[1].base_stat}</Text>
        </View >
        <View style={styles.stats}>
        <Text style={styles.header}>{data.stats[2].stat.name}:</Text>
        <Text style={styles.header}>{data.stats[2].base_stat}</Text>
        </View>
        <View style={styles.stats}>
        <Text style={styles.header}>{data.stats[3].stat.name}:</Text>
        <Text style={styles.header}>{data.stats[3].base_stat}</Text>
        </View>
        <View style={styles.stats}>
        <Text style={styles.header}>{data.stats[4].stat.name}:</Text>
        <Text style={styles.header}>{data.stats[4].base_stat}</Text>
        </View>
        <View style={styles.stats}>
        <Text style={styles.header}>{data.stats[5].stat.name}:</Text>
        <Text style={styles.header}>{data.stats[5].base_stat}</Text>
        </View>
      </View>
    );
  }
  function AbilTab(){
    return(
      <View style={styles.desc}>
        <ScrollView persistentScrollbar={true}>
        <Text style={styles.header}>{data.abilities[0].ability.name}</Text>
        <Text style={styles.abilities}>{abil1Desc}</Text>
        {data.abilities[1] &&
          <View>
          <Text style={styles.header}>{data.abilities[1].ability.name}</Text>
          <Text style={styles.abilities}>{abil2Desc}</Text>
        </View>}
        {data.abilities[2] &&
          <View>
          <Text style={styles.header}>{data.abilities[2].ability.name}</Text>
          <Text style={styles.abilities}>{abil3Desc}</Text>
        </View>}
        </ScrollView>
      </View>);
  }


    return <View style={styles.container}>
      {isLoading ? (<ActivityIndicator/>) : (
        <View>
        <View style={{marginVertical: 20,}}>
          <ImageBackground source={require("../assets/poke_Screen.png")}  resizeMode="contain" style={{alignItems:"center",}}>
                        { data.sprites.other.showdown.front_default != null && <Image style={{width: 200, height: 200, marginBottom: 100, marginTop: 50,}} resizeMode="stretch" source={{uri: data.sprites.other.showdown.front_default}} />}
                        { data.sprites.other.showdown.front_default == null && <Image style={{width: 200, height: 200, marginBottom: 100, marginTop: 50,}} resizeMode="stretch" source={{uri: pokemon.image}} />}
          </ImageBackground>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <Pressable onPress={() => setDescriptionData(0)}>
            <View style={{backgroundColor:'#509cfa', padding: 8, borderWidth: 5, borderColor: '#000e6c',}}>
              <Text style={{fontFamily:'PixeloidMono', fontSize:20}}>Info</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setDescriptionData(1)}>
            <View style={{backgroundColor:'#509cfa', padding: 8, borderWidth: 5, borderColor: '#000e6c',}}>
              <Text style={{fontFamily:'PixeloidMono', fontSize:20}}>Stats</Text>
            </View>
          </Pressable>
          <Pressable onPress={ () => setDescriptionData(2)}>
            <View style={{backgroundColor:'#509cfa', padding: 8, borderWidth: 5, borderColor: '#000e6c',}}>
              <Text style={{fontFamily:'PixeloidMono', fontSize:20}}>Abil</Text>
            </View>
          </Pressable>
          <Pressable onPress={playCry}>
            <View style={{backgroundColor:'#509cfa', padding: 8, borderWidth: 5, borderColor: '#000e6c',}}>
              <Text style={{fontFamily:'PixeloidMono', fontSize:20}}>Cry</Text>
            </View>
          </Pressable>
        </View>
        
        {descriptionData==0 && <InfoTab/>}
        {descriptionData==1 && <StatsTab/>}
        {descriptionData==2 && <AbilTab/>}
        </View>
      )}
  </View>       
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'top',
      flex:1,
      backgroundColor: 'red',
    },
    header: {
      textAlign: 'left',
      fontSize: 20,
      marginBottom: 5,
      fontFamily: 'PixeloidMono',
    },
    desc: {
        fontSize: 18,
        padding: 10,
        lineHeight: 30,
        textAlign: 'center',
        backgroundColor: '#30fa04',
        borderWidth: 5,
        borderColor:"black",
        margin: 10,
        borderRadius:15,
        maxHeight: "40%",
      },
      type:{
        fontSize: 10,
        alignItems:"center",
        width: "25%",
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "white",
        marginVertical: 2,
      },
      abilities:{
        textAlign: 'left',
      fontSize: 13,
      marginBottom: 5,
      fontFamily: 'PixeloidMono',
      marginHorizontal: 15,
      },
      stats:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
  });

export default Details;