import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Context } from '../../context/BlogContext'
import { FontAwesome } from '@expo/vector-icons'

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context)

    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'))

    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    )
}

/*
 When our component render this function will call
 automaticly and put a jsx in our header on right side 
*/
ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("Edit", { id: navigation.getParam("id") })}>
                    <FontAwesome name="pencil" size={30} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({})

export default ShowScreen

