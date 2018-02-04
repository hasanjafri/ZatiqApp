import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold'
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center'
    }
});

export default class BusinessLoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            businessPassword: '',
            businessEmail: ''
        }
    }

    componentDidMount() {
        this.loadInitialState().done();
    }

    loadInitialState = async () => {
        var value = await AsyncStorage.getItem('businessEmail');
        if (value !== null) {
            this.props.navigation.navigate('BusinessProfile');
        }
    }

    login = () => {
        fetch('http://192.168.2.13:3000/businesses/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                businessEmail: this.state.businessEmail,
                businessPassword: this.state.businessPassword
            })
        })
        .then((response) => response.json())
        .then((res) => {

            if (res.success === true) {
                AsyncStorage.setItem('businessName', res.business);
                this.props.navigation.navigate('BusinessProfile');
            } else {
                alert(res.message);
            }
        })
        .done();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.header}>- BUSINESS LOGIN -</Text>
                    <TextInput style={styles.textInput} placeholder="enter your business e-mail" onChangeText={(businessEmail) => this.setState({businessEmail})} underlineColorAndroid='transparent'/>
                    <TextInput style={styles.textInput} placeholder="enter your password" onChangeText={(businessPassword) => this.setState({businessPassword})} underlineColorAndroid='transparent' secureTextEntry/>
                    <TouchableOpacity style={styles.button} onPress={this.login}>
                        <Text>Log In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}