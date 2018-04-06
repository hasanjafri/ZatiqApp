import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import CustomMultiPicker from '../../../components/Suggestion';
import categoryList from '../../../data/categoryList';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';
import colors from '../../../styles/colors.style';

class SecondPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cuisines: [],
            price: '$',
            menu: {
                1: null,
                2: null,
                3: null,
                4: null
            }
        };
    }
    uploadMenu = (menuPage) => {

    }
    _renderPriceButton = price => {
        return (
            <View key={price} style={styles.priceButtonContainer}>
                <Button title={price}
                    titleStyle={textStyles.mediumBold}
                    clear
                    buttonStyle={[styles.priceButton, this.state.price === price ? { backgroundColor: colors.blue} : {}]}
                    onPress={() => this.setState({ price })} />
            </View>
        )
    }
    _renderUploadButton = menuPage => {
        const { menu } = this.state;
        return (
            <View key={menuPage} style={styles.uploadButtonContainer}>
                <Button title='Upload'
                    titleStyle={[textStyles.medium, { height: 50 }]}
                    buttonStyle={styles.uploadButton}
                    onPress={() => uploadMenu(menuPage)}/>
                <Text style={[textStyles.tiny, {color: 'black', paddingLeft: 10, marginTop: 20 }]}>Page {menuPage}</Text>
            </View>
        );
    }
    render() {
        const { cuisines } = this.state;
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>CUISINES</Text>
                <CustomMultiPicker
                    options={categoryList}
                    search
                    multiple
                    placeholder={'Start by typing the type of food you serve...'}
                    placeholderTextColor={'#757575'}
                    returnValue={'label'}
                    callback={(res) => { this.setState({ cuisines: res }) }}
                    rowBackgroundColor={'#eee'}
                    rowHeight={40}
                    rowRadius={5}
                    iconColor={'#00a2dd'}
                    iconSize={30}
                    selectedIconName={'ios-checkmark-circle-outline'}
                    scrollViewHeight={140}
                    // selected={[1,2]}
                    />
                <Text style={[textStyles.tiny, styles.headerText, { marginTop: 20}]}>PRICE RANGE</Text>
                <View style={styles.priceButtonWrapper}>
                    { this._renderPriceButton('$') }
                    { this._renderPriceButton('$$') }
                    { this._renderPriceButton('$$$') }
                </View>

                <Text style={[textStyles.large, { color: 'black', textAlign: 'left', marginVertical: 20 }]}>Upload Menu</Text>
                <View style={styles.uploadButtonsContainer}>
                    { Object.keys(this.state.menu).map(key => {
                        return this._renderUploadButton(key)
                    })}
                </View>
            </ScrollView>
        );
    }
}

export default SecondPage;