import React from 'react';
import { TextInput, StyleSheet, View, ImageBackground, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    formfield: {
        width: 200,
        margin: 10,
        color: 'white'
    },
    buttons: {
        borderRadius: 10,
        padding: 15
    }
})

class BusinessSignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: ''
        }
    }

    componentDidMount() {
        this.loadInitialState().done();
    }

    loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userEmail');
        if (value !== null) {
            this.props.navigation.navigate('BusinessProfile');
        }
    }

    businessRegister = () => {
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground style={styles.container} source={require('/Users/hasanjafri/Documents/ZatiqApp/background.png')}>
                <ImageBackground style={{height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: -163}} source={require('/Users/hasanjafri/Documents/ZatiqApp/header.png')}>
                    <ImageBackground style={{height: '50%', width: '50%', marginBottom: 80, marginLeft: 88}} source={require('/Users/hasanjafri/Documents/ZatiqApp/logo.png')}/>
                </ImageBackground>
                <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                    <View style={styles.formContainer}>
                        
                    </View>
                </KeyboardAvoidingView>
                {/* <TextInput placeholder="enter business name" style={styles.formfield} onChangeText={userName => this.setState({userName})} />
                <TextInput placeholder="enter password" style={styles.formfield} onChangeText={userPassword => this.setState({userPassword})}/>
                <TextInput placeholder="enter preferred email address" style={styles.formfield} onChangeText={userEmail => this.setState({userEmail})}/>
                <Button title="Sign Up" large rounded style={styles.buttons} onPress={this.businessRegister}/>
                <Button title="Not a Business?" onPress={() => navigate('Login')} style={styles.buttons}/> */}
            </ImageBackground>
        );
    }
}

export default BusinessSignUpScreen;