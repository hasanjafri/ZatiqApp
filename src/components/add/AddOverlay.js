import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

import textStyles from '../../styles/text.style';
import styles from '../../styles/components/AddOverlay.style';
import colors from '../../styles/colors.style';

class AddOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            rating: 3
        };
    }
    onSearch(text) {
        console.log(text);
    }
    render() {
        return (
            <Overlay isVisible={this.props.showOverlay} fullScreen>
                <ScrollView style={styles.wrapper}>
                    <View style={styles.header}>
                        <Text style={[textStyles.large, {color: 'black', marginLeft: 5 }]}>Add A Review</Text>
                        <Icon size={30} containerStyle={{ position: 'absolute', right: 0, top: 25, right: 5}} name='clear' onPress={this.props.onClose} />
                    </View>
                    <SearchBar onChangeText={this.onSearch}
                            lightTheme
                            showLoading
                            onClear={() => this.setState({ searchValue: '' })}
                            placeholder='Find a restaurant...' />
                    <View style={styles.body}>
                        <Text style={[textStyles.tiny, styles.labelText]}>TITLE</Text>
                        <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                
                        <Text style={[textStyles.tiny, styles.labelText]}>REVIEW</Text>
                        <Input multiline numberOfLines={4} containerStyle={{width: '100%', height: 100}} inputStyle={styles.textArea}/>
                        
                        <Text style={[textStyles.tiny, styles.labelText]}>RATING</Text>
                        <View style={styles.centered}>
                            <StarRating maxStars={5}
                                starSize={35}
                                rating={this.state.rating}
                                selectedStar={(star) => this.setState({ rating: star })}
                                containerStyle={{ paddingVertical: 20, width: 150, justifyContent: 'center', alignItems: 'center' }}
                                buttonStyle={{ padding: 10 }}
                                fullStarColor={'#f1c40f'} />
                            <Button title='Submit'
                                titleStyle={{ textAlign: 'center', fontFamily: 'nunito' }}
                                buttonStyle={{
                                    backgroundColor: colors.primary,
                                    width: 300,
                                    height: 50,
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 25
                                }}
                                clear
                                onPress={() => this.submit}
                                containerStyle={{ marginVertical: 30, backgroundColor: 'transparent' }} />
                        </View>
                    </View>
                    {/* <Icon type='font-awesome' name='camera' raised reversed size={35} /> */}
                </ScrollView>
            </Overlay>
        );
    }
}

export default AddOverlay;