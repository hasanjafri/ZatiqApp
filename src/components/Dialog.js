import React, { Component } from 'react';
import PopupDialog, { ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
import { Dimensions, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles/colors.style';

const scaleAnimation = new ScaleAnimation();

class Dialog extends React.Component {
    render() {
        const {width, height} = Dimensions.get('window');
        return (
            <PopupDialog dialogAnimation={scaleAnimation}
                show={this.props.show}
                width={0.9}
                height={0.8}
                containerStyle={styles.container}
                onDismissed={this.props.onDismissed}
                dialogTitle={
                    <React.Fragment>
                        <DialogTitle titleAlign={'left'} title={this.props.title} />
                        <Icon size={30} containerStyle={styles.closeButton} name='clear' onPress={this.props.onDismissed} />
                    </React.Fragment>
                }
                ref={this.props.setRef}>
                { this.props.children }
            </PopupDialog>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
        minHeight: 300
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 10
    }
});

export default Dialog;