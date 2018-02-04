import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { Video } from 'expo';
import  Icon  from 'react-native-vector-icons';

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    SignInButtons: {
        borderRadius: 10
    }
});

const LoginScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Video source={require('/Users/hasanjafri/Documents/ZatiqApp/Zatiq.mp4')} rate={1.0} isMuted={true} resizeMode="cover" shouldPlay isLooping style={styles.backgroundVideo}/>
    <View style={{ justifyContent: 'space-between', flexDirection: 'column', margin: 20, marginBottom: 30 }}>
        <Image source={require('/Users/hasanjafri/Documents/ZatiqApp/logotransparent.gif')} style={{width: 300, height: 300}}/>
        <SocialIcon title="Sign in with Facebook" button type="facebook" style={styles.SignInButtons} onPress={() => navigation.navigate('Feeling')}/>
        <SocialIcon title="Sign in with Google" button type="google-plus-official" style={styles.SignInButtons} onPress={() => navigation.navigate('Feeling')}/>
        <SocialIcon title="Are you a business? Click Here" button light style={styles.SignInButtons} onPress={() => navigation.navigate('BusinessLogin')}/>
    </View>
  </View>
);

export default LoginScreen;