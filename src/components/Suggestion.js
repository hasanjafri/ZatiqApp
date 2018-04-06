import React, { Component, PropTypes } from "react";
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';

import colors from '../styles/colors.style';
import textStyles from '../styles/text.style';

import Icon from 'react-native-vector-icons/Ionicons';

export default class CustomMultiPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            selected: props.selected ? props.selected : []
        };
    }
    _onSelect = (item) => {
        let { selected } = this.state;
        if (this.props.multiple) {
            if (selected.indexOf(item) === -1) {
                selected.push(item);
            }
        } else {
            selected = selected.indexOf(item) == -1 ? [item] : [];
        }
        this.textInput.clear();
        this.setState({ selected, searchText: '' });
        this.props.callback(selected)
    }

    _onSearch = (text) => {
        this.setState({ searchText: text.length > 0 ? text.toLowerCase() : '' });
    }

    _isSelected = (item) => {
        return this.state.selected.indexOf(item) == -1 ? false : true;
    }

    filterObjectByValue = (obj, predicate) => {
        return Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})
    }

    render() {
        const { options, returnValue } = this.props;
        const list = this.state.searchText ? this.filterObjectByValue(options, option => option.toLowerCase().includes(this.state.searchText)) : options
        const labels = Object.keys(list).map(i => list[i])
        const values = Object.keys(list)
        return (
            <React.Fragment>
                { this.props.search &&
                    <View style={{ flexDirection: 'row', height: 40 }}>
                        <View style={{ marginLeft: 15, position: 'absolute', backgroundColor: 'transparent' }}>
                            <Icon style={{ lineHeight: 40 }} name="ios-search-outline" color={this.props.iconColor} size={25}/>
                        </View>
                        <TextInput ref={r => this.textInput = r}
                            style={{
                                height: 40,
                                width: '100%',
                                padding: 5,
                                paddingLeft: 50,
                                borderColor: this.props.iconColor,
                                borderWidth: 1,
                                fontFamily: 'nunito',
                                borderRadius: 20 }}
                            onChangeText={(text) => { this._onSearch(text) }}
                            clearButtonMode={'always'}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={this.props.placeholderTextColor}
                            underlineColorAndroid={'transparent'} />
                    </View>
                }
                { this.state.searchText.length > 0 ?
                    <ScrollView style={[{ maxHeight: this.props.scrollViewHeight }, this.props.scrollViewStyle]} >
                        { labels.map((label, index) => {
                            const itemKey = returnValue == "label" ? label : values[index]
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[{
                                        paddingVertical: 7,
                                        paddingHorizontal: 10,
                                        marginTop: 6,
                                        backgroundColor: this.props.rowBackgroundColor,
                                        height: this.props.rowHeight,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderRadius: this.props.rowRadius }, this.props.itemStyle ]}
                                    onPress={() => { this._onSelect(itemKey)}}>
                                    <Text style={{ fontFamily: 'nunito' }}>{label}</Text>
                                    { this._isSelected(itemKey) ?
                                        <Icon name={this.props.selectedIconName}
                                            style={[{color: this.props.iconColor, fontSize: this.props.iconSize }, this.props.selectedIconStyle]} /> :
                                        <Icon name={this.props.unselectedIconName}
                                            style={[{color: this.props.iconColor, fontSize: this.props.iconSize}, this.props.unselectedIconStyle]} />
                                    }
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView> : null }
                { this.state.selected.length > 0 ?
                    <View style={{
                        width: '100%',
                        marginTop: 10,
                        flexDirection: 'row',
                        flexWrap: 'wrap' }}>
                        { this.state.selected.map(tag => {
                            return (
                                tag ? <Text style={[textStyles.small, {
                                    backgroundColor: colors.blue,
                                    lineHeight: 30,
                                    marginVertical: 3,
                                    paddingHorizontal: 10,
                                    borderRadius: 15,
                                    marginLeft: 5
                                }]} key={tag}>{tag}</Text> : null
                            );
                        })}
                    </View> : null }
            </React.Fragment>
            );
    }
}