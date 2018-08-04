import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, Spinner, Card, CardSection } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    loggedIn: null
  };

  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD6TSeMhT9-4lTzwNgRqA5U91dzr99gi8Y",
      authDomain: "native-auth1.firebaseapp.com",
      databaseURL: "https://native-auth1.firebaseio.com",
      projectId: "native-auth1",
      storageBucket: "native-auth1.appspot.com",
      messagingSenderId: "361257030102"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="GateKeeper" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
