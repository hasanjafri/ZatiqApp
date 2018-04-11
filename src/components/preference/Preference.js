import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button } from 'react-native-elements';

import textStyles from '../../styles/text.style';
import styles from '../../styles/components/AddReviewOverlay.style';
import colors from '../../styles/colors.style';

class PreferenceOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            preferences: {
                
            }
        };
    }
    render() {
        return (
            <Overlay isVisible={this.props.showOverlay} fullScreen>
                <ScrollView style={styles.wrapper}>

                </ScrollView>
            </Overlay>
        );
    }
}

export default PreferenceOverlay;