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
    onPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        } else {
            this.setState({ showOverlay: true })
        }
    }
    render() {
        const { showOverlay } = this.state;
        const { noOverlay } = this.props;
        return (
            <React.Fragment>
                { !noOverlay ? <AddReviewOverlay showOverlay={showOverlay} onClose={() => this.setState({ showOverlay: false })}/> : null }
                { !showOverlay && !this.props.hide ?
                    <Icon reverse raised
                        iconStyle={styles.icon}
                        containerStyle={this.props.fixed ? styles.fixedContainer : styles.relativeContainer}
                        name={'ios-add'}
                        type={'ionicon'}
                        size={27}
                        color={colors.primary}
                        onPress={() => this.onPress()} /> : null
                }
            </React.Fragment>
        );
    }
}

export default AddReviewButton;