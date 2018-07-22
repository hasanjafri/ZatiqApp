import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Dialog from './Dialog';

import textStyles from '../styles/text.style';
import styles from '../styles/screens/business/Pages.style';
import colors from '../styles/colors.style';

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class TagsOverlay extends React.Component {
    _renderTagsSection(name, type) {
        const dataSource = this.props.data[type];
        const dataItems = [<Text key={-1} style={[textStyles.mediumBold, styles.sectionTitle, { color: colors.lightgrey, marginTop: 20, marginBottom: 10 }]}>{name}</Text>];
        Object.keys(dataSource).forEach((key, i) => {
            if (dataSource[key]) {
                const formattedKey = key.replace('_', ' ');
                dataItems.push(<Text style={[textStyles.medium, {color: 'black'}]} key={i}>{capitalizeWords(formattedKey)}</Text>)
            }
        });
        return dataItems;
    }
    render() {
        if (!this.props.showOverlay) {
            return false;
        }
        return (
            <Dialog show={this.props.showOverlay}
                title="All Tags"
                onDismissed={this.props.onClose}>
                <ScrollView style={styles.wrapper}>
                    { this.props.feature ?  
                        <React.Fragment>
                            { this._renderTagsSection('Features', 'features') }
                        </React.Fragment> :
                        <React.Fragment>
                            { this._renderTagsSection('Cuisines', 'tags') }
                            { this._renderTagsSection('Seafood','seafood') }
                            { this._renderTagsSection('Meat', 'meat') }
                        </React.Fragment>
                    }
                </ScrollView>
            </Dialog>
        );
    }
}

export default TagsOverlay;