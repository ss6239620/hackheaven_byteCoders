import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import { colorTheme } from '../constant';
import { uploadServices } from '../services/UploadServices';

export default function ImagesUpload() {
  const [imageData, setimageData] = useState([]);

  useEffect(() => {
    fetchImagesData();
  }, []);

  const fetchImagesData = () => {
    uploadServices.FetchImages()
      .then(res => {
        setimageData(res.data);
      })
      .catch(error => console.error("Error fetching images:", error));
  };

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
            let responseInJs = await responseOfFileUpload.json();
            let fileName = responseInJs.fileName; // file name which will be sent from backend
            console.log('Upload Successful');
            // After successful upload, fetch images again
            fetchImagesData();
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
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={onDocumentPress}
        style={{ position: 'absolute', bottom: 30, right: 25, backgroundColor: colorTheme.primaryColor, borderRadius: 50, zIndex: 10 }}>
        <MaterialIcons name="add" size={25} color={'black'} style={{ padding: 20 }} />
      </TouchableOpacity>
      <ScrollView>
        {imageData.map((data, key) => (
          <View key={key} style={{ width: '95%', alignSelf: 'center', marginTop: 30, borderWidth: 1, borderRadius: 10, backgroundColor: 'white', borderColor: colorTheme.borderColor, elevation: 3 }}>
            <View style={{ padding: 10 }}>
              <Image source={{ uri: `http://localhost:8000/fileAt/${data.meta_data.filename}` }} style={{ width: "100%", height: 200, resizeMode: 'cover', }} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
