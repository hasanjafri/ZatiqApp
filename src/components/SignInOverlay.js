import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Dimensions } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import Dialog from './Dialog';
import styles from '../styles/screens/LoginScreen.style';
import textStyles from '../styles/text.style';

import { closeSignInOverlay } from '../redux/actions/general.action';
import { onSignIn } from '../actions/UserAction';

class SignInOverlay extends React.Component {
    onSignIn = async (type) => {
        const result = await onSignIn(type);
        if (result.success) {
            this.props.signInCallback();
        } else {
            alert(result.message);
        }
        this.props.closeSignInOverlay();
    }
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <Dialog show={Boolean(this.props.signInCallback)}
                width={width - 20}
                height={height}
                onDismissed={this.props.closeSignInOverlay}>
                <View style={styles.mainContainer}>
                    <View style={styles.centered}>
                        <Text style={[textStyles.hugeBold, {color: '#626262', marginTop: 20, marginBottom: 10 }]}>Sorry!</Text>
                        <Text style={[textStyles.medium, {color: '#626262', marginBottom: 40 }]}>Please login to continue</Text>
                    </View>
                    <SocialIcon title="Sign in with Facebook"
                        button
                        type="facebook"
                        style={styles.signInButtons}
                        onPress={() => this.onSignIn('facebook')}/>
                    <SocialIcon title="Sign in with Google"
                        button
                        type="google-plus-official"
                        style={styles.signInButtons}
                        onPress={() => this.onSignIn('google')}/>
                </View>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    signInCallback: state.generalReducer.signInCallback
});

export default connect(mapStateToProps, { closeSignInOverlay })(SignInOverlay);