import React from 'react';
import NewProject from './NewProject';

const OpenExisting = ({ route }) => {
    return (
        <NewProject initProject={route.params ? JSON.parse(route.params.data) : null} />
    )
}

export default OpenExisting;