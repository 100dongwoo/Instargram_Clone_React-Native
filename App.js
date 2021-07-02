import React, { Component } from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/main/Main';
import { firebaseConfig } from './Secret';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import AddScreen from './components/main/Add';
const store = createStore(rootReducer, applyMiddleware(thunk));

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();
import Main from './components/main/Main';
import SaveScreen from './components/main/Save';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedIn: false,
                    loaded: true,
                });
            } else {
                this.setState({
                    loggedIn: true,
                    loaded: true,
                });
            }
        });
    }

    render() {
        const { loggedIn, loaded } = this.state;
        if (!loaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
            );
        }
        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen
                            name="Landing"
                            component={LandingScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" component={MainScreen} />
                        <Stack.Screen
                            name="Add"
                            component={AddScreen}
                            navigation={this.props.navigation}
                        />
                        <Stack.Screen
                            name="Save"
                            component={SaveScreen}
                            navigation={this.props.navigation}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default App;
