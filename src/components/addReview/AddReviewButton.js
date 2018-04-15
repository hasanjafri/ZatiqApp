import React from 'react';
import { Icon } from 'react-native-elements';
import styles from '../../styles/components/addReview/AddReviewButton.style';
import colors from '../../styles/colors.style';
import AddReviewOverlay from './AddReviewOverlay';

class AddReviewButton extends React.Component {
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
                <AddReviewOverlay showOverlay={showOverlay} onClose={() => this.setState({ showOverlay: false })}/>
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

export default AddReviewButton;