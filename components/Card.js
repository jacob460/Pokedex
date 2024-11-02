import { Pressable, StyleSheet, Text, View, Image} from 'react-native';

function Card (props) {

  if(props.currentItem.types[1] == null){

    return(
      
    <View style={[styles.card, {backgroundColor: props.color}]}><Pressable onPress={props.onPress}>
      <View style={{alignItems:"center"}}>
      <Image style={{width: 100, height: 100}} source={{uri: props.currentItem.image}}/>
      <Text style={{fontSize: 20, fontFamily: 'PixeloidMono'}}>{props.currentItem.name}</Text>
      </View>
      <View style={styles.type}>
        <Text style={{fontFamily: 'PixeloidMono',}}>{props.currentItem.types[0].name}</Text>
      </View>
      </Pressable>
    </View>
    );
  }else{
    return(
    <View style={[styles.card, {backgroundColor: props.color}]}><Pressable onPress={props.onPress}>
      <View style={{alignItems:"center"}}>
      <Image style={{width: 100, height: 100}} source={{uri: props.currentItem.image}}/>
      <Text style={{fontSize: 20,fontFamily: 'PixeloidMono',}}>{props.currentItem.name}</Text>
      </View>
      <View style={styles.type}>
        <Text style={{fontFamily: 'PixeloidMono',}}>{props.currentItem.types[0].name}</Text>
      </View>
      <View style={styles.type}>
        <Text style={{fontFamily: 'PixeloidMono',}}>{props.currentItem.types[1]?.name}</Text>
      </View>
      </Pressable>
    </View>
    );
  }
};

  const styles = StyleSheet.create({
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 10,
      flex: 1,
      elevation: 4,
    },
    type:{
      fontSize: 10,
      alignItems:"center",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "white",
      marginVertical: 2,

    },
  });

  export default Card;