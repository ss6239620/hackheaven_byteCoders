import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SocketIoClient from 'socket.io-client';
import RNFS from 'react-native-fs';

const colorTheme = {
    primaryColor: 'blue',
    borderColor: 'gray'
};

export default function Message() {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);
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
                const [msg, time] = line.split('*');
                return { msg, time };
            });
            setMessage(messages);
        } catch (error) {
            console.error('Error reading file: ', error);
        }
    };

    useEffect(() => {
        const socket = SocketIoClient('https://healthcare-3o61.onrender.com/');
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        socket.on('chat-message', (msg) => {
            setMessage(prevMessages => [...prevMessages, msg]);
            const formattedMsg = `${msg.msg}*${msg.time}\n`; // Format message with '*'
            appendToFile(filePath, formattedMsg);
        });
        readFile(filePath); // Read file when component mounts
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = async () => {
        const currentTime = new Date().toLocaleTimeString();
        const newMessage = { msg: input, time: currentTime };
        setMessage([...message, newMessage]);
        const formattedMsg = `${input}*${currentTime}\n`; // Format message with '*'
        appendToFile(filePath, formattedMsg);
        setInput('');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <Text style={styles.bigText}>Today</Text>
                {message.map((data, index) => (
                    <View key={index} style={{ marginVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{data.msg}</Text>
                        <Text>{data.time}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.textInput}>
                <MaterialIcons name="mic" color={colorTheme.primaryColor} size={25} onPress={() => deleteFile(filePath)} />
                <TextInput
                    placeholder="Type Message here.."
                    onChangeText={setInput}
                    value={input}
                    style={{ flex: 1, marginLeft: 5 }}
                    multiline
                />
                <MaterialIcons
                    name="send"
                    color={colorTheme.primaryColor}
                    size={25}
                    style={{ marginRight: 5 }}
                    onPress={sendMessage}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        padding: 10,
    },
    bigText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colorTheme.borderColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});
