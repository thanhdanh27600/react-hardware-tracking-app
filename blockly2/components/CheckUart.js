import React, { useContext } from "react";
import {
    ScrollView, StyleSheet,
    Text, TextInput,
    TouchableOpacity, View
} from "react-native";
import { ProjectContext } from "./contexts/ProjectContext";

const CheckUart = () => {


    const projectContext = useContext(ProjectContext)


    const handleSendButton = () => {
        let oldState = projectContext.stateProj;
        projectContext.setStateProj({ ...oldState, isSend: true })
    }

    const buttonStyle = status => {
        return status
            ? styles.button
            : Object.assign({}, styles.button, { backgroundColor: "#C0C0C0" });
    };

    return (
        <ScrollView style={styles.body}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.line}>
                        <Text style={styles.title}>Service:</Text>
                        <Text style={styles.value}>
                            {projectContext.stateProj.servisStarted ? "Tốt" : "Chưa khởi động"}
                        </Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.title}>USB:</Text>
                        <Text style={styles.value}>
                            {projectContext.stateProj.usbAttached ? "Có kết nối USB" : "Chưa kết nối USB"}
                        </Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.title}>Connection:</Text>
                        <Text style={styles.value}>
                            {projectContext.stateProj.connected ? "Tốt" : "Chưa kết nối"}
                        </Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.title}>Baud rate:</Text>
                        <Text style={styles.value}>
                            {projectContext.stateProj.connected ? "9600" : "Chưa kết nối"}
                        </Text>
                    </View>
                </View>
                <ScrollView style={styles.output} nestedScrollEnabled={true}>
                    <Text style={styles.full}>
                        {projectContext.stateProj.output === "" ? "Đang đợi dữ liệu..." : projectContext.stateProj.output}
                    </Text>
                </ScrollView>

                <View style={styles.inputContainer}>
                    <Text>Gửi dữ liệu</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => {

                            let oldState = projectContext.stateProj;
                            projectContext.setStateProj({ ...oldState, sendText: text  })
                        }
                        }
                        value={projectContext.stateProj.sendText}
                        placeholder={"Nhập dữ liệu"}
                    />
                </View>
                <View style={styles.line2}>
                    <TouchableOpacity
                        style={buttonStyle(projectContext.stateProj.connected)}
                        onPress={() => handleSendButton()}
                        disabled={!projectContext.stateProj.connected}
                    >
                        <Text style={styles.buttonText}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );
}



const styles = StyleSheet.create({
    full: {
        flex: 1
    },
    body: {
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16
    },
    header: {
        display: "flex",
        justifyContent: "center"
    },
    line: {
        display: "flex",
        flexDirection: "row"
    },
    line2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    title: {
        width: 100
    },
    value: {
        marginLeft: 20
    },
    output: {
        marginTop: 10,
        height: 150,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderWidth: 1
    },
    inputContainer: {
        marginTop: 10,
        borderBottomWidth: 2
    },
    textInput: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 40
    },
    button: {
        marginTop: 16,
        marginBottom: 16,
        paddingLeft: 15,
        paddingRight: 15,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#147efb",
        borderRadius: 3,
        minWidth: 150,
    },
    buttonText: {
        color: "#FFFFFF"
    }
});

export default CheckUart