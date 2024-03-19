import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker'
import LottieView from 'lottie-react-native';
import { colorTheme } from '../../constant';
import { uploadServices } from '../../services/UploadServices';

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [skills, setSkills] = useState(['']);
    const [bio, setBio] = useState('');
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [studentPressed, setStudentPressed] = useState(false);
    const [professorPressed, setProfessorPressed] = useState(false);
    const [resume, setresume] = useState({})

    const handleUploadResume = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
            });

            setresume(res)
            // console.log('here');

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                throw err;
            }
        }
    };

    const openPdf = () => {
        if (uploadedPdf) {
            Linking.openURL(uploadedPdf.uri);
        }
    };

    const addSkillInput = () => {
        setSkills([...skills, '']);
    };

    const handleSkillChange = (text, index) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = text;
        setSkills(updatedSkills);
    };

    const removeSkillInput = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const logFullName = (text) => {
        setFullName(text);
    };

    const logDob = (text) => {
        setDob(text);
    };

    const logMobileNo = (text) => {
        setMobileNo(text);
    };

    function handleClick(params) {
        uploadServices.ProfileComplete(fullName, dob, mobileNo, bio, resume)
    }
    return (
        <View style={{ flex: 1, backgroundColor: colorTheme.appBackGroundColor }}>
            <ScrollView contentContainerStyle={{ width: '95%', alignSelf: 'center', }}>
                <View style={[styles.txt, { alignItems: 'center' }]}>
                    <LottieView
                        style={{ width: 70, height: 70, marginTop: -8, marginLeft: -10 }}
                        source={require('../../assets/json/appData/siddhesh1.json')}
                        autoPlay
                        loop
                    />
                    <Text style={styles.title}>Setup Your Profile</Text>
                </View>
                <View style={styles.all}>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons style={{ marginLeft: 8 }} name="account-details" size={25} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={fullName}
                            onChangeText={logFullName}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fontisto style={styles.icon} name="date" size={20} color="black" />
                        <TextInput
                            style={styles.date}
                            placeholder="DOB"
                            value={dob}
                            onChangeText={logDob}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Entypo style={styles.icon} name="mobile" size={25} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile no."
                            value={mobileNo}
                            onChangeText={logMobileNo}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View>
                        {skills.map((skill, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <MaterialIcons style={styles.icon} name="email" size={25} color="black" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={skill}
                                    value={skill}
                                    onChangeText={(text) => handleSkillChange(text, index)}
                                    placeholderTextColor="grey"
                                />
                                {index === skills.length - 1 && (
                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={addSkillInput}>
                                        <Ionicons style={{ marginRight: 10 }} name="add" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                                {index !== 0 && (
                                    <TouchableOpacity onPress={() => removeSkillInput(index)}>
                                        <AntDesign style={{ marginLeft: 10 }} name="close" size={20} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <TouchableOpacity style={[styles.button, studentPressed ? styles.buttonPressed : null]} onPress={() => setStudentPressed(!studentPressed)}>
                            <Text style={styles.sub}>STUDENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.pbutton, professorPressed ? styles.buttonPressed : null]} onPress={() => setProfessorPressed(!professorPressed)}>
                            <Text style={styles.prof}>PROFESSOR</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline={true}
                            maxLength={200}
                            placeholder='Short Bio/About me'
                            value={bio}
                            onChangeText={setBio}
                            placeholderTextColor="grey"
                            style={styles.bioInput}
                        />
                    </View>
                </View>
                <View >
                    <View style={styles.cv}>
                        <Text style={styles.upload}>Upload Your Resume</Text>
                        <TouchableOpacity style={styles.bg} onPress={handleUploadResume}>
                            <Ionicons style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 2 }} name="add" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: colorTheme.primaryColor, width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                    <Text style={{ color: 'white' }} onPress={() => handleClick()}>Submit</Text>
                </TouchableOpacity>
                {/* <View style={{ marginTop: 100 }} />  */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    txt: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginLeft: 10,
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: -20,

    },
    all: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        marginTop: 50,
        width: "100%"
    },
    type: {
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center'
    },
    icon: {
        marginLeft: 8,
    },
    stud: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ff2c2c'
    },
    button: {
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorTheme.primaryColor,
        borderRadius: 5,
        // paddingHorizontal:20,
        width: '40%',
        height: 40,
        textAlign: 'center',
    },
    sub: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    pbutton: {
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorTheme.primaryColor,
        borderRadius: 5,
        width: '40%',
        paddingHorizontal: 20,
        height: 40,
        textAlign: 'center',
    },
    prof: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
    },
    input: {
        color: 'black',
        marginVertical: 2,
        flex: 1,
    },
    date: {
        marginLeft: 5,
        color: 'black',
        marginVertical: 2,
        flex: 1,
    },
    bioInput: {
        color: 'black',
        marginVertical: 2,
        width: 325,
        height: 100,
        textAlignVertical: 'top',
    },
    cv: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 5,
        height: 50,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    upload: {
        marginLeft: 10,
        fontSize: 15,
        color: 'grey',
    },
    viewPdfButton: {
        backgroundColor: '#ff2c2c',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 8,
    },
    viewPdfButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bg: {
        // marginLeft: 157,
        backgroundColor: colorTheme.primaryColor,
        width: 40,
        height: 40,
        borderRadius: 10,
        marginRight: 10
    }
});

export default Profile;