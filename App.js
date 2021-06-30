import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import { firebaseConfig } from './Secret';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();
export default function App() {
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
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
