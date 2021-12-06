import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from "react";
import {
    Text, TouchableOpacity, View
} from "react-native";
import { styles } from "../style";
import OpenExisting from "./OpenExisting";

const Stack = createStackNavigator();

const NewProjectStack = () => {
    const navigation = useNavigation();
    useEffect(() => { navigation.navigate('Existing'); }, [])
    return (
        <>
            <View style={styles.welcome}>
                <TouchableOpacity
                    style={{ ...styles.buttonMain, marginTop: 50 }}
                    onPress={() => navigation.navigate('Existing')}
                >
                    <Text style={{ color: 'white', }}>TẠO CHƯƠNG TRÌNH MỚI</Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

const NewProjectWrapper = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Tạo chương trình mới" component={
                NewProjectStack
            } />
            <Stack.Screen options={{ headerShown: false }} name="Existing" component={OpenExisting} />
        </Stack.Navigator>
    );
}

export default NewProjectWrapper;