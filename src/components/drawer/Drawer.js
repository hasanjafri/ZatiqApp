import React from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

// Actions
import appState from '../../appState';

import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'Home'
        }
        const changeRoute = (route, currentSelected) => {
            this.setState({ selected: currentSelected });
            this.props.navigation.navigate(route);
        }
        this.items = [
            { text: 'Home', action: () => changeRoute('Application', 'Home')},
            { text: 'Find Restaurant', action: () => changeRoute('FindRestaurant', 'Find Restaurant')},
            { text: 'Find Food', action: () => changeRoute('FindRestaurant', 'Find Food')}
        ];
        const state = appState.getInstance();
        this.user = state.getUser();
        if (this.user.type === 'business') {
            this.items.push({ section: 'BUSINESS SECTION' });
            this.items.push({ text: 'Update Profile', action: () => changeRoute('BusinessUpload', 'Update Profile')});
            this.items.push({ text: 'Upload New Content', action: () => changeRoute('BusinessUpload', 'Upload New Content')});
        }
    }
    render() {
        const drawerItems = this.items.map((item, i) => {
            let drawerItem;
            if (item.section) {
                drawerItem = (
                    <View style={styles.itemSection} key={i}>
                        <Text style={[textStyles.small, { color: colors.lightgrey }]}>{item.section}</Text>
                    </View>
                )
            } else {
                const selected = this.state.selected === item.text;
                drawerItem = (
                    <TouchableOpacity activeOpacity={1} style={styles.itemContainer} key={i} onPress={() => item.action()}>
                        <Text style={[textStyles.medium, { color: selected ? colors.primary : 'black' }]}>{item.text}</Text>
                    </TouchableOpacity>
                );
            }
            return drawerItem;
        });
        return (
            <SafeAreaView style={{ marginTop: 90, flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.locationContainer}>
                    <Text style={[textStyles.large, { color: 'black' }]}>Current Location</Text>
                    <Text style={[textStyles.medium, styles.locationText]}>Toronto, Canada</Text>
                </View>
                { drawerItems }
                <TouchableOpacity activeOpacity={1} style={styles.buttonContainer} onPress={async () => {
                        const state = appState.getInstance();
                        await state.onSignOut();
                        const { navigate } = this.props.navigation;
                        navigate('SwitchOut');
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='ios-log-out' type='ionicon'/>
                        <Text style={[textStyles.medium, { color: 'black', marginLeft: 20 }]}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    locationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 50
    },
    locationText: {
        backgroundColor: colors.primary,
        width: 200,
        height: 40,
        lineHeight: 40,
        borderRadius: 20 ,
        marginTop: 10
    },
    itemSection: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 10,
    },
    itemContainer: {
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
       paddingVertical: 10,
       borderBottomWidth: 1,
       borderBottomColor: '#EEEEEE'
    },
    buttonContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        bottom: 0
    }
});

export default Drawer;