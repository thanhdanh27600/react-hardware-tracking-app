import { SET, ERROR, REMOVE, NO_DEVICE } from './../actions/action';
import uuid from 'react-native-uuid';
import Realm from "realm";
import ProjectSchema from '../contexts/ProjectSchema';
import { Alert } from 'react-native';

const initialState = {
    loading: false,
    data: [] | null
}

var realm = null;

const projectReducer = async (state = initialState, action) => {
    switch (action.type) {
        case SET:
            realm = await Realm.open({
                path: "myproject",
                schema: [ProjectSchema],
            });
            realmObj = realm.objects("Project");
            let checkDupNameArr = realmObj.filter((proj) => proj.name === action.project.name)

            realm.write(() => {
                realm.create(
                    "Project",
                    { _id: action.project._id ? action.project._id : (checkDupNameArr.length > 0 ? checkDupNameArr[0]._id : uuid.v4()), name: action.project.name ? action.project.name : checkDupNameArr[0].name, data: action.project.data },
                    "modified"
                );
                if (checkDupNameArr.length > 0) {
                    Alert.alert("Cảnh báo", "Tên chương trình đã tồn tại, chương trình sẽ được ghi đè.")
                }
                else {
                    Alert.alert("Thông báo", "Chương trình đã được lưu")
                }
            })

            console.log("Save successful" + action.project.name);
            console.log("With ID = ", action.project._id)
            return state; //do nothing with state
        case REMOVE:
            realm = await Realm.open({
                path: "myproject",
                schema: [ProjectSchema],
            });
            realm.write(() => {
                // Find dogs younger than 2 years old.
                const toDeleteProj = realm.objects("Project").filter((proj) => proj.id === action.project.id)
                // Delete the collection from the realm.
                realm.delete(toDeleteProj);
            });
            return state;
        case ERROR:
            if (action.err) Alert.alert("Thông báo", action.err)
            return state;
        case NO_DEVICE:
            Alert.alert("Thông báo", "Chưa kết nối thiết bị...")
            return state;
        default:
            return state
    }
}

export default projectReducer;