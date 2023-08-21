import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import DesseinerService from '../services/DesseinerService';


const NavigationBar = (props) => {
    const desseiners = Object.keys(DesseinerService.desseiners).sort((x, y) => DesseinerService.desseiners[x] > DesseinerService.desseiners[y] );

    return (
        <View style={ styles.container }>
            {desseiners.map(function(desseiner) {
                return (
                    <View key={ desseiner } style={ styles.desseinerContainer }>
                        <View style={ desseiner === props.currentDesseiner ? styles.selected : undefined }>
                            <TouchableOpacity onPress={ () => { props.setCurrentDesseiner(desseiner) } } style= { styles.desseiner } >
                                <Image source={ DesseinerService.desseiners[desseiner].avatar } style={ styles.avatar }></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#242836',
        borderColor: '#313336',
        borderStyle: 'solid',
        borderTopWidth: 0.5,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-evenly',
        paddingLeft: 10,
        paddingRight: 10,
    },
    desseinerContainer: {
        alignItems: 'center',
        flex: 1,
    },
    desseiner: {
        borderRadius: 20,
        height: 40,
        overflow: 'hidden',
        width: 40,
    },
    selected: {
        borderColor: '#E55838',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 50,
    },
    avatar: {
        height: '100%',
        width: '100%',
    },
});


export default NavigationBar;
