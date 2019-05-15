/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View, StatusBar, AppState,
    BackHandler, ToastAndroid
} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/app/appStore';
import scenes, {animationStyle} from "./src/route/route"
import {Router, Modal, Actions} from "react-native-router-flux";
import SplashScreen from 'react-native-splash-screen'

let lastTime = 0
type Props = {};
export default class App extends Component<Props> {
    componentDidMount() {
        if (Platform.OS === 'android') BackHandler.addEventListener('hardwareBackPress', this._onBackPressed);
        SplashScreen.hide();
        //AppState.addEventListener('change', this._onAppStateChanged);
    }
    //组件卸载之前移除监听
    componentWillUnmount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this._onBackPressed);
        //AppState.removeEventListener('change', this._onAppStateChanged);
    }
    //
    _onBackPressed() {
        let time = Date.now()
        if (Actions.currentScene != 'main') {
            Actions.pop()
            return true
        } else {
            if (time - lastTime <= 2000) {
                BackHandler.exitApp()
                return false
            } else {
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
                lastTime = time
                return true
            }
        }
    }
    popRouter() {
        if (Actions.currentScene != 'main') {
            Actions.pop()
        }
    }
    render() {
        return (
            <Provider store={store}>
                <StatusBar hidden={true}/>
                <Router scenes={scenes}>
                </Router>
            </Provider>
        );
    }
}
