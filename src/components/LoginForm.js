import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import firebase from "firebase";
import { Card, CardSection, Button, Input, Spinner } from "./common";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.loginSuccess.bind(this))
      .catch(error => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.loginSuccess.bind(this))
          .catch(error => {
            this.setState({ error: error.message, loading: false });
          });
      });
  }

  
  loginSuccess() {
    this.setState({
         email: '',
         password: '',
         loading: false,
         error: ''
    })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    const { errorTextStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            label="Email"
            placeholder="user@gmail.com"
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry={true}
            value={this.state.password}
            label="Password"
            onChangeText={password => this.setState({ password })}
            placeholder="password"
          />
        </CardSection>
        <Text style={errorTextStyle}>{this.state.error}</Text>
        <CardSection>
            {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    color: "red",
    alignSelf: "center"
  }
});

export default LoginForm;
