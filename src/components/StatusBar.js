import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';    


const StatusBar = () => {
    return (
        <View style={ styles.container }>
            <ExpoStatusBar backgroundColor="white" />
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: getStatusBarHeight() >= 35 ? getStatusBarHeight() : getStatusBarHeight() + (35 - getStatusBarHeight()),
    },
});


export default StatusBar;
