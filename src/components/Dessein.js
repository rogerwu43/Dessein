import { useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus as fasCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faCircleXmark as fasCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faCircleCheck as fasCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faCircleExclamation as fasCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';

import DesseinerService from '../services/DesseinerService';


const Dessein = (props) => {

    const [editDesseinModalVisible, setEditDesseinModalVisible] = useState(false);
    const [editDesseinTextInput, onChangeEditDesseinTextInput] = useState(props.dessein.text);
    function showEditDesseinModal() {
        onChangeEditDesseinTextInput(props.dessein.text);
        setEditDesseinModalVisible(true);
    }
    function closeEditDesseinModal() {
        setEditDesseinModalVisible(false);
        onChangeEditDesseinTextInput(props.dessein.text);
        setDeleteSure(false);
    }

    async function submit() {
        return DesseinerService.editDessein(props.desseiner, props.dessein.id, editDesseinTextInput).then(function(newDessein) {
            props.updateDesseins();
            closeEditDesseinModal();
        });
    }

    const [deleteSure, setDeleteSure] = useState(false);
    async function deleteDessein() {
        if (!deleteSure) {
            setDeleteSure(true);
            return;
        }

        return DesseinerService.deleteDessein(props.desseiner, props.dessein.id).then(function() {
            props.updateDesseins();
        });
    }

    return (
        <View>
            <Modal animationType='slide' visible={ editDesseinModalVisible } onRequestClose={ closeEditDesseinModal }>
                <View style={ { flex: 1, padding: 25, paddingTop: 100 } }>
                    <View style={ styles.modalAvatarContainer }>
                        <Image source={ DesseinerService.desseiners[props.desseiner].avatar } style={ styles.modalAvatar }></Image>
                    </View>
                    
                    <TextInput value={editDesseinTextInput} onChangeText={onChangeEditDesseinTextInput}
                        style={ { marginTop: 20, height: 200, borderWidth: 1, borderColor: 'lightgrey', padding: 10 } }
                        autoFocus={ true } textAlignVertical='top'
                    />

                    <View style={{ marginTop: 20, justifyContent: 'center', flexDirection: 'row', columnGap: 10 }}>
                        <TouchableOpacity onPress={ submit }>
                            <FontAwesomeIcon icon={ fasCircleCheck } size={ 48 } color='green' />
                        </TouchableOpacity>            
                        <TouchableOpacity onPress={ closeEditDesseinModal }>
                            <FontAwesomeIcon icon={ fasCircleXmark } size={ 48 } />
                        </TouchableOpacity>          
                    </View>

                    <View style={{ flexGrow: 1, flexShrink: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
                        {deleteSure ?
                            <TouchableOpacity onPress={ deleteDessein } style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', height: 48, width: 96, borderRadius: 8 }}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={ deleteDessein } style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', height: 48, width: 48, borderRadius: 24 }}>
                                <FontAwesomeIcon icon={ fasTrash } size={ 24 } style={{ color: 'white' }} />
                            </TouchableOpacity>     
                        }           
                    </View> 
                </View>
            </Modal>

            <TouchableOpacity style={ styles.container } onPress={ showEditDesseinModal }>
                <View style={ styles.avatarContainer }>
                    <Image source={ DesseinerService.desseiners[props.desseiner].avatar } style={ styles.avatar }></Image>
                </View>
                <View style={ styles.textContainer }>
                    <Text>{ props.dessein.text }</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        columnGap: 10,
        flexDirection: 'row',
        padding: 10,
    },
    avatarContainer: {

    },
    avatar: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    modalAvatarContainer: {
        alignItems: 'center',
    },
    modalAvatar: {
        borderRadius: 50,
        height: 100,
        width: 100,
    },
    textContainer: {
    },
});


export default Dessein;
