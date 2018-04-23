import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../styles/colors.style';

class Loader extends React.Component {
    render() {
        const { show, light, clear } = this.props;
        let color = colors.gray;
        if (light) {
            color = colors.lightergrey;
        } else if (clear) {
            color = 'white';
        }
        return (
            show ?
                <View style={[styles.loader, { backgroundColor: color }]}>
                    <ActivityIndicator size={'large'} color={colors.primary} />
                </View> : null
        );
    }
}

const styles =  StyleSheet.create({
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Loader;