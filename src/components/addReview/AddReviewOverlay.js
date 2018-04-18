import React from 'react';
import { Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button, Avatar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { ImagePicker } from 'expo';

import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/business/Pages.style';
import colors from '../../styles/colors.style';

class AddReviewOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            rating: 3,
            picture: null
        };
    }
    onSearch(text) {
        console.log(text);
    }
    uploadPicture = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({ picture: {
                image_aspect_ratio: result.width / result.height,
                base64: result.base64
            }});
        }
    }
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        const image = this.state.picture ? `data:image/png;base64,${this.state.picture.base64}` : null;
        return (
            <Overlay isVisible={this.props.showOverlay}
                width={width - 20}
                height={height - 100}
                containerStyle={{ padding: 0 }}
                overlayStyle={styles.overlayContainer}>
                <View style={styles.header}>
                    <Text style={[textStyles.large, {color: 'black', fontWeight: 'normal', textAlign: 'left' }]}>Leave A Review</Text>
                    <Icon size={30} containerStyle={{ position: 'absolute', right: 0 }} name='clear' onPress={this.props.onClose} />
                </View>
                <ScrollView style={styles.wrapper}>
                    <Text style={[textStyles.tiny, styles.headerText]}>Picture (Optional)</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                        { image ?
                            <Avatar xlarge rounded
                                source={{ uri: image }}
                                onPress={() => this.uploadPicture()}
                                activeOpacity={0.7} /> :
                            <Avatar xlarge rounded
                                icon={{ name: 'restaurant' }}
                                onPress={() => this.uploadPicture()}
                                activeOpacity={0.7} />
                        }
                    </View>

                    <SearchBar onChangeText={this.onSearch}
                        lightTheme
                        showLoading
                        noIcon
                        containerStyle={{
                            paddingHorizontal: 0,
                            marginHorizontal: 0,
                            marginTop: 20,
                            backgroundColor: 'white',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                        }}
                        inputStyle={{
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            fontFamily: 'nunito',
                            paddingHorizontal: 10,
                            color: 'black',
                            borderColor: colors.lightergrey
                        }}
                        onClear={() => this.setState({ searchValue: '' })}
                        placeholder={'Find Restaurant'} />
                    <Text style={[textStyles.tiny, styles.headerText]}>Dish</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput style={styles.textArea} />
                    </View>

                    <Text style={[textStyles.tiny, styles.headerText]}>Review</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput multiline numberOfLines = {4} style={styles.textArea} />
                    </View>
                    
                    <Text style={[textStyles.tiny, styles.headerText]}>Rating</Text>
                    <View style={styles.centered}>
                        <StarRating maxStars={5}
                            starSize={35}
                            rating={this.state.rating}
                            selectedStar={(star) => this.setState({ rating: star })}
                            containerStyle={{ width: 150, justifyContent: 'center', alignItems: 'center' }}
                            buttonStyle={{ padding: 10 }}
                            fullStarColor={'#f1c40f'} />

                        <Button title='Submit'
                            loading={this.state.isLoading}
                            titleStyle={[textStyles.medium, { height: 50 }]}
                            buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                            loading={this.state.isLoading}
                            onPress={() => this.submit()} />
                    </View>
                </ScrollView>
            </Overlay>
        );
    }
}

export default AddReviewOverlay;