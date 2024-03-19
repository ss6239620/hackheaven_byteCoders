import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Header from '../../components/Header';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { colorTheme,blackText,blueText,grayText } from '../../constant';
import Screen1 from './AllQueries';
import Screen2 from './UserQueries';

export default function Query() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Completed' },
    ]);


    const renderScene = SceneMap({
        first:  Screen1,
        second: Screen2,
    });
    return (
        <View style={styles.container}>
            <View style={styles.subContainer} >
                <Header header={"Queries"} leftIconName={"chevron-back"} rightIconName={"search-outline"} />
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