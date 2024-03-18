import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import RNFS from 'react-native-fs';

export default function App() {
    const [files, setFiles] = useState([]);
    const [fileData, setFileData] = useState();
    const readFile = async (path) => {
        const response = await RNFS.readFile(path);
        setFileData(response); //set the value of response to the fileData Hook.
      };
    const getFileContent = async (path) => {
        const reader = await RNFS.readDir(path);
        setFiles(reader);
    };
    useEffect(() => {
        // makeFile(filePath, fileContent);
        // getFileContent(RNFS.DocumentDirectoryPath); //run the function on the first render.
        readFile(filePath);
    }, []);
    //this component will render our list item to the UI
    const Item = ({ name, isFile }) => {
        return (
            <View>
                <Text >Name: {name}</Text>
                <Text> {isFile ? "It is a file" : "It's a folder"}</Text>
            </View>
        );
    };
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Text >{index}</Text>
                {/* The isFile method indicates whether the scanned content is a file or a folder*/}
                <Item name={item.name} isFile={item.isFile()} />
            </View>
        );
    };
    const folderPath = RNFS.DocumentDirectoryPath + "/ProjectManagement";

    const filePath = RNFS.DocumentDirectoryPath + "/ProjectManagement/joke.txt"; //absolute path of our file
    const fileContent = "Why do programmers wear glasses? \n They can't C#!";

    const makeFile = async (filePath, content) => {
        try {
          //create a file at filePath. Write the content data to it
          await RNFS.writeFile(filePath, content, "utf8");
          console.log("written to file");
        } catch (error) { //if the function throws an error, log it out.
          console.log(error);
        }
      };

    const makeDirectory = async (folderPath) => {
        await RNFS.mkdir(folderPath); //create a new folder on folderPath
    };

    useEffect(() => {
        makeDirectory(folderPath); //execute this function on first mount
        getFileContent(RNFS.DocumentDirectoryPath); //this function was defined in the previous example
    }, []);
    return (
        <SafeAreaView>
        {/* Display the value*/}
        <Text>{fileData}</Text>
      </SafeAreaView>
    );
}