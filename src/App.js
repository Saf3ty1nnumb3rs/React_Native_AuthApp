import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

    componentDidMount() {
        firebase.initializeApp({
                apiKey: "AIzaSyD6TSeMhT9-4lTzwNgRqA5U91dzr99gi8Y",
                authDomain: "native-auth1.firebaseapp.com",
                databaseURL: "https://native-auth1.firebaseio.com",
                projectId: "native-auth1",
                storageBucket: "native-auth1.appspot.com",
                messagingSenderId: "361257030102"
              })
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm />
            </View>
        );
    }
}

export default App;