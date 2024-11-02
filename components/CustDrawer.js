import { Pressable, View, Text, StyleSheet, Image} from "react-native";
import { DrawerContentScrollView } from '@react-navigation/drawer';


function CustDrawer({navigation}){
    /*return(
    
    );*/
    return(     
        <DrawerContentScrollView style={{backgroundColor: "red",}}>
              <Pressable onPress={() => navigation.navigate('Home')}>
                <View style={styles.container}>
                    <Image style={styles.itemImage} resizeMode='contain' source={require('../assets/Pokedex_logo.png')}/>
                    <Text style={styles.itemText}>Home</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Pokemon List')}>
                <View style={styles.container}>
                <Image style={styles.itemImage} source={require('../assets/Dream_Master_Ball_Sprite.png')}/>
                <Text style={styles.itemText}>List</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Favorites')}>
                <View style={styles.container}>
                <Image style={styles.itemImage} source={require('../assets/Soul_Badge.png')}/>
                <Text style={styles.itemText}>Favorites</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <View style={styles.container}>
                <Image style={styles.itemImage} source={require('../assets/gear.png')}/>
                    <Text style={styles.itemText}>Settings</Text>
                </View>
            </Pressable>
        </DrawerContentScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      margin: 10,
    },
    itemText: {
        fontSize: 30,
        alignItems: 'center',
        fontFamily: 'PixeloidMono',
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 40,
        backgroundColor: "white",
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    itemImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    }
});
export default CustDrawer;