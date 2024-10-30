import { Pressable, View, Text, StyleSheet, ScrollView, Image, Button } from "react-native";

function Settings(props) {


    return <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
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
      }
  });

export default Settings;