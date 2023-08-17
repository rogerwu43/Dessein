import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DesseinerScreen from './src/screens/DesseinerScreen';
import NavigationBar from './src/components/NavigationBar';
import StatusBar from './src/components/StatusBar';


export default function App() {
    const [currentDesseiner, setCurrentDesseiner] = useState('gaia');

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
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
    },
});
