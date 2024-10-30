import { Pressable, StyleSheet, Text, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function FavButton(props) {
    return(<Pressable onPress={props.onPress}>
        <Ionicons name={props.icon} size={30} color={props.color}/>
    </Pressable>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroudColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FavButton;