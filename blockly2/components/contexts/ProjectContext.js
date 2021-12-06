import React, { createContext, useReducer, useState } from 'react';
import { definitions } from "react-native-serialport";
import Realm from "realm";
import projectReducer from './../reducers/ProjectReducer';
import ProjectSchema from './ProjectSchema';

export const ProjectContext = createContext();

async function initTest() {
    const realm = await Realm.open({
        path: "myproject",
        schema: [ProjectSchema],
    });

    let project1, project2;
    realm.write(() => {
        // project1 = realm.objectForPrimaryKey("Project", 1);
        // project2 = realm.objectForPrimaryKey("Project", 2);
        // console.log(`created two tasks: ${project1.name} & ${project2.name}`);
        // Delete all instances of Cat from the realm.
        realm.delete(realm.objects("Project"));
    });
    realm.close();


}

// initTest();



const ProjectContextProvider = (props) => {
    const [projects, dispatch] = useReducer(projectReducer, [])
    const [stateProj, setStateProj] = useState({
        servisStarted: false,
        connected: false,
        usbAttached: false,
        output: "",
        outputArray: [],
        baudRate: "9600",
        interface: "-1",
        sendText: "",
        isSend: false,
        returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING,
    })
    // const callback = useCallback(
    //     async () => {
    //         const realm = await Realm.open({
    //             path: "myproject",
    //             schema: [ProjectSchema],
    //         });
    //         const projects = realm.objects("Project");
    //         console.log("file: ProjectContext.js ~ line 43 ~ projects", projects)
    //         // const listProject = projects.map((project) => project.name)
    //         // console.log(`The lists of tasks are: ${listProject}`);
    //         dispatch({ type: 'SETOK', payload: projects })
    //     },
    //     [projects],
    // )


    // // const addProject = (title, content, created_by) => {
    // //     let current_date = new Date();
    // //     setProject([...projects, { title, content, created_by, date: current_date.toString(), id: uuidv4() }])
    // // }

    // useEffect(() => {
    //     console.log("file: ProjectContext.js ~ line 58 ~ useEffect ~ projects", projects)
    //     callback();
    // }, [])

    return (
        <ProjectContext.Provider value={{ projects, dispatch, stateProj, setStateProj }}>
            {props.children}
        </ProjectContext.Provider>
    );
}

export default ProjectContextProvider;