import { Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function FavButton(props) {
    return(<Pressable onPress={props.onPress}>
        <Ionicons name={props.icon} size={30} color={props.color}/>
    </Pressable>);
}



export default FavButton;