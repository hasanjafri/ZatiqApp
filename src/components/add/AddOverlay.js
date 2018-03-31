import React from 'react';
import { Overlay, Input } from 'react-native-elements';
import { Text } from 'react-native';
import styles from '../../styles/components/AddButton.style';
import colors from '../../styles/colors.style';

class AddOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
    }
    renderPageOne() {
        return (
            <React.Fragment>
                <Text>Page 1</Text>
            </React.Fragment>
        );
    }
    renderPageTwo() {
        return (
            <React.Fragment>
                <Input placeholder='INPUT WITH SHAKING EFFECT' />
                <Input placeholder='INPUT WITH SHAKING EFFECT' />
            </React.Fragment>
        );
    }
    render() {
        const { page } = this.state;
        var renderPage = null;
        if (page === 1) {
            renderPage = this.renderPageOne();
        } else if (page === 2) {
            renderPage = this.renderPageTwo();
        }
        return (
            this.props.showOverlay ?
                <Overlay isVisible width={'auto'} height={'auto'}>
                    {renderPage}
                </Overlay> : null
        );
    }
}

export default AddOverlay;