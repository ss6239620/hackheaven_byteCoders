import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal, TextInputComponent, TextInput } from 'react-native';
import React, { useState } from 'react';
import Chats from './Chat';
import LottieView from 'lottie-react-native';
import { colorTheme } from '../../constant';

const Screen1 = () => {
    const [showModal, setShowModal] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputDescription, setInputDescription] = useState('')

    const handleNameChange = (text) => {
        setInputName(text);
    }
    const handleDescriptionChange = (text) => {
        setInputDescription(text);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Chats />
                <Chats />
                <Chats />
                <Chats />
                <Chats />
                <Chats />
                <Chats />
                <Chats />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)} >
                    <LottieView
                        style={{ height: 100, width: 100 }}
                        colorFilters={[
                            { keypath: "#speedshape", color: colorTheme.primaryColor },
                        ]}
                        source={require('../../assets/img/dhruv/Animation - 1710793793542.json')}
                        autoPlay
                        loop />
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* The modal Code */}
                        <View style={styles.header}>
                            <Text style={styles.query}>Add Query Here</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Image source={require('../../assets/img/dhruv/delete-button.png')} style={{ height: 30, width: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: 'black', fontSize: 18 }}>Your Name</Text>
                            <TextInput
                                style={styles.input1}
                                value={inputName}
                                onChangeText={handleNameChange}
                            />
                            <Text style={{ color: 'black', fontSize: 18 }}>Describe Your Query</Text>
                            <TextInput
                                style={styles.input2}
                                value={inputDescription}
                                onChangeText={handleDescriptionChange}
                            />
                            <TouchableOpacity style={styles.submit}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Screen1;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    button: {
        backgroundColor: 'white',
        height: 56,
        width: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset (horizontal and vertical)
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 10, // For Android
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: 500,
        width: 350,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        shadowColor: 'black',
        elevation: 10,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        paddingBottom: 20
    },
    query: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black'
    },
    input1: {
        height: 40,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        color: 'black',
        paddingHorizontal: 20
    },
    input2: {
        height: 120,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        color: 'black',
        paddingHorizontal: 20
    },
    submit: {
        backgroundColor: '#008DDA',
        height: 40,
        width: "70%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 20,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset (horizontal and vertical)
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 10, // For Android
    }
});