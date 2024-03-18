import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { blueText, blackText, grayText, colorTheme } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SocketIoClient from 'socket.io-client'
import RNFS from 'react-native-fs';

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
                            {data.msg}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={[styles.image, { width: 25, height: 25, marginRight: 5 }]} />
                        <Text>{data.name}</Text>
                    </View>
                    <Text>{data.time} Pm</Text>
                </View>
            </View>
        </View >
    )
}

export default function Message() {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);
    const socket = useRef();

    const filePath = RNFS.DocumentDirectoryPath + '/message.txt';

    const appendToFile = async (path, content) => {
        try {
            await RNFS.appendFile(path, content, 'utf8');
            console.log('Content appended to file');
        } catch (error) {
            console.error('Error appending to file: ', error);
        }
    };

    const deleteFile = async (path) => {
        try {
            await RNFS.unlink(path);
            console.log("file deleted");
        } catch (error) {
            console.log(error);
        }
    };

    const readFile = async (path) => {
        try {
            const content = await RNFS.readFile(path, 'utf8');
            console.log('File content:', content);
            // Split the content into messages
            const messages = content.trim().split('\n').map(line => {
                const [name, msg, time] = line.split('*');
                return { name, msg, time };
            });
            setMessage(messages);
        } catch (error) {
            console.error('Error reading file: ', error);
        }
    };

    useEffect(() => {
        const initializeFile = async () => {
            try {
                const fileExists = await RNFS.exists(filePath);
                if (!fileExists) {
                    await RNFS.writeFile(filePath, 'start', 'utf8');
                    console.log('File created');
                }
                await readFile(filePath); // Wait for reading file
            } catch (error) {
                console.error('Error initializing file: ', error);
            }
        };
        initializeFile();

        socket.current = SocketIoClient('https://healthcare-3o61.onrender.com/')
        socket.current.on('connect', () => {
            console.log('connected to server');
        })
        socket.current.on('disconnect', () => {
            console.log('Disconnected from server');
        })
        socket.current.on('chat-message', (msg) => {
            setMessage(prevMessages => [...prevMessages, msg]);
            const formattedMsg = `${msg.name}*${msg.msg}*${msg.time}\n`;
            socket.current.emit('chat-message', formattedMsg)
            appendToFile(filePath, formattedMsg);
        });
    }, []);


    const sendMessage = async () => {
        const currentTime = new Date().toLocaleTimeString();
        const newMessage = { name: 'YourName', msg: input, time: currentTime }; // Modify this line to include the name
        setMessage([...message, newMessage]);
        const formattedMsg = `${newMessage.name}*${newMessage.msg}*${newMessage.time}\n`; // Format message with '*'
        appendToFile(filePath, formattedMsg);
        setInput('');
    };

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
                    {/* <Text>{fileWrite}</Text> */}
                </ScrollView>
                <View style={styles.textInput}>
                    <MaterialIcons name="mic" color={colorTheme.primaryColor} size={25} onPress={() => deleteFile(filePath)} />
                    <TextInput
                        placeholder='Type Message here..'
                        onChangeText={setInput}
                        value={input}
                        style={{ width: "80%" }}
                        multiline
                    />
                    <MaterialIcons name="send" color={colorTheme.primaryColor} size={25} style={{ marginRight: 5 }} onPress={sendMessage} />
                </View>
                {/* <Text>{fileWrite}</Text> */}
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
