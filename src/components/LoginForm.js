import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, StyleSheet } from './common'

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    onButtonPress() {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(error => {
                 this.setState({ error: error.message})
            })
        })
    }

    render() {
        const { errorTextStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <Input 
                    value={this.state.email}
                    onChangeText={email => this.setState( { email } )}
                    label="Email" 
                    placeholder="user@gmail.com"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntry={true}
                        value={this.state.password}
                        label="Password"
                        onChangeText={password => this.setState( { password } )}
                        placeholder="password"
                        />
                </CardSection>
                <Text style={errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'

    }
})

export default LoginForm;