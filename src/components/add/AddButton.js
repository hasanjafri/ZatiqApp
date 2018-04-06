import React from 'react';
import { Icon } from 'react-native-elements';
import styles from '../../styles/components/AddButton.style';
import colors from '../../styles/colors.style';
import AddOverlay from './AddOverlay';

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false
        }
    }
    render() {
        const { showOverlay } = this.state;
        return (
            <React.Fragment>
                <AddOverlay showOverlay={this.state.showOverlay} onClose={() => { this.setState({ showOverlay: false })}}/>
                { !showOverlay ?
                    <Icon reverse raised
                        iconStyle={styles.icon}
                        containerStyle={this.props.fixed ? styles.fixedContainer : styles.relativeContainer}
                        name={'ios-add'}
                        type={'ionicon'}
                        size={27}
                        color={colors.primary}
                        onPress={() => this.setState({ showOverlay: true })} /> : null
                }
            </React.Fragment>
        );
    }
}

export default AddButton;