import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { blueText, blackText, grayText, colorTheme } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SocketIoClient from 'socket.io-client'
import RNFS from 'react-native-fs'

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
    // console.log(data);
    return (
        <View style={[styles.subContainer, { marginTop: 15 }]}>
            <View style={{ width: "85%", alignSelf: isUser ? "flex-end" : null }}>
                <View style={{ backgroundColor: isUser ? colorTheme.primaryColor : "white", elevation: 2, marginBottom: 2, borderRadius: 10, flexWrap: 'wrap' }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: isUser ? "white" : "black" }}>
                            {data.message}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={[styles.image, { width: 25, height: 25, marginRight: 5 }]} />
                        <Text>{data.message}</Text>
                    </View>
                    <Text>{data.time}</Text>
                </View>
            </View>
        </View >
    )
}


export default function Message() {
    const [input, setInput] = useState('')
    const [message, setMessage] = useState([])
    const socket = useRef()
    const [fileData, setFileData] = useState();
    // const [appendedMessage, setAppendedMessage] = useState(false)

    const filePath = RNFS.DocumentDirectoryPath + "/Message.txt"; //absolute path of our file


    const readFile = async (path) => {
        const response = await RNFS.readFile(path);
        setFileData(response); //set the value of response to the fileData Hook.
    };

    const appendFile = async (filePath, content) => {
        try {
            //create a file at filePath. Write the content data to it
            await RNFS.appendFile(filePath, content, "utf8");
            console.log("appended to file");
        } catch (error) { //if the function throws an error, log it out.
            console.log(error);
        }
    };

    const makeFile = async (filePath, content) => {
        try {
            //create a file at filePath. Write the content data to it
            await RNFS.writeFile(filePath, content, "utf8");
            console.log("written to file");
        } catch (error) { //if the function throws an error, log it out.
            console.log(error);
        }
    };

    const deleteFile = async (path) => {
        try {
            await RNFS.unlink(path); //delete the item present at 'path'
            console.log("file deleted");
        } catch (error) {
            console.log(error);
        }
    };

    const exsitFile = async (path) => {
        try {
            const exsist = await RNFS.exists(path); //delete the item present at 'path'
            if (!exsist) {
                makeFile(filePath, '<s><ms>hii<me><ts>8:00pm<te><e>')
            }
            readFile(filePath)
        } catch (error) {
            console.log(error);
        }
    };

    async function intializePreviousMessage() {
        try {
            const input = fileData
            const regex = /<s><ms>(.*?)<me><ts>(.*?)<te><e>/g;
            let match;
            const result = [];

            while ((match = regex.exec(input)) !== null) {
                const msg = match[1]; // Extracted message
                const time = match[2]; // Extracted time
                result.push({ message: msg, time: time });
            }

            console.log(result);
            setMessage(result)

            return result;

            // console.log(msg); // Output: ['hola', 'Hii']

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        intializePreviousMessage()
    }, [fileData])

    //extra code removed for brevity..
    useEffect(() => {
        // appendFile(filePath, 'hola');
        exsitFile(filePath)
    }, []);

    useEffect(() => {
        socket.current = SocketIoClient('http://localhost:8000/')
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



    const sendMessage = () => {
        const currentTime = new Date().toLocaleTimeString();
        const msgInput = { message: input, time: currentTime }
        socket.current.emit('chat-message', msgInput)
        const message = `<s><ms>${input}<me><ts>${currentTime}<te><e>`
        appendFile(filePath, message)
        setInput('')
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <Header children={HeaderComponent} leftIconName={true} titleMargin={60} textColor={"white"} marginTop={20} rightIconName={"ellipsis-vertical"} rightIconNavigate={'DocumentUpload'} />
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