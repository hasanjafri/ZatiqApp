import React from 'react';
import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { SocialIcon, Input, Icon, Button } from 'react-native-elements';
import styles from '../../styles/screens/business/BuisnessSignUpScreen.style';
import colors from '../../styles/colors.style';

class BusinessSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessName: '',
            businessEmail: '',
            businessPassword: ''
        }
    }

    businessRegister = async () => {
        //fetch('http://review-testserver.smk8prhzy8.us-west-2.elasticbeanstalk.com/businesses/', {
        try {
            const response = await fetch('http://192.168.2.13:3000/businesses/register', {
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
            });
            const res = await response.json();

            if (res.success === true) {
                alert(res.message);
            } else {
                alert(res.message);
            }
        } catch(e) {
            console.log(e);
            // TODO: error handling
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapper}>
                <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                    <ImageBackground style={styles.container} source={require('../../assets/backgrounds/businessBackground.png')}>

                        <TouchableOpacity style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 200,
                            height: 200,
                            marginBottom: 40 }} >
                            <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }} source={require('../../assets/backgrounds/backgroundCircle.png')}>
                                <Image style={{ width: 150, height: '100%', resizeMode: 'contain' }} source={require('../../assets/logos/businessLogo.png')} />
                                <View style={{ position:'absolute', right: 0, bottom: 0 }}>
                                    <Image style={{ width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center' }} source={require('../../assets/logos/plusLogo.png')} />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        <Input leftIconContainerStyle={styles.iconContainer} inputContainerStyle={styles.inputContainer} containerStyle={styles.textInput} placeholder='Business Name' leftIcon={<Icon type='font-awesome' name='user-circle-o' size={25} color='white' />} onChangeText={(businessEmail) => this.setState({businessEmail})}/>
                        <Input leftIconContainerStyle={styles.iconContainer} inputContainerStyle={styles.inputContainer} containerStyle={styles.textInput} placeholder='E-mail' leftIcon={<Icon type='font-awesome' name='user-circle-o' size={25} color='white' />} onChangeText={(businessName) => this.setState({businessName})} />
                        <Input leftIconContainerStyle={styles.iconContainer} inputContainerStyle={styles.inputContainer} containerStyle={styles.textInput} placeholder='Password' leftIcon={<Icon type='font-awesome' name='lock' size={25} color='white' secureTextEntry />} onChangeText={(businessPassword) => this.setState({businessPassword})} />

                        <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: 'white', paddingBottom: 15 }}>Terms and Conditions</Text>
                        </TouchableHighlight>

                        <Button title="Next"
                            titleStyle={{ textAlign: 'center', fontFamily: 'nunito', color: 'white' }}
                            buttonStyle={{
                                backgroundColor: colors.primary,
                                width: 300,
                                height: 50,
                                borderRadius: 25,
                                borderColor: 'transparent',
                                borderWidth: 0
                            }}
                            clear
                            onPress={() => this.props.navigation.navigate('BusinessProfile')} />
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: 'white', marginVertical: 15 }}>Already registered? Login here!</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: 'white' }}>Not a business?</Text>
                        </TouchableHighlight>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default BusinessSignUpScreen;