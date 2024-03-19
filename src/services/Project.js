import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constant";
import { navigate } from "./navRef";

async function AddProject(projectName, projecttype, team, projectidea, projectfeatures, projectdescription, projectgoals, projectoutcomes, projectfundedby, projectstack, totalmilestones, milestone, deadlineofproject, githubrepo) {
    console.log('in profile',);
    const token = await AsyncStorage.getItem("userToken");
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmOTBmODIyMDVkZmZjMDU3OTk2ZDRiIn0sImlhdCI6MTcxMDgyMTI2OX0.0fu5wob2AxCSeR4f-LWbNErNy8alt74fgMmLXT6nGjo'
    const body = {
        projectname: projectName,
        projecttype: projecttype,
        team: 'soham:backend dev, sharvesh:frontend, dhrub:UIUX, siddhesh:UIUX',
        projectidea: projectidea,
        projectfeatures: 'vediocall, chat, real time data',
        projectdescription: projectdescription,
        projectgoals: projectgoals,
        projectoutcomes: projectoutcomes,
        isprojectfunded: 'yes',
        projectfundedby: projectfundedby,
        projectstack: projectstack,
        totalmilestones: '4',
        milestone: milestone,
        deadlineofproject: 'chatcomplete:18-05-2024, vediocallcomplete:20-05-2024, deployment:22-05-2024',
        githubrepo: githubrepo
    }
    console.log(body);
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    console.log(body);
    return new Promise((resolve, reject) => {
        console.log(token);
        axios.post(`${API_URL}/project/addproject`, body, config
        ).then(async (response) => {
            try {
                // await setAuthAsyncStorage(response)
                console.log(response.data);
                navigate('BottomTab')
                resolve(response)
                // navigate('Olddisease')
            } catch (err) {
                console.log('err', err.data);
                reject(e)
            }
        }).catch((err) => {
            console.log('err', err.response.data);
            reject(err)
        })
    })
}

async function FetchAllUserProject() {
    console.log('here');
    const token = await AsyncStorage.getItem("userToken");

    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(
            `${API_URL}/project/getmyproject`,config
        ).then(async (response) => {
            try {
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            console.log(err.response.data);
            reject(err)
        })
    })
}


export const projectServices = {
    AddProject, FetchAllUserProject
}