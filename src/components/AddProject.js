import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DocumentPicker from 'react-native-document-picker'
import Octicons from 'react-native-vector-icons/Octicons'
import LottieView from 'lottie-react-native';
import { colorTheme } from '../constant'

const Details = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedOne, setSelectedOne] = useState(0);
    const [skills, setSkills] = useState(['']);
    const [idea, setIdea] = useState('');
    const [desc, setDesc] = useState('');
    const [goals, setGoals] = useState('');
    const [outcome, setOutcome] = useState('');
    const [stack, setStack] = useState('');
    const [features, setFeatures] = useState(['']);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selDocument, setDocument] = useState(null);
    const [numMilestones, setNumMilestones] = useState('');
    const [milestones, setMilestones] = useState([{ milestone: '', deadline: '' }]);
    const [showMilestones, setShowMilestones] = useState(false);

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

    const addFeatureInput = () => {
        setFeatures([...features, '']);
    };

    const handleFeatureChange = (text, index) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = text;
        setFeatures(updatedFeatures);
    };

    const removeFeatureInput = (index) => {
        const updatedFeatures = [...features];
        updatedFeatures.splice(index, 1);
        setFeatures(updatedFeatures);
    };

    const openDocumentPicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedDocument(res.uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the document picker.');
            } else {
                console.log('Error selecting file: ', err);
            }
        }
    };

    const handleAddMilestones = () => {
        const num = parseInt(numMilestones);
        if (!isNaN(num) && num > 0) {
            setShowMilestones(true);
            const newMilestones = Array.from({ length: num }, () => ({ milestone: '', deadline: '' }));
            setMilestones(newMilestones);
        }
    };

    const handleMilestoneInputChange = (text, index, field) => {
        const updatedMilestones = [...milestones];
        updatedMilestones[index][field] = text;
        setMilestones(updatedMilestones);
    };

    const Picker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocument(res.uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the document picker.');
            } else {
                console.log('Error selecting file: ', err);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colorTheme.appBackGroundColor, }}>
            <ScrollView contentContainerStyle={{ width: '95%', alignSelf: 'center' }}>
                <View style={styles.txt}>
                    <LottieView
                        style={{ width: 70, height: 70, marginTop: -12, marginLeft: -10 }}
                        source={require('../assets/json/appData/siddhesh2.json')}
                        autoPlay
                        loop
                    />
                    <Text style={styles.title}>Project Details</Text>
                </View>
                <View style={{ marginBottom: 20 }} />
                <View style={styles.all}>
                    <View style={styles.inputContainer}>
                        <FontAwesome style={{ marginLeft: 5 }} name="address-book-o" size={24} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Project Name"
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 15, marginLeft: 3, color: 'black', marginBottom: -10 }}>Project Type</Text>
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 50, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingLeft: 2, paddingRight: 2, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setSelectedTab(0) }} style={{ borderWidth: 1, borderColor: colorTheme.borderColor, width: '45%', height: '90%', backgroundColor: selectedTab == 0 ? '#407ce2' : 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: selectedTab == 0 ? '#fff' : '#000', fontSize: 18, fontWeight: 'bold' }}>Hardware</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelectedTab(1) }} style={{ borderWidth: 1, borderColor: colorTheme.borderColor, width: '45%', height: '90%', backgroundColor: selectedTab == 1 ? '#407ce2' : 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: selectedTab == 1 ? '#fff' : '#000', fontSize: 18, fontWeight: 'bold' }}>Software</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {skills.map((skill, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <AntDesign style={{ marginLeft: 5 }} name="team" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Team Member ${index + 1} & roles`}
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
                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline={true}
                            maxLength={200}
                            placeholder='Project Idea'
                            value={idea}
                            onChangeText={setIdea}
                            placeholderTextColor="grey"
                            style={styles.idInput}
                        />
                    </View>
                    <View>
                        {features.map((feature, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <MaterialCommunityIcons style={{ marginLeft: 5 }} name="feature-search" size={25} color="black" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Project Features`}
                                    value={feature}
                                    onChangeText={(text) => handleFeatureChange(text, index)}
                                    placeholderTextColor="grey"
                                />
                                {index === features.length - 1 && (
                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={addFeatureInput}>
                                        <Ionicons style={{ marginRight: 10 }} name="add" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                                {index !== 0 && (
                                    <TouchableOpacity onPress={() => removeFeatureInput(index)}>
                                        <AntDesign style={{ marginLeft: 10 }} name="close" size={20} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline={true}
                            maxLength={200}
                            placeholder='Project Description'
                            value={desc}
                            onChangeText={setDesc}
                            placeholderTextColor="grey"
                            style={styles.idInput}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline={true}
                            maxLength={200}
                            placeholder='Project Goals'
                            value={goals}
                            onChangeText={setGoals}
                            placeholderTextColor="grey"
                            style={styles.idInput}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline={true}
                            maxLength={200}
                            placeholder='Project Outcome'
                            value={outcome}
                            onChangeText={setOutcome}
                            placeholderTextColor="grey"
                            style={styles.idInput}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 15, marginLeft: 3, color: 'black', marginBottom: -10 }}>Is the Project Funded?</Text>
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 50, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingLeft: 2, paddingRight: 2, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setSelectedTab(0) }} style={{ borderWidth: 1, borderColor: colorTheme.borderColor, width: '45%', height: '90%', backgroundColor: selectedTab == 0 ? '#407ce2' : 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: selectedTab == 0 ? '#fff' : '#000', fontSize: 15, fontWeight: '500' }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelectedTab(1) }} style={{ borderWidth: 1, borderColor: colorTheme.borderColor, width: '45%', height: '90%', backgroundColor: selectedTab == 1 ? '#407ce2' : 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: selectedTab == 1 ? '#fff' : '#000', fontSize: 15, fontWeight: '500' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons style={{ marginLeft: 5, marginTop: -5 }} name="cash-refund" size={25} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="If Funded then by whom? (NA if no)"
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline={true}
                            maxLength={200}
                            placeholder='Project Stacks/Requirements'
                            value={stack}
                            onChangeText={setStack}
                            placeholderTextColor="grey"
                            style={styles.idInput}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Octicons style={{ marginLeft: 5 }} name="milestone" size={25} color="black" />
                        <TextInput
                            style={[styles.input, { marginRight: 10 }]}
                            placeholder="Enter Number of Milestones"
                            keyboardType="numeric"
                            onChangeText={(text) => setNumMilestones(text)}
                            placeholderTextColor="grey"
                        />
                        <TouchableOpacity onPress={handleAddMilestones}>
                            <Ionicons style={{ marginRight: 10 }} name="add" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {showMilestones && (
                        milestones.map((milestone, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Octicons style={{ marginRight: 5 }} name="milestone" size={20} color="black" />
                                <TextInput
                                    style={[styles.page, { flex: 1, marginRight: 10 }]}
                                    placeholder={`Milestone ${index + 1}`}
                                    value={milestone.milestone}
                                    onChangeText={(text) => handleMilestoneInputChange(text, index, 'milestone')}
                                    placeholderTextColor="grey"
                                />
                                <Fontisto style={{ marginRight: 5 }} name="date" size={24} color="black" />
                                <TextInput
                                    style={[styles.page, { flex: 1 }]}
                                    placeholder="Deadline"
                                    value={milestone.deadline}
                                    onChangeText={(text) => handleMilestoneInputChange(text, index, 'deadline')}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        ))
                    )}
                    <View style={styles.inputContainer}>
                        <Fontisto style={{ marginLeft: 5 }} name="date" size={24} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Project Deadline Eg.(07-11-2023)"
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={styles.cv}>
                        <Text style={styles.upload}>Upload Flowchart</Text>
                        <TouchableOpacity style={styles.bg} onPress={openDocumentPicker}>
                            <Ionicons style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2 }} name="add" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                    {selectedDocument && (
                        <Text style={{ marginTop: 10 }}>Selected Document: {selectedDocument}</Text>
                    )}
                    <View style={styles.cv}>
                        <Text style={styles.upload}>Upload Architecture</Text>
                        <TouchableOpacity style={styles.arch} onPress={Picker}>
                            <Ionicons style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2 }} name="add" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                    {selDocument && (
                        <Text style={{ marginTop: 10 }}>Selected Document: {selDocument}</Text>
                    )}
                    <View style={styles.inputContainer}>
                        <AntDesign style={{ marginLeft: 8 }} name="github" size={25} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Github Repository link"
                            placeholderTextColor="grey"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 100 }} />
            </ScrollView>
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    txt: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 30,
        marginLeft: 10,
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: -10
    },
    all: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
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
        marginTop: 1,
        height: 45,
        color: 'black',
        marginVertical: 2,
        flex: 1,
    },
    idInput: {
        color: 'black',
        marginVertical: 2,
        width: 325,
        height: 100,
        textAlignVertical: 'top',
    },
    uploadButton: {
        marginTop: 15,
        backgroundColor: '#407ce2',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    milestonesContainer: {
        borderWidth: 1,
        width: 375,
        backgroundColor: '#dedede',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addMilestoneButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    page: {
        backgroundColor: '#dedede',
        borderWidth: 2,
        borderColor: '#407ce2',
        borderRadius: 10
    },
    cv: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
        width: "100%",
        borderRadius: 5,
        height: 50,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    upload: {
        fontSize: 15,
        color: 'grey',
    },
    bg: {
        backgroundColor: '#407ce2',
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 10
    },
    arch: {
        backgroundColor: '#407ce2',
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 10
    }
})