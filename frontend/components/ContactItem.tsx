import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    name:string;
    onPress:()=>void;
}

const ContactItem: React.FC<Props> = ({ name, onPress})=>(
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
)

const styles= StyleSheet.create({
    item:{
        padding:16,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    name:{
        fontSize:18,
    }
});

export default ContactItem;