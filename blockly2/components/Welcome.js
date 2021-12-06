import React from 'react';
import {
    Button, Text, TouchableOpacity, View
} from "react-native";
import { styles } from '../style';

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.welcome}>
            <Text style={styles.welcome_text}>
                Lập trình PLC cùng Blockly
            </Text>
            <Text style={styles.welcome_choose}>
                Mời bạn chọn:
            </Text>

            <TouchableOpacity
                style={styles.buttonMain}
                onPress={() => navigation.navigate('Theo dõi hệ thống')}
            >
                <Text style={{ color: 'white', }}>TRANG CHỦ</Text>
            </TouchableOpacity>

            {/* <View style={{ marginTop: 20, minWidth: 250 }}>
                <Button onPress={() => navigation.navigate('Mở Chương Trình')} title="Mở chương trình có sẵn" />
            </View> */}
        </View>
    )
}

export default Welcome;