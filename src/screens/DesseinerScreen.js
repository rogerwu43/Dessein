import { useEffect, useState } from 'react';
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus as fasCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faCircleCheck as fasCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';

import Dessein from '../components/Dessein';

import DesseinerService from '../services/DesseinerService';


const DesseinerScreen = (props) => {
    const [desseins, setDesseins] = useState([]);

    var isInitialising = true;
    useEffect(() => {
        DesseinerService.getDesseins(props.desseiner).then((desseins) => {
            setDesseins(desseins);
        });
    }, [props.desseiner]);

    var isCreatingDessein = false;
    async function createDessein() {
        if (isCreatingDessein) { return; }

        isCreatingDessein = true;
        return DesseinerService.addDessein(newDesseinTextInput, props.desseiner).then(function(newDessein) {
            setDesseins([...desseins, newDessein]);
            onChangeNewDesseinTextInput('');
        }).catch(() => {
            isCreatingDessein = false;
        });
    }

    useEffect(() => {
        isInitialising = false;
        isCreatingDessein = false;
        closeCreateDesseinModal();
    }, [desseins]);

    function debugClear() {
        DesseinerService.clear().then(function() {
            setDesseins([]);
        });
    }

    const [createDesseinModalVisible, setCreateDesseinModalVisible] = useState(false);
    const [newDesseinTextInput, onChangeNewDesseinTextInput] = useState('');
    function showCreateDesseinModal() {
        setCreateDesseinModalVisible(true);
    }
    function closeCreateDesseinModal() {
        setCreateDesseinModalVisible(false);
    }

    function updateDesseins() {
        DesseinerService.getDesseins(props.desseiner).then((desseins) => {
            setDesseins(desseins);
        }); 
    }

    return (
        <ScrollView style={ styles.container } contentContainerStyle={ styles.scrollViewContentContainer }>
            <Modal animationType='slide' visible={ createDesseinModalVisible } onRequestClose={ closeCreateDesseinModal }>
                <TouchableOpacity onPress={ closeCreateDesseinModal } style={ { padding: 10, position: 'absolute', top: 0, right: 0 } }>
                    <FontAwesomeIcon icon={ fasXmark } size={ 32 } />
                </TouchableOpacity>

                <View style={ { padding: 25, paddingTop: 100 } }>
                    <View style={ styles.avatarContainer }>
                        <Image source={ DesseinerService.desseiners[props.desseiner].avatar } style={ styles.avatar }></Image>
                    </View>
                    
                    <TextInput value={newDesseinTextInput} onChangeText={onChangeNewDesseinTextInput}
                        style={ { marginTop: 20, height: 200, borderWidth: 1, borderColor: 'lightgrey', padding: 10 } }
                        autoFocus={ true } multiline={ true } textAlignVertical='top'
                    />

                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={ createDessein }>
                            <FontAwesomeIcon icon={ fasCircleCheck } size={ 48 } color='green' />
                        </TouchableOpacity>          
                    </View>
                </View>
            </Modal>

            {/* <View>
                <Text>Title: {props.desseiner}</Text>
            </View> */}

            {/* <Button onPress={ debugClear } title='Clear'></Button> */}

            {desseins.map(function(dessein) {
                return (
                    <Dessein key={ dessein.id } dessein={ dessein } desseiner={ props.desseiner } updateDesseins={ () => { updateDesseins() } } />
                )
            })}

            <View style={ styles.addDesseinContainer }>
                <TouchableOpacity onPress={ showCreateDesseinModal } >
                    <FontAwesomeIcon icon={ fasCirclePlus } size={ 32 } color={ '#ff9e00' } />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242836',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    scrollViewContentContainer: {
        rowGap: 10,
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 50,
        height: 100,
        width: 100,
    },
    addDesseinContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
});


export default DesseinerScreen;
