import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { blueText, blackText, grayText, colorTheme } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SocketIoClient from 'socket.io-client'
import RNFS from 'react-native-fs';

const userData = [
    {
        id: 1,
        name: "Carla Schoen",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:04"
    },
    {
        id: 0,
        name: "Sharvesh Singh",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:05"
    },
    {
        id: 1,
        name: "Carla Schoen",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:06"
    },
    {
        id: 0,
        name: "Sharvesh Singh",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:07"
    },
    {
        id: 1,
        name: "Carla Schoen",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:06"
    },
    {
        id: 0,
        name: "Sharvesh Singh",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:07"
    }, {
        id: 1,
        name: "Carla Schoen",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:06"
    },
    {
        id: 0,
        name: "Sharvesh Singh",
        message: "Lorem ipsum dolor, sit amet consectetur adipisicingsit amet consectetur",
        time: "08:07"
    },
]

const test = ['hhsh', 'shhshsh', "sshhs"]

function HeaderComponent(params) {
    return (
        <View style={{ flexDirection: "row", width: "100%" }}>
            <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={styles.image} />
            <View style={{ justifyContent: "center" }}>
                <Text style={[styles.bigText, { color: "white" }]}>Carla Schoen</Text>
                <Text style={{ color: "white", fontSize: 13 }}>online</Text>
            </View>
        </View>
    )
}



function MessageBox({ data, isUser }) {
    return (
        <View style={[styles.subContainer, { marginTop: 15 }]}>
            <View style={{ width: "85%", alignSelf: isUser ? "flex-end" : null }}>
                <View style={{ backgroundColor: isUser ? colorTheme.primaryColor : "white", elevation: 2, marginBottom: 2, borderRadius: 10, flexWrap: 'wrap' }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: isUser ? "white" : "black" }}>
                            {data}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={[styles.image, { width: 25, height: 25, marginRight: 5 }]} />
                        <Text>{data}</Text>
                    </View>
                    <Text>{data.time} Pm</Text>
                </View>
            </View>
        </View >
    )
}


export default function Message() {
    const [input, setInput] = useState('')
    const [message, setMessage] = useState([])
    const [fileWrite, setFileWrite] = useState([])
    const [fileData, setFileData] = useState([]);
    const socket = useRef()

    const filePath = RNFS.DocumentDirectoryPath + "/Message.json"; //absolute path of our file╕

    const makeFile = async (filePath, content) => {
        try {
            //create a file at filePath. Write the content data to it
            await RNFS.writeFile(filePath, content, "utf8");
            console.log("written to file");
        } catch (error) { //if the function throws an error, log it out.
            console.log(error);
        }
    };

    const readFile = async (path) => {
        const response = await RNFS.readFile(path);
        setFileWrite(response)
        // setFileData(JSON.parse(response)); //set the value of response to the fileData Hook.
    };


    useEffect(() => {
        // makeFile(filePath, JSON.stringify(userData))
        readFile(filePath)
    }, []);

    useEffect(() => {
        socket.current = SocketIoClient('https://healthcare-3o61.onrender.com/')
        socket.current.on('connect', () => {
            console.log('connected to server');
        })
        socket.current.on('disconnect', () => {
            console.log('Disconnected from server');
        })
        socket.current.on('chat-message', (msg) => {
            setMessage((prevMessage) => [
                ...prevMessage,
                msg
            ])
        })
    }, [])

    function createUserData(userData) {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const data = {
            id: "1",
            name: 'Sharvesh Singh',
            msg: `${userData}`,
            time: `${currentTime}`
        }
        return JSON.stringify(data)
    }

    function appendWriteMsg(msg) {
        setFileWrite((prevmsg) => [
            ...prevmsg,
            msg
        ])
    }

    const deleteFile = async (path) => {
        try {
          await RNFS.unlink(path); //delete the item present at 'path'
          console.log("file deleted");
        } catch (error) {
          console.log(error);
        }
      };

    const sendMessage = () => {
        socket.current.emit('chat-message', input)
        const jsonMsgData = createUserData(input)
        appendWriteMsg(jsonMsgData)
        makeFile(filePath,fileWrite)
        setInput('')
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <Header children={HeaderComponent} leftIconName={true} titleMargin={60} textColor={"white"} marginTop={20} rightIconName={"ellipsis-vertical"} />
            </ScrollView>
            <View style={{
                width: "100%",
                height: "85%",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                elevation: 1,
                backgroundColor: 'white',
                paddingBottom: 60,
                paddingTop: 15
            }}>
                <ScrollView>
                    <Text style={[styles.bigText, { margin: 10, textAlign: "center", color: grayText.color, }]}>Today</Text>
                    {
                        message.map((data, index) => {
                            return (
                                <View key={index}>
                                    <MessageBox data={data} />
                                </View>
                            )
                        })}
                    <Text>{fileWrite}</Text>
                </ScrollView>
                <View style={styles.textInput}>
                    <MaterialIcons name="mic" color={colorTheme.primaryColor} size={25} />
                    <TextInput
                        placeholder='Type Message here..'
                        onChangeText={setInput}
                        value={input}
                        style={{ width: "80%" }}
                        multiline
                    />
                    <MaterialIcons name="send" color={colorTheme.primaryColor} size={25} style={{ marginRight: 5 }} onPress={sendMessage} />
                </View>
                <Text>{fileWrite}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.primaryColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
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
        padding: 0,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        marginRight: 10,
        backgroundColor: "white"
    },
})
