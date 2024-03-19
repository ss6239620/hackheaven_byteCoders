import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TextInput, TouchableOpacity, } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import WebView from 'react-native-webview';
import { YoutubeModalData } from '../../assets/data/YoutubeData';
import { useNavigation } from '@react-navigation/native';
import { sendSmsData } from '../SendSMS';


const VideoModal = ({ modalVisible, setModalVisible }) => {
    const [id, setid] = useState('')
    const callId = Math.floor(100000 + Math.random() * 900000).toString()
    const currentDate = new Date();

    const navigation = useNavigation()



    // Get the current date in the format "DD-MM-YYYY"
    const dateString = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Get the current time in the format "h:mma"
    const timeString = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const SMSDATA = [
        {
            phone: '7718833236',
            msg: `To join the Videocall press this unique id :${callId} the agenda of the meeting is ${id} the meeting will start on ${dateString} at ${timeString}`
        },

    ]
    function handleSubmit(params) {
        sendSmsData(SMSDATA)
        setModalVisible(false)
        navigation.navigate('VideoCall', { callId: callId, date: dateString, time: timeString })
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Header leftIconName header={'Start Video'} titleMargin={40} isModal setModalVisible={setModalVisible} />
                </View>
                {/* Main Content */}
                <View style={styles.content}>
                    <View>
                        <Text>Meet Unique Id:</Text>
                        <Text>3733883</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.bigText}>Meet agenda</Text>
                        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: colorTheme.borderColor, marginTop: 10 }}>
                            <TextInput
                                placeholder='Set Agenda For meeting...'
                                onChangeText={(text) => setid(text)}
                                value={id}
                                style={{ padding: 10, height: 100 }}
                                multiline
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.bigText, { marginTop: 30 }]}>The mettting is scheduled for {dateString} at {timeString}</Text>
                    </View>
                </View>
                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => { handleSubmit() }}
                        style={{ width: '100%', backgroundColor: colorTheme.primaryColor, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', padding: 15 }}>Start a meet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.appBackGroundColor,
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        width: '90%',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    footer: {
        padding: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight
    },
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        height: 200,
        textAlignVertical: 'top',
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colorTheme.primaryColor
    },
});

export default VideoModal;
