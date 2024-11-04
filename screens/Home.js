import { View, StyleSheet, ImageBackground } from "react-native";

function Home() {


    return(
      <View style={styles.container}>
        <ImageBackground style={{flex:1,}} resizeMode='stretch' source={require('../assets/pokedex_logo.png')}/>
      </View>
        
)};

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'yellow',
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
      }
  });

export default Home;