import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colorTheme } from '../constant'
import DocumentPicker from 'react-native-document-picker';

export default function VideosUpload() {
  const onDocumentPress = async () => {
    try {
      let urlOfS = 'http://localhost:8000/image'; // your url
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });
      console.log(res);
      if (res.size < 50000000) {
        let data = new FormData();
        data.append('file', res);
        console.log(data);
        try {
          const responseOfFileUpload = await fetch(urlOfS, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: data,
          });
          if (responseOfFileUpload.status == 200) {
            let responseInJs = await responseOfFileUpload.json();
            let fileName = responseInJs.fileName; // file name which will be        sent from backend
            console.log('Upload Succesfull');
          } else {
            console.log('Upload Failed');
          }
        } catch (err) {
          console.log('Upload Failed');
          console.log(err, 'error in upload');
        }
      } else {
        console.log('File size should not exceed 50 MB');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('No document selected');
      } else {
        throw err;
      }
    };
  }
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => onDocumentPress()}
        style={{ position: 'absolute', bottom: 30, right: 25, backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
        <MaterialIcons name="add" size={25} color={'black'} style={{ padding: 20 }} />
      </TouchableOpacity>
      <Text>VideoUpload</Text>
    </View>
  )
}

const styles = StyleSheet.create({})