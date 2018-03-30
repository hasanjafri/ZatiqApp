import React from 'react';
import { Icon } from 'react-native-elements';
import styles from '../../styles/components/AddButton.style';
import colors from '../../styles/colors.style';

class AddButton extends React.Component {
    render() {
        return (
            <Icon reverse raised
                iconStyle={styles.icon}
                containerStyle={this.props.fixed ? styles.fixedContainer : styles.relativeContainer}
                name={'ios-add'}
                type={'ionicon'}
                size={35}
                color={colors.primary}
                onPress={() => this.props.onPress()} />
        );
    }
}

export default AddButton;