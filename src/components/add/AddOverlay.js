import React from 'react';
import { Overlay } from 'react-native-elements';
import { Text } from 'react-native';
import styles from '../../styles/components/AddButton.style';
import colors from '../../styles/colors.style';

class AddOverlay extends React.Component {
    render() {
        return (
            this.props.showOverlay ?
                <Overlay fullScreen isVisible>
                    <Text>Hello from Overlay!</Text>
                </Overlay> : null
        );
    }
}

export default AddOverlay;