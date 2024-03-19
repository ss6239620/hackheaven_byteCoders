import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
import { colorTheme } from '../constant';
import { uploadServices } from '../services/UploadServices';

export default function ImagesUpload() {
  const [videoData, setVideoData] = useState([]);
  const [pausedStates, setPausedStates] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    uploadServices.fetchVideos().then(res => {
      setVideoData(res.data);
      setPausedStates(new Array(res.data.length).fill(true)); // Initialize all videos as paused
    });
  }, []);

  const onDocumentPress = async () => {
    try {
      let urlOfS = 'http://localhost:8000/video';
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
            let fileName = responseInJs.fileName;
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
    }
  };

  const togglePlayPause = (index) => {
    const newPausedStates = [...pausedStates];
    newPausedStates[index] = !newPausedStates[index];
    setPausedStates(newPausedStates);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={onDocumentPress}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 25,
          backgroundColor: colorTheme.primaryColor,
          borderRadius: 50,
          zIndex: 10,
        }}>
        <MaterialIcons name="add" size={25} color={'black'} style={{ padding: 20 }} />
      </TouchableOpacity>
      <ScrollView>
        {/* <View style={[styles.video,{backgroundColor:'black',flex:1,justifyContent:'center',alignItems:'center'}]}>
        <MaterialIcons name="pause" size={40} color={'white'} style={{ padding: 20 }} />
        </View> */}
        {videoData.map((data, index) => (
          <TouchableOpacity key={index} onPress={() => togglePlayPause(index)}>
            <View style={{ marginTop: 10 }}>
              {pausedStates[index] ?
                <View style={[styles.video, { backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                  <MaterialIcons name="play-arrow" size={50} color={'white'} style={{ padding: 20 }} />
                </View>
                :
                <Video
                  ref={(ref) => (videoRefs.current[index] = ref)}
                  source={{ uri: `http://localhost:8000/fileAt/${data.meta_data.filename}` }}
                  style={styles.video}
                  repeat={true}
                  resizeMode="cover"
                  paused={pausedStates[index]}
                />
              }
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 200,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
