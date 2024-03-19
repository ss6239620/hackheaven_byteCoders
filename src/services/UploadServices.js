import axios from "axios"
import { API_URL_Upload, UPLOAD_SERVER } from "../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FetchImages() {
    return new Promise((resolve, reject) => {
        axios.get(
            `${API_URL_Upload}/getAllImage`
        ).then(async (response) => {
            try {
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            reject(err)
        })
    })
}

function fetchVideos() {
    return new Promise((resolve, reject) => {
        axios.get(
            `${API_URL_Upload}/getAllVideo`
        ).then(async (response) => {
            try {
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            reject(err)
        })
    })
}

async function ProfileComplete(fullName,dob,mobileNo,bio,resume) {
    console.log('in profile',fullName);
    const token = await AsyncStorage.getItem("userToken");
    const body = {
        fullname: 'fullName',
        dob: '2024-05-15',
        mobilno: 'mobileNo',
        skills: "abc, bcd, sdnk,mls,sdc",
        typeofuser: 'student',
        bio: 'bio',
        resume: resume
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    console.log(body);
    return new Promise((resolve, reject) => {
        console.log(token);
        axios.post(`${API_URL_Upload}/user/updateuserprofile`,body,config
        ).then(async (response) => {
            try {
                // await setAuthAsyncStorage(response)
                console.log(response.data);
                resolve(response)
                // navigate('Olddisease')
            } catch (err) {
                console.log(err.data);
                reject(e)
            }
        }).catch((err) => {
            console.log(err.response.data);
            reject(err)
        })
    })
}


export const uploadServices={
    FetchImages,fetchVideos,ProfileComplete
}