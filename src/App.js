
import React, {Component} from 'react'
import {
  StyleSheet, View, SafeAreaView,
  Animated, Dimensions
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'

const IconFontAwesomeAnimated = Animated.createAnimatedComponent(IconFontAwesome)
const IconIoniconsAnimated = Animated.createAnimatedComponent(IconIonicons)

const Width = Dimensions.get('window').width

export default class App extends Component {
  goToPage = (index) => {
    this.tabbar.goToPage(index)
  }
  render () {
    return (
      <SafeAreaView style={styles.container} >
        <ScrollableTabView
          ref = {ref => { this.tabbar = ref }}
          initialPage={1}
          renderTabBar={() => <CustomTab/>}
          prerenderingSiblingsNumber={1}
        >
          <Profile/>
          <Main/>
          <Chat/>
        </ScrollableTabView>
      </SafeAreaView>
    )
  }
}
class CustomTab extends React.PureComponent {
  constructor (props) {
    super(props)
    this.offset = new Animated.Value(0)
    this.props.scrollValue.addListener(this.updateView)
  }
  updateView = (offset) => {
    // offset.value | 0-1
    this.offset.setValue(-(offset.value - 1) * (Width / 2 - NAVI_BTN_SIZE))
  }

  render () {
    const {goToPage} = this.props

    // Animated btn scale
    const scaleBtnLeft = this.offset.interpolate({
      inputRange: [-1 * (Width / 2 - NAVI_BTN_SIZE), 0, 1 * (Width / 2 - NAVI_BTN_SIZE)],
      outputRange: [1, 1, 1.5]
    })
    const scaleBtnCenter = this.offset.interpolate({
      inputRange: [-1 * (Width / 2 - NAVI_BTN_SIZE), 0, 1 * (Width / 2 - NAVI_BTN_SIZE)],
      outputRange: [1, 1.5, 1]
    })
    const scaleBtnRight = this.offset.interpolate({
      inputRange: [-1 * (Width / 2 - NAVI_BTN_SIZE), 0, 1 * (Width / 2 - NAVI_BTN_SIZE)],
      outputRange: [1.5, 1, 1]
    })

    // Animated btn colors
    const colorBtnLeft = scaleBtnLeft.interpolate({
      inputRange: [1, 1.5],
      outputRange: ['#e3e5e8', '#fcca35']
    })
    const colorBtnCenter = scaleBtnCenter.interpolate({
      inputRange: [1, 1.5],
      outputRange: ['#e3e5e8', '#e35914']
    })
    const colorBtnRight = scaleBtnRight.interpolate({
      inputRange: [1, 1.5],
      outputRange: ['#e3e5e8', 'lightgreen']
    })

    return (
      <View style={[styles.header]}>
        <Animated.View style={[styles.headerAnimated, {marginLeft: this.offset}]}>
          <Animated.Text
            onPress={() => goToPage(0)}
            style={[styles.Btn, { transform: [{scale: scaleBtnLeft}] }]}
          >
            <IconFontAwesomeAnimated name='user' style={{ color: colorBtnLeft, fontSize: 25 }} />
          </Animated.Text>

          <Animated.Text
            onPress={() => goToPage(1)}
            style={[styles.Btn, { transform: [{ scale: scaleBtnCenter }] }]}
          >
            <IconIoniconsAnimated name='md-flame' style={{ color: colorBtnCenter, fontSize: 25 }} />
          </Animated.Text>

          <Animated.Text
            onPress={() => goToPage(2)}
            style={[styles.Btn, {transform: [ {scale: scaleBtnRight} ]}]}
          >
            <IconFontAwesomeAnimated name='comments' style={{ color: colorBtnRight, fontSize: 25 }} />
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}

const Profile = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fcca35'}}/>
  )
}
const Main = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#e35914'}}/>
  )
}
const Chat = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'lightgreen'}}/>
  )
}

const NAVI_BTN_SIZE = 36

const styles = StyleSheet.create({
  Btn: {
    width: NAVI_BTN_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  header: {
    width: Width,
    height: 70
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
    alignItems: 'center'
  }
})
