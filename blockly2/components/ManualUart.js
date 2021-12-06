import React, { Component } from "react";
import {
    Alert,
    DeviceEventEmitter
} from "react-native";
import { RNSerialport, definitions, actions } from "react-native-serialport";
import { ProjectContext } from "./contexts/ProjectContext";

class ManualUart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            servisStarted: false,
            connected: false,
            usbAttached: false,
            output: "",
            outputArray: [],
            baudRate: "9600",
            interface: "-1",
            sendText: "",
            returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING
        };


        this.startUsbListener = this.startUsbListener.bind(this);
        this.stopUsbListener = this.stopUsbListener.bind(this);
    }

    componentDidMount() {
        this.startUsbListener();
    }

    componentWillUnmount() {
        this.stopUsbListener();
    }

    componentDidUpdate() {
        let value = this.context;
        if (value && value.stateProj.isSend) {
            this.writeData();
        }
    }

    startUsbListener() {
        DeviceEventEmitter.addListener(
            actions.ON_SERVICE_STARTED,
            this.onServiceStarted,
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_SERVICE_STOPPED,
            this.onServiceStopped,
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_DEVICE_ATTACHED,
            this.onDeviceAttached,
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_DEVICE_DETACHED,
            this.onDeviceDetached,
            this
        );
        DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
        DeviceEventEmitter.addListener(
            actions.ON_CONNECTED,
            this.onConnected,
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_DISCONNECTED,
            this.onDisconnected,
            this
        );
        DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
        RNSerialport.setReturnedDataType(this.state.returnedDataType);
        RNSerialport.setAutoConnectBaudRate(parseInt(this.state.baudRate, 10));
        RNSerialport.setInterface(parseInt(this.state.interface, 10));
        RNSerialport.setAutoConnect(true);
        RNSerialport.startUsbService();
    };

    stopUsbListener = async () => {
        DeviceEventEmitter.removeAllListeners();
        const isOpen = await RNSerialport.isOpen();
        if (isOpen) {
            Alert.alert("isOpen", isOpen);
            RNSerialport.disconnect();
        }
        RNSerialport.stopUsbService();
    };

    onServiceStarted(response) {

        let oldState = this.context.stateProj;
        this.context.setStateProj({ ...oldState, servisStarted: true })
        this.setState({ servisStarted: true });

        
        if (response.deviceAttached) {
            this.onDeviceAttached();
        }
    }
    onServiceStopped() {
        let oldState = this.context.stateProj;
        this.context.setStateProj({ ...oldState, servisStarted: false })
        this.setState({ servisStarted: false });
    }
    onDeviceAttached() {
        let oldState = this.context.stateProj;
        this.context.setStateProj({ ...oldState, usbAttached: true })
        this.setState({ usbAttached: true });
    }
    onDeviceDetached() {
        let oldState = this.context.stateProj;
        this.context.setStateProj({ ...oldState, usbAttached: false })
        this.setState({ usbAttached: false });
    }
    onConnected() {
        let oldState = this.context.stateProj;
        this.context.setStateProj({ ...oldState, connected: true })
        this.setState({ connected: true });
    }
    onDisconnected() {
        let oldState = this.context.stateProj;
        this.context.setStateProj({ ...oldState, connected: false })
        this.setState({ connected: false });
    }
    onReadData(data) {
        if (
            this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
        ) {
            let oldState = this.context.stateProj;
            const payload = RNSerialport.intArrayToUtf16(data.payload);
            this.context.setStateProj({ ...oldState, output: this.state.output + payload })
            this.setState({ output: this.state.output + payload });
        } else if (
            this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
        ) {
            let oldState = this.context.stateProj;
            const payload = RNSerialport.hexToUtf16(data.payload);
            this.context.setStateProj({ ...oldState, output: this.state.output + payload })
            this.setState({ output: this.state.output + payload });
        }
    }

    onError(error) {
        console.error(error);
    }

    writeData() {
        let oldState = this.context.stateProj;
        RNSerialport.writeString(oldState.sendText);
        this.context.setStateProj({ ...oldState, isSend: false })
    }


    render() {
        return (
            <>
            </>
        );
    }
}

ManualUart.contextType = ProjectContext;

export default ManualUart;