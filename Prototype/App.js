// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import WelcomeScreen from "./app/screens/WelcomeScreen";
// import ViewImageScreen from "./app/screens/ViewImageScreen";
//
// import AppText from './app/components/AppText';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import GeneralExample from "./app/screens/Card";

import React from 'react';

import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

import {Container, Content, ListItem} from 'native-base';

import AppFooter from "./src/components/AppFooter";
import AppHeader from "./src/components/AppHeader";
import AppCard from "./src/components/AppCard";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading/>;
        }

        return (
            <Container>
                <AppHeader title="November 7"/>
                <Content padder>
                    <ListItem itemDivider>
                        <AppCard/>
                    </ListItem>
                    <AppCard/>
                    <AppCard/>

                    <AppCard/>
                </Content>

                <AppFooter/>
            </Container>
        );
    }

}


// export default function App() {
//     return <GeneralExample/>
//
//     // return <ViewImageScreen/>
//     //return <WelcomeScreen/>;
//
//     // return <View style={styles.app}>
//     //         <AppText>React Native is neat</AppText>
//     //         <MaterialCommunityIcons name="email" size={50} color={"tomato"}/>
//     //     </View>
// }
//
// const styles = StyleSheet.create({
//     app: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     }
// });
