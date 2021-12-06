import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,

        // alignItems: 'center',
        // justifyContent: 'center',
    },
    welcome: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    welcome_text: {
        marginTop: 20,
        fontSize: 24,
    },
    welcome_choose: {
        marginTop: 20,
        fontSize: 20,
    },
    header: {
        backgroundColor: 'pink',
        margin: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: 'yellow',
        margin: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    },
    item: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 50,
        paddingVertical: 15,
        backgroundColor: 'lightblue',
        fontSize: 22,
        elevation: 3,
        borderRadius: 8,
        maxWidth: 600,
        minWidth: 300
    },
    data: {
        flex: 1,
        marginTop: 20,
        fontSize: 20,
        paddingLeft: 10,
        maxWidth: 200,
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },

    buttonMain: {
        marginTop: 40,
        marginBottom: 20,
        minWidth: 300,
        backgroundColor: 'darkorange',
        alignItems: "center",
        paddingVertical: 10,
        elevation: 5
    },
    noProjectView: {
        marginTop: 20,
        alignItems : 'center',
        flex: 1,
    },
    noProjectText: {
        fontSize: 20,
    }
});
