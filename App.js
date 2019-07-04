/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text, View, SafeAreaView,
  TouchableOpacity, Animated, Dimensions
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

const Width = Dimensions.get('window').width
const BtnAnimation = Animated.createAnimatedComponent(TouchableOpacity)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state=({
      currentTab: 1
    })
  }
  goToPage = (index) => {
    this.tabbar.goToPage(index)
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollableTabView
          ref = {ref => { this.tabbar = ref }}
          initialPage={1}
          renderTabBar={() => <CustomTab/>}
          style={{backgroundColor: 'transparent'}}
        >
          <Profile/>
          <Main/>
          <Chat/>
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}
class CustomTab extends React.PureComponent {
  constructor(props) {
    super(props)
    this.offset = new Animated.Value(0)
    this.props.scrollValue.addListener(this.updateView);
  }
  updateView = (offset) => {
    this.offset.setValue(-(offset.value - 1) * (Width/2-NAVI_BTN_SIZE))
  }
  render() {

    const {goToPage } = this.props

    return (
      <View style={[styles.header]}>
      <Animated.View style={[styles.headerAnimated, {marginLeft: this.offset}]}>
        <BtnAnimation onPress={() => goToPage(0)} style={[styles.iconLeft,
        {
          transform: [
            {scale:  this.offset.interpolate({
              inputRange: [-1 * (Width/2-NAVI_BTN_SIZE), 0, 1 * (Width/2-NAVI_BTN_SIZE)],
              outputRange: [1, 1, 1.5],
            })},
          ],
        }
        ]}/>
        <BtnAnimation onPress={() => goToPage(1)} style={[styles.iconCenter,
        {
          transform: [
            {scale:  this.offset.interpolate({
              inputRange: [-1 * (Width/2-NAVI_BTN_SIZE), 0, 1 * (Width/2-NAVI_BTN_SIZE)],
              outputRange: [1, 1.5, 1],
            })},
          ],
        }
        ]}/>
        <BtnAnimation onPress={() => goToPage(2)} style={[styles.iconRight,
        {
          transform: [
            {scale:  this.offset.interpolate({
              inputRange: [-1 * (Width/2-NAVI_BTN_SIZE), 0, 1 * (Width/2-NAVI_BTN_SIZE)],
              outputRange: [1.5, 1, 1],
            })},
          ],
        }
        ]}/>
      </Animated.View>
    </View>
    )
  }   
  
}

const Chat = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'yellow'}}/>
  )
}
const Profile = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}/>
  )
}
const Main = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}/>
  )
}
const NAVI_BTN_SIZE = 36
const styles = StyleSheet.create({
  iconLeft: {
    width: NAVI_BTN_SIZE,
    height: NAVI_BTN_SIZE,
    backgroundColor: 'lightgreen',
    borderRadius: NAVI_BTN_SIZE/2
  },
  iconCenter: {
    width: NAVI_BTN_SIZE,
    height: NAVI_BTN_SIZE,
    backgroundColor: 'pink',
    borderRadius: NAVI_BTN_SIZE/2
  },
  iconRight: {
    width: NAVI_BTN_SIZE,
    height: NAVI_BTN_SIZE,
    backgroundColor: 'lightblue',
    borderRadius: NAVI_BTN_SIZE/2
  },
  header: {
    width: Width,
    height: 70,
  },
  headerAnimated: {
    width: Width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
