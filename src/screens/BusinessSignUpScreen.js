import React from 'react';
import { TextInput, Text, StyleSheet, View, ImageBackground, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
        fontWeight: 'bold',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
        borderRadius: 10
    },
    buttons2: {
        borderRadius: 10,
        padding: 20,
        alignSelf: 'stretch'
    }
})

class BusinessSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessName: '',
            businessEmail: '',
            businessPassword: ''
        }
    }

    businessRegister = () => {
        fetch('http://review-testserver.smk8prhzy8.us-west-2.elasticbeanstalk.com/businesses/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                businessName: this.state.businessName,
                businessEmail: this.state.businessEmail,
                businessPassword: this.state.businessPassword
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.success === true) {
                alert(res.message);
            } else {
                alert(res.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapper}>
                <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                    <View style={styles.container}>
                        <Text style={styles.header}>- SIGN UP WITH ZATIQ -</Text>
                        <TextInput style={styles.textInput} placeholder="enter your business e-mail" onChangeText={(businessEmail) => this.setState({businessEmail})} underlineColorAndroid='transparent'/>
                        <TextInput style={styles.textInput} placeholder="enter your business name" onChangeText={(businessName) => this.setState({businessName})} underlineColorAndroid='transparent'/>
                        <TextInput style={styles.textInput} placeholder="enter your desired password" onChangeText={(businessPassword) => this.setState({businessPassword})} secureTextEntry underlineColorAndroid='transparent'/>
                        <TouchableOpacity style={styles.button} onPress={this.businessRegister}>
                            <Text>SIGN UP</Text>
                        </TouchableOpacity>
                        <SocialIcon title="Already registered? Login here!" button light style={styles.buttons2} onPress={() => this.props.navigation.navigate('BusinessLogin')}/>
                        <SocialIcon title="Not a business?" button light style={styles.buttons2} onPress={() => this.props.navigation.navigate('Login')}/>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default BusinessSignUpScreen;