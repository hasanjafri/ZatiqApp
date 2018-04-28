import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input, Avatar, Icon } from 'react-native-elements';
import { ImagePicker } from 'expo';

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

import BusinessAction from '../../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();
import appState from '../../../appState';
const state = appState.getInstance();

class BusinessInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.state = {
            address: '',
            name: '',
            number: '',
            website: '',
            image: {
                base64: null,
                image_aspect_ratio: null
            }
        };
        this.user = state.user;
    }
    componentDidMount() {
        if (this.props.data) {
            const { address, name, number, website, image } = this.props.data;
            BusinessInstance.setRegisterForm({ address, name, number, website, image });
            this.setState({ address, name, number, website, image })
        }
    }
    onTextChange(text, stateName) {
        BusinessInstance.setRegisterForm({ [stateName]: text });
        this.setState({ [stateName]: text });
    }
    uploadPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            const picture = {
                base64: result.base64,
                image_aspect_ratio: (result.width / result.height).toString()
            };
            BusinessInstance.setRegisterForm({ image: picture });
            this.setState({ image: picture });
        }
    }
    render() {
        const imageUrl = this.state.image.base64 ? 'data:image/png;base64,' + this.state.image.base64 : null;
        return (
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={{ flex: 1 }}>
                <ScrollView style={styles.wrapper}>
                    { !this.user ? <Text style={[textStyles.medium, styles.headerText, { paddingVertical: 20 }]}>Hi, let's get to know you and your business before completing the registration!</Text> : null }
                    
                <Text style={[textStyles.small, styles.headerText]}>Business Logo</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        { imageUrl ?
                            <Avatar xlarge source={{ uri: imageUrl }}
                                onPress={() => this.uploadPicture()}
                                activeOpacity={0.7} /> :
                            <Avatar xlarge rounded
                                icon={{ name: 'restaurant' }}
                                onPress={() => this.uploadPicture()}
                                activeOpacity={0.7} />
                        }
                    </View>
                    
                    <Text style={[textStyles.small, styles.headerText]}>Business Name</Text>
                    <Input value={this.state.name}
                        containerStyle={{ width: '100%' }}
                        inputStyle={styles.input}
                        returnKeyLabel={'Next'}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.address_input.focus(); }}
                        onChangeText={text => this.onTextChange(text, 'name')}/>
                    
                    <Text style={[textStyles.small, styles.headerText]}>Address</Text>
                    <Input value={this.state.address}
                        ref={(input) => { this.address_input = input; }}
                        onSubmitEditing={() => { this.number_input.focus(); }}
                        containerStyle={{ width: '100%' }}
                        dataDetectorTypes={'address'}
                        returnKeyLabel={'Next'}
                        returnKeyType={'next'}
                        inputStyle={styles.input}
                        onChangeText={text => this.onTextChange(text, 'address')}/>

                    <Text style={[textStyles.small, styles.headerText]}>Phone Number</Text>
                    <Input value={this.state.number}
                        ref={(input) => { this.number_input = input; }}
                        onSubmitEditing={() => { this.website_input.focus(); }}
                        containerStyle={{ width: '100%' }}
                        keyboardType={'phone-pad'}
                        dataDetectorTypes={'phoneNumber'}
                        returnKeyLabel={'Next'}
                        returnKeyType={'next'}
                        inputStyle={styles.input}
                        onChangeText={text => this.onTextChange(text, 'number')}/>

                    <Text style={[textStyles.small, styles.headerText]}>Website</Text>
                    <Input value={this.state.website}
                        ref={(input) => { this.website_input = input; }}
                        containerStyle={{ width: '100%', marginBottom: 40 }}
                        inputStyle={styles.input}
                        returnKeyLabel={'Done'}
                        returnKeyType={'done'}
                        onChangeText={text => this.onTextChange(text, 'website')}/>
                    <View style={styles.centered}>
                        <Button title='Next'
                            iconRight
                            icon={<Icon type='font-awesome' name='chevron-right' color='white' size={20} />}
                            titleStyle={[textStyles.medium, { height: 50 }]}
                            buttonStyle={styles.uploadButton}
                            onPress={() => this.props.nextAction()}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessInfoPage;