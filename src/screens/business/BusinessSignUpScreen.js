import React from 'react';
import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { SocialIcon, Input, Icon, Button } from 'react-native-elements';
import { ImagePicker } from 'expo';

import styles from '../../styles/screens/business/BuisnessSignUpScreen.style';
import colors from '../../styles/colors.style';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            image: {
                base64: null,
                ratio: null
            },
            error: null
        };
        this.businessRegister = this.businessRegister.bind(this);
    }

    businessRegister = () => {
        // Validate
        const validate = false;
        const { email, password, repeatPassword, image } = this.state;
        let error = null;
        if (!email) {
            error = 'You need to enter an e-mail address';
        } else if (!password) {
            error = 'You need to enter a password';
        } else if (!repeatPassword) {
            error = 'You need to confirm your password';
        } else if (repeatPassword !== password) {
            error = 'Your passwords do not match';
        } else if (!image.base64) {
            error = 'You need to upload a picture';
        }
        if (!validate || !error) {
            BusinessInstance.setRegisterForm({
                email: this.state.email,
                password: this.state.password,
                image: this.state.image
            });
            this.props.navigation.navigate('BusinessProfile');
        } else {
            alert(error);
        }
    }

    uploadPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({ image: {
                base64: result.base64,
                ratio: (result.width / result.height).toString()
            }});
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const imageUrl = this.state.image.base64 ? 'data:image/png;base64,' + this.state.image.base64 : null;
        return (
            <View style={styles.wrapper}>
                <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                    <ImageBackground style={styles.container} source={require('../../assets/backgrounds/businessBackground.png')}>

                        <TouchableOpacity style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 200,
                            height: 200,
                            marginBottom: 40 }}
                            onPress={() => this.uploadPicture()}>
                            { imageUrl ?
                                <Image style={{ width: 150, height: '100%', resizeMode: 'contain', borderRadius: 75 }} source={{ uri: imageUrl }} />:
                                <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }} source={require('../../assets/backgrounds/backgroundCircle.png')}>
                                    <Image style={{ width: 150, height: '100%', resizeMode: 'contain' }} source={require('../../assets/logos/businessLogo.png')} />
                                    <View style={{ position:'absolute', right: 0, bottom: 0 }}>
                                        <Image style={{ width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center' }} source={require('../../assets/logos/plusLogo.png')} />
                                    </View>
                                </ImageBackground>
                            }
                            
                        </TouchableOpacity>

                        <Input leftIconContainerStyle={styles.iconContainer}
                            inputContainerStyle={styles.inputContainer}
                            containerStyle={styles.textInput} placeholder='Business E-mail'
                            inputStyle={{ color: 'white', fontFamily: 'nunito' }}
                            leftIcon={<Icon type='font-awesome' name='user-circle-o' size={25} color='white' />}
                            onChangeText={text => this.setState({ email: text })}/>
                        <Input leftIconContainerStyle={styles.iconContainer}
                            inputContainerStyle={styles.inputContainer}
                            containerStyle={styles.textInput}
                            inputStyle={{ color: 'white', fontFamily: 'nunito' }}
                            placeholder='Password'
                            secureTextEntry
                            leftIcon={<Icon type='font-awesome' name='lock' size={25} color='white' secureTextEntry />}
                            onChangeText={text => this.setState({ password: text })} />
                        <Input leftIconContainerStyle={styles.iconContainer}
                            inputContainerStyle={styles.inputContainer}
                            containerStyle={styles.textInput}
                            inputStyle={{ color: 'white', fontFamily: 'nunito' }}
                            placeholder='Repeat Password'
                            secureTextEntry
                            leftIcon={<Icon type='font-awesome' name='lock' size={25} color='white' secureTextEntry />}
                            onChangeText={text => this.setState({ repeatPassword: text })} />

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
                            onPress={() => this.businessRegister()} />
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