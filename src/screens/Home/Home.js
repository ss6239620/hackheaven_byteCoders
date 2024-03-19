import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, colorTheme } from '../../constant'
import DoctorCard from '../../components/DoctorCard'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LocationModal from '../../components/Modal/LocationModal'
import FilterModal from '../../components/Modal/FilterModal'
import NotificationModal from '../../components/Modal/NotificationModal'
import Carousel from '../../components/Carousel'
import Category from '../../components/Modal/CategoryModal'
import TopDoctorModal from '../../components/Modal/TopDoctorModal'
import TopHospitalModal from '../../components/Modal/TopHospitalModal'
import AddYourTakModal from '../../components/Modal/AddTaskModal'
import SeeAllTaskModal from '../../components/Modal/SeeAllTaskModal'
import JournalModal from '../../components/Modal/JournalModal'
import { sendSmsData } from '../../components/SendSMS'
import QuoteOfTheDay from '../../components/QuoteOfTheDay'
import YoutubeVideos from '../../components/YoutubeVideos'
import { YoutubeHomeData } from '../../assets/data/YoutubeData'
import YoutubeModal from '../../components/Modal/YoutubeModal'
import BlogScreenModal from '../../components/Modal/BlogScreenModal'
import LottieView from 'lottie-react-native'
import UnderLine from '../../components/UnderLine'
import ProgressBar from '../../components/AnimatedBar'
import { projectServices } from '../../services/Project'

const data = [
  {
    name: 'Dr. Charollette Baker',
    job: "Heart Surgeon",
  },
  {
    name: 'Dr. Gautam Verma',
    job: "Heart Surgeon",
  },
  {
    name: 'Dr. Gautam Verma',
    job: "Heart Surgeon",
  },
];

const SMSDATA = [
  {
    phone: '9082222597',
    msg: "Hello there is medical pls contact me immediatlely"
  },
  {
    phone: '9869852633',
    msg: "Hello there is medical pls contact me immediatlely"
  },
]

function SendSOS(params) {
  sendSmsData(SMSDATA)

}


export default function Home({ navigation }) {

  const [peojectData, setpeojectData] = useState([])
  const [loading, setisLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModal, setFilterModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)
  const [categoryModalVisible, setcategoryModalVisible] = useState(false);
  const [topDoctorModal, setTopDoctorModal] = useState(false);
  const [topHosPitalModal, setTopHospitalModal] = useState(false);
  const [AddTaskModal, setAddTaskModal] = useState(false);
  const [supportiveContent, setSupportiveContent] = useState(false);
  const [seeAllTask, setSeeAllTask] = useState(false);
  const [journalModal, setjournalModalModal] = useState(false);
  const [blogScreenModal, setBlogScreenModal] = useState(false)
  const [ModalData, setBlogModalData] = useState({
    title: '',
    desc: '',
    img: ''
  })

  useEffect(() => {
    projectServices.FetchAllUserProject().then(res => {
      setpeojectData(res.data)
      console.log(res.data);
      setisLoading(false)
    })
  }, [])


  return (
    <View style={styles.container}>

      {/* here satrt sos  */}
      {/* <Pressable
        onPress={() => {
          SendSOS()
        }}
        style={styles.fixedComponent}>
        <View style={{ alignItems: 'center', height: 55, justifyContent: 'center' }}>
          <Text style={[styles.boldText, { color: 'white' }]}>SOS</Text>
        </View>
      </Pressable> */}
      {/* end sos  */}

      <Pressable
        onPress={() => {
          // SendSOS()
        }}
        style={styles.fixedComponent}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="robot" color={"white"} size={30} onPress={() => navigation.navigate('ChatBot')} />
        </View>
      </Pressable>
      <ScrollView contentContainerStyle={styles.subcontainer}>
        <>
          {modalVisible
            ?
            <LocationModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            : null
          }
          {notificationModal
            ?
            <NotificationModal modalVisible={notificationModal} setModalVisible={setNotificationModal} />
            : null
          }
          {
            filterModal
              ?
              <FilterModal modalVisible={filterModal} setModalVisible={setFilterModal} />
              : null
          }
          {
            categoryModalVisible
              ?
              <Category modalVisible={categoryModalVisible} setModalVisible={setcategoryModalVisible} />
              : null
          }
          {
            topDoctorModal
              ?
              <TopDoctorModal modalVisible={topDoctorModal} setModalVisible={setTopDoctorModal} />
              : null
          }
          {
            topHosPitalModal
              ?
              <TopHospitalModal modalVisible={topHosPitalModal} setModalVisible={setTopHospitalModal} />
              : null
          }
          {
            AddTaskModal
              ?
              <AddYourTakModal modalVisible={AddTaskModal} setModalVisible={setAddTaskModal} />
              : null
          }
          {
            seeAllTask
              ?
              <SeeAllTaskModal modalVisible={seeAllTask} setModalVisible={setSeeAllTask} />
              : null
          }
          {
            journalModal
              ?
              <JournalModal modalVisible={journalModal} setModalVisible={setjournalModalModal} />
              : null
          }
          {
            supportiveContent
              ?
              <YoutubeModal modalVisible={supportiveContent} setModalVisible={setSupportiveContent} />
              : null
          }
          {
            blogScreenModal
              ?
              <BlogScreenModal modalVisible={blogScreenModal} setModalVisible={setBlogScreenModal} ModalData={ModalData} />
              : null
          }
        </>
        <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Pressable
              style={{ flexDirection: "row", alignItems: 'center' }}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="location-pin" color={colorTheme.primaryColor} size={25} />
              <Text style={{ color: "black", fontSize: 15, fontWeight: "700" }}>ProjectHub</Text>
              <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={25} />
            </Pressable>
          </View>
          <View
            style={{ width: 80, height: 32, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 50, flexDirection: 'row' }}>
            <MaterialIcons name="videocam" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} onPress={() => { navigation.navigate("VideoCall") }} />
            <MaterialIcons name="notifications-active" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} onPress={() => setNotificationModal(true)} />
            <FontAwesome name="pencil-square-o" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} onPress={() => setjournalModalModal(true)} />
          </View>
        </View>
        {/* dashboard start here  */}
        <View style={{ width: '90%', backgroundColor: 'white', elevation: 4, padding: 10, marginBottom: 10, borderRadius: 10, borderTopEndRadius: 50, marginTop: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 40, backgroundColor: colorTheme.borderColor, width: 2, marginRight: 10 }} />
                <View>
                  <Text style={[styles.boldText]}>TotalTravelling</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <MaterialIcons name="directions-car-filled" color={colorTheme.primaryColor} size={25} style={{}} />
                    <Text>45 <Text>km</Text></Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <View style={{ height: 40, backgroundColor: colorTheme.borderColor, width: 2, marginRight: 10 }} />
                <View>
                  <Text style={[styles.boldText]}>TotalPooling</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <MaterialIcons name="directions-car-filled" color={colorTheme.primaryColor} size={25} style={{}} />
                    <Text>45 km</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* <View style={{ marginRight: 0, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderRadius: 50, borderRightColor: 'green',borderLeftColor:colorTheme.borderColor,borderTopColor:'green',borderBottomColor:'green' }}>
              <Text style={[styles.boldText]}>Carbon FootPrint</Text>
              <Text>Reduced</Text>
            </View> */}
            <View>
              <LottieView
                source={require('../../assets/json/bubble.json')}
                autoPlay
                loop
                style={{ width: 125, height: 125 }}
              />
              <View style={{}}>
                <Text style={[styles.boldText, {}]}>Carbon FootPrint</Text>
                <Text style={[styles.smallText, { color: 'green' }]}>144g/km</Text>
              </View>
            </View>
          </View>
          <UnderLine color={colorTheme.borderColor} thickness={2} marginTop={10} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <View>
              <Text style={[styles.boldText]}>Total Rides</Text>
              {/* <UnderLine color={colorTheme.borderColor} thickness={2} marginTop={10} /> */}
              <ProgressBar progress={0.75} />
              <Text>27 Rides</Text>
            </View>
            <View>
              <Text style={[styles.boldText]}>TotalPooling</Text>
              {/* <UnderLine color={colorTheme.borderColor} thickness={2} marginTop={10} /> */}
              <ProgressBar progress={0.75} />
              <Text>27 Rides</Text>
            </View>
            <View>
              <Text style={[styles.boldText]}>Total</Text>
              {/* <UnderLine color={colorTheme.borderColor} thickness={2} marginTop={10} /> */}
              <ProgressBar progress={0.25} />
              <Text>54 Rides</Text>
            </View>
          </View>
        </View>

        <View style={{ width: '90%', marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddProject')}

              style={{ backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.primaryColor, borderRadius: 50 }}>
              <Text numberOfLines={2} style={[styles.blueText, { paddingHorizontal: 30, paddingVertical: 10 }]}>Create Project</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
              <Text numberOfLines={2} style={[styles.blueText, { color: "white", paddingHorizontal: 30, paddingVertical: 10 }]}>View Project</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* youtube webview  */}
        {/* <View style={{ width: '90%', marginTop: 10, height: 600 }}>
          <WebView
            originWhitelist={['*']}
            source={{
              html: `
              <iframe width="560" height="315" src="https://www.youtube.com/embed/DbRXv5TXMEE?si=xbMISuEvM17MXKaP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              `,
            }}
            style={{ flex: 1 }}
            onError={(error) => console.error('WebView error:', error)}
          />
        </View> */}
        {/* youtube webview ended */}
        <View style={{ width: '90%', }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
            <Text style={[styles.grayText, { color: 'black' }]}>Your Todos...</Text>
            <Text onPress={() => { setSeeAllTask(true) }} style={[{ color: colorTheme.primaryColor, fontSize: 15 }]}>See All Tasks</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
              <Text style={[styles.smallText, { fontSize: 15, color: 'gray' }]}>TaskList for your chores!!!</Text>
              <TouchableOpacity
                onPress={() => { setAddTaskModal(true) }}
                style={{ backgroundColor: colorTheme.primaryColor, justifyContent: 'center', alignItems: 'center', borderRadius: 30, elevation: 10 }}>
                <MaterialIcons name="add" color={"white"} sizae={25} style={{ padding: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: '90%', flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={[styles.grayText, { marginBottom: 8, }]}>Top Specialist</Text>
          <Text
            onPress={() => { setTopDoctorModal(true) }}
            style={[{ color: colorTheme.primaryColor, fontSize: 15 }]}>See All</Text>
        </View>
        <Carousel data={data} autoPlay>
          <DoctorCard isNavigate />
        </Carousel>
        <View style={{}}>
          <View style={{ width: '90%', flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
            <Text style={[styles.grayText, { marginBottom: 8, }]}>Doctor Speciality</Text>
            <Text onPress={() => { setcategoryModalVisible(true) }} style={[{ color: colorTheme.primaryColor, fontSize: 15 }]}>See All</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around' }}>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="teeth-open" color={colorTheme.primaryColor} size={25} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="heartbeat" color={colorTheme.primaryColor} size={25} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="bone" color={colorTheme.primaryColor} size={25} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="brain" color={colorTheme.primaryColor} size={25} />
            </View>
          </View>
        </View>
        {loading ? <Text style={{marginBottom:20}}>loading....</Text> :
          <>
          {peojectData.length===0 &&<Text style={{marginBottom:20}}>Nothing to show</Text>}
          {peojectData.map((dat,key)=>(
            <View key={key} style={{ marginBottom: 20, width: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 2, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10 }}>
              <Text style={[styles.boldText, { position: 'absolute', top: 10, zIndex: 10, left: 10, fontSize: 20, color: 'white' }]}>{dat.projectname}</Text>
              <Image source={require('../../assets/img/card2.jpg')} style={{ width: '100%', height: 150, resizeMode: 'cover', }} />
            </View>
          ))}
          </>
        }
      </ScrollView >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colorTheme.appBackGroundColor
  },
  subcontainer: {
    alignItems: 'center',
    marginTop: 10,

  },
  textInput: {
    width: "80%",
    height: 48,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 7,
    borderWidth: 1,
    borderColor: colorTheme.borderColor,
    flexDirection: "row",
    // justifyContent:"center",
    alignItems: "center"
  },
  grayText: {
    fontSize: 17,
    fontWeight: '700',
    color: "gray"
  },
  boldText: {
    fontSize: 17,
    fontWeight: '700',
    color: "black"
  },
  smallText: {
    fontSize: 12,
    fontWeight: '500',
    color: "black"
  },
  post: {
    width: '90%',
    marginBottom: 3,
    // backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  card: {
    width: "90%",
    height: 112,
    backgroundColor: 'white',
    borderRadius: 10
  },
  image: {
    width: '40%',
    height: '100%',
    marginRight: 5
  },
  fixedComponent: {
    position: 'absolute',
    bottom: 30,
    width: 80,
    height: 80,
    backgroundColor: colorTheme.primaryColor,
    zIndex: 20,
    right: 30,
    borderRadius: 50, // half of width and height to make it circular
    opacity: 2,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  iconContainer: {
    width: 60, // Adjust the width and height of the icon container as needed
    height: 60,
    borderRadius: 30, // half of width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },

})