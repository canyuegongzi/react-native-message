import {Actions, Scene, Router, Modal, Stack} from 'react-native-router-flux'

import React, {Component} from 'react';
import MessageDetailIndex from "../views/Message/pages/messageDetail";
import Main from '../main'
import SecondPageTopBar from "../common/secondPageTopBar"
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import FeedbackPage from "../views/Message/pages/feedbackPage";
import AboutPage from "../views/Message/pages/aboutPage";
import BookPage from "../views/Apply/pages/bookPage";
import CrossTalkPage from "../views/Apply/pages/crossTalkPage";
import LivePage from "../views/Apply/pages/livePage";
import MoviePage from "../views/Apply/pages/moviePage";
import MusicPage from "../views/Apply/pages/musicPage";
import NewsPage from "../views/Apply/pages/newsPage";
import LinkUser from "../views/LinkUser/linkUser";
import UserMarket from "../views/LinkUser/userMarket";
import SearchPage from "../views/Slide/page/searchPage";
import LiveVideoPlayer from "../views/Apply/pages/liveVideoPlayerPage";
import VideoPlayScreen from "../views/Apply/pages/video";

const modalTransition = () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
})
const modalTransitionBottomTop = () => ({
    screenInterpolator: StackViewStyleInterpolator.forVertical,
})
const scenes = Actions.create(
    <Stack hideNavBar key="mainPage">
        <Modal key="root" transitionConfig={modalTransition}>
            <Scene key="main" component={Main} title="main" hideNavBar={true} initial={true}/>
            <Scene key="MessageDetailIndex" navBar={SecondPageTopBar} component={MessageDetailIndex}
                   title="MessageDetailIndex"/>
            <Scene key="feedBackPage" navBar={SecondPageTopBar} component={FeedbackPage} title="feedBackPage"/>
            <Scene key="aboutPage" navBar={SecondPageTopBar} component={AboutPage} title="aboutPage"/>
            <Scene key="crossTalkPage" navBar={SecondPageTopBar} component={CrossTalkPage} title="crossTalkPage"/>
            <Scene key="livePage" navBar={SecondPageTopBar} component={LivePage} title="livePage"/>
            <Scene key="moviePage" navBar={SecondPageTopBar} component={MoviePage} title="moviePage"/>
            <Scene key="musicPage" navBar={SecondPageTopBar} component={MusicPage} title="musicPage"/>
            <Scene key="newsPage" navBar={SecondPageTopBar} component={NewsPage} title="newsPage"/>
            <Scene key="bookPage" navBar={SecondPageTopBar} component={BookPage} title="bookPage"/>
            <Scene key="linkUser" navBar={SecondPageTopBar} component={LinkUser} title="linkUser"/>
            <Scene key="userMarket" navBar={SecondPageTopBar} component={UserMarket} title="userMarket"/>
            <Scene key="searchPage" modal={false} navBar={SecondPageTopBar}  component={SearchPage} title="searchPage"/>
            <Scene key="liveVideoPlayer" modal={false} hideNavBar  component={LiveVideoPlayer} title="liveVideoPlayer"/>
           {/*<Scene key="videoPlayScreen" modal={false} hideNavBar  component={VideoPlayScreen} title="videoPlayScreen"/>*/}
        </Modal>
    </Stack>
)
export default scenes;


export const animationStyle = (props) => {
    const {layout, position, scene} = props;

    const direction = (scene.navigationState && scene.navigationState.direction) ?
        scene.navigationState.direction : 'horizontal';

    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const height = layout.initHeight;

    const opacity = position.interpolate({
        inputRange,
        //default: outputRange: [1, 1, 0.3],
        outputRange: [1, 1, 0.5],
    });

    const scale = position.interpolate({
        inputRange,
        //default: outputRange: [1, 1, 0.95],
        outputRange: [1, 1, 1],
    });

    let translateX = 0;
    let translateY = 0;

    switch (direction) {
        case 'horizontal':
            translateX = position.interpolate({
                inputRange,
                //default: outputRange: [width, 0, -10],
                outputRange: [width, 0, 0],
            });
            break;
        case 'vertical':
            translateY = position.interpolate({
                inputRange,
                //default: outputRange: [height, 0, -10],
                outputRange: [height, 0, 0],
            });
            break;
    }

    return {
        opacity,
        transform: [
            {scale},
            {translateX},
            {translateY},
        ],
    };
};
