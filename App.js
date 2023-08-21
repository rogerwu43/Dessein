import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DesseinerScreen from './src/screens/DesseinerScreen';
import NavigationBar from './src/components/NavigationBar';
import StatusBar from './src/components/StatusBar';

import DesseinerService from './src/services/DesseinerService';


export default function App() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    var desseiners = Object.keys(DesseinerService.desseiners);
    var random = getRandomInt(desseiners.length);
    const [currentDesseiner, setCurrentDesseiner] = useState(desseiners[random]);

    return (
        <View style={ styles.container }>
            <StatusBar />
            <DesseinerScreen desseiner={ currentDesseiner } />
            <NavigationBar currentDesseiner={ currentDesseiner } setCurrentDesseiner={ setCurrentDesseiner } />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
});
