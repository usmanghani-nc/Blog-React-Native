import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Context } from '../../context/BlogContext'


const CreateScreen = () => {
    const { state } = useContext(Context);

    return (
        <View>
            <Text>CreateScreen</Text>
        </View>
    )
}

export default CreateScreen

const styles = StyleSheet.create({})
