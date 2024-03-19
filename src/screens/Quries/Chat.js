import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Chats = () => {

    // const navigation = useNavigation()

    const answer = 'As we all know FAANG/MAANG provides good starting salary. I want to know which other companies are romanticized.'
    const question = 'Which Software Company is romanticized overly by Indian Developers'
    const ModifiedAnswer = answer.length > 80 ? answer.substring(0, 80) + '...' : answer
    const ModifiedQuestion = question.length > 70 ? question.substring(0, 70) + '...' : question
    return (
        <TouchableOpacity >
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <Image source={require('../../assets/img/dhruv/calendar.png')} style={{ height: 30, width: 30 }} />
                    <Text style={styles.name}>UserName</Text>
                    <Text style={{ color: 'gray', marginLeft: 'auto' }}>6h</Text>
                </View>
                <View style={styles.question}>
                    <Text style={{ color: 'gray', fontSize: 16, fontWeight: '700' }}>
                        {ModifiedQuestion}
                    </Text>
                    <Text style={styles.answer}>
                        {ModifiedAnswer}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <TouchableOpacity >
                            <Image source={require('../../assets/img/dhruv/like.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'black' }}>197</Text>
                    </View>
                    <View style={styles.button2}>
                        <TouchableOpacity >
                            <Image source={require('../../assets/img/dhruv/message.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'black', paddingHorizontal: 7 }}>27Comments</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity >
                            <Image source={require('../../assets/img/dhruv/calendar.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'black' }}>18-05-2024</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Chats;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        paddingHorizontal: 10,
    },
    question: {
        marginVertical: 5,
        textAlign: 'left'
    },
    answer: {
        color: 'black',
        paddingBottom: 15,
        paddingTop: 10,
        fontWeight: '500',
        textAlign: 'left'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-evenly'
    },
    button: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    button2: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
});