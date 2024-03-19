import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar, } from 'react-native-tab-view';
import { blackText, blueText, grayText, colorTheme } from '../../constant';
import Header from '../../components/Header';
import ImagesUpload from '../../components/ImagesUpload'
import LinkUpload from '../../components/LinkUpload'
import VideosUpload from '../../components/VideosUpload'


export default function DocumentUpload({ navigation }) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Images' },
        { key: 'second', title: 'Videos' },
        { key: 'third', title: 'Links' },
    ]);


    const renderScene = SceneMap({
        first: ImagesUpload,
        second: VideosUpload,
        third: LinkUpload,
    });

    return (
        <View style={styles.container}>
            <View style={styles.subContainer} >
                <Header header={"Resources"} leftIconName={"chevron-back"} rightIconName={"search-outline"} />
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ width: "98%", alignSelf: 'center' }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, focused }) => (
                            <Text style={[styles.bigText, { color: focused ? colorTheme.primaryColor : colorTheme.borderColor, margin: 8, fontSize: 14, }]}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: 'white' }}
                        indicatorStyle={{ borderWidth: 2, borderColor: colorTheme.primaryColor, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                        pressColor={colorTheme.borderColor}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
        // backgroundColor:"red"
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight
    },
})