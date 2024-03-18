import { View, Text, Button } from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker';

export default function DocumentUpload() {
    const onDocumentPress = async () => {
        try {
            let urlOfS = 'http://localhost:8000/fileupload'; // your url
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(res);
            if (res.size < 50000000) {
                let data = new FormData();
                data.append('file', res);
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
    <View>
        <Button title="select document" onPress={() => onDocumentPress()} />
    </View>
)
}