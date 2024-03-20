import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import { colorTheme } from '../../constant';
import { uploadServices } from '../../services/UploadServices';

export default function ShortCaption() {
  const [imageData, setimageData] = useState([]);
  const [response, setresponse] = useState('')
  const [loading, setloading] = useState(true)

  const onDocumentPress = async () => {
    try {
      let urlOfS = 'http://localhost:8000/image'; // your url
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
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
            let analysis = await responseOfFileUpload.json();
            setresponse(analysis[0].generated_text)
            setloading(false)
            console.log('Upload Successful');
            // After successful upload, fetch images again
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
  };

  return (
    <View style={{ flex: 1,width:'95%',alignSelf:'center' }}>
      <TouchableOpacity
        onPress={onDocumentPress}
        style={{ position: 'absolute', bottom: 30, right: 25, backgroundColor: colorTheme.primaryColor, borderRadius: 50, zIndex: 10 }}>
        <MaterialIcons name="add" size={25} color={'black'} style={{ padding: 20 }} />
      </TouchableOpacity>
      {
        loading?<Text>Analysizing....</Text>:
        <Text >{response}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({});
