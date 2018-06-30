import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDrawerItem } from '../../redux/actions/drawer.action';

import { View, Text, Button, Image, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

// Actions
import appState from '../../appState';

import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';
const state = appState.getInstance();

class DrawerItems extends Component {
    constructor(props) {
        super(props);
        this.getDrawerItems();
    }
    componentWillReceiveProps(nextProps) {
        this.getDrawerItems();
    }
    getDrawerItems = () => {
        const changeRoute = (route, currentSelected) => {
            this.props.changeDrawerItem(currentSelected);
            this.props.navigation.navigate(route);
        }
        this.items = [
            { text: 'Home', action: () => changeRoute('Application', 'Home')},
        ];
        
        this.user = state.getUser();
        if (this.user.type === 'business') {
            this.items.push({ text: 'Find Restaurant', action: () => changeRoute('FindRestaurant', 'Find Restaurant')});
            this.items.push({ text: 'Find Food', action: () => changeRoute('FindFood', 'Find Food')});
            this.items.push({ section: 'BUSINESS SECTION' });
            this.items.push({ text: 'Update Profile', action: () => changeRoute('BusinessProfile', 'Update Profile')});
            this.items.push({ text: 'Upload New Content', action: () => changeRoute('BusinessUpload', 'Upload New Content')});
            this.items.push({ text: 'Reviews', action: () => changeRoute('Reviews', 'Reviews')});
            this.items.push({ text: 'My Restaurant', action: () => changeRoute('BusinessRestaurant', 'My Restaurant')});
        } else if (this.user.type === 'user' && this.user.data) {
            this.items.push({ text: 'Find Restaurant', action: () => changeRoute('FindRestaurant', 'Find Restaurant')});
            this.items.push({ text: 'Find Food', action: () => changeRoute('FindFood', 'Find Food')});
            this.items.push({ text: 'Reviews', action: () => changeRoute('Reviews', 'Reviews')});
        } else if (!this.user.data) {
            this.items.push({ text: 'Login', action: () => {
                changeRoute('DrawerOpen', 'Home');
            }});
        }
    }
    onLogout = async () => {
        const state = appState.getInstance();
        await state.onSignOut();
        const { navigate } = this.props.navigation;
        navigate('SwitchOut');
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
                const selected = this.props.drawerItem === item.text;
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
                    <Text style={[textStyles.medium, styles.locationText]}>Peterborough, Canada</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    { drawerItems }
                    <TouchableOpacity activeOpacity={1} style={styles.itemSection} onPress={() => this.onLogout()}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-log-out' type='ionicon'/>
                            <Text style={[textStyles.medium, { color: 'black', marginLeft: 20 }]}>{this.user.data ? 'Logout' : 'Back To Login'}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    drawerItem: state.drawerReducer.drawerItem,
});

const DrawerItemsContainer = connect(mapStateToProps, { changeDrawerItem })(DrawerItems);

class Drawer extends Component {
    state = {
        hasUserData: Boolean(state.getUser().data)
    }
    shouldComponentUpdate(nextProps) {
        return this.state.hasUserData !== Boolean(state.getUser().data);
    }
    componentWillReceiveProps() {
        this.setState({ hasUserData: Boolean(state.getUser().data) });
    }
    render() {
        return (
            <DrawerItemsContainer {...this.props} />
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