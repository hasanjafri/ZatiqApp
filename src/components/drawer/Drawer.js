import React from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

// Actions
import { onSignOut } from '../../actions/auth';

import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.items = [
            'Find Restaurant',
            'Find Food',
            // 'Notifications',
            // 'Profile Settings'
        ];
    }
    render() {
        const drawerItems = this.items.map((item, i) => {
            return (
                <TouchableOpacity activeOpacity={1} style={styles.itemContainer} key={i} onPress={() => this.props.navigation.navigate('FindRestaurant')}>
                    <Text style={[textStyles.medium, { color: 'black' }]}>{item}</Text>
                </TouchableOpacity>
            );
        });
        return (
            <SafeAreaView style={{ marginTop: 90, flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.locationContainer}>
                    <Text style={[textStyles.large, { color: 'black' }]}>Current Location</Text>
                    <Text style={[textStyles.medium, styles.locationText]}>Toronto, Canada</Text>
                </View>
                { drawerItems }
                <TouchableOpacity activeOpacity={1} style={styles.buttonContainer} onPress={async () => {
                        await onSignOut();
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