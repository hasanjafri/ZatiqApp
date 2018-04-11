import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { Icon, Button, List, ListItem } from 'react-native-elements';
import { ImagePicker } from 'expo';

import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';
import colors from '../../../styles/colors.style';

class PicturesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuPictures: [],
            pictures: []
        };
    }
    uploadMenu = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            const newPictures = type === 'menuPictures' ? this.state.menuPictures : this.state.pictures;
            newPictures.push({
                aspectRatio: result.width / result.height,
                base64: result.base64
            });
            if (type === 'menuPictures') {
                this.setState({ menuPictures: newPictures });
            } else {
                this.setState({ pictures: newPictures });
            }
        }
    }
    deleteRow = (type, index) => {
        if (type === 'menuPictures') {
            this.state.menuPictures.splice(index, 1)
            this.setState({ menuPictures: this.state.menuPictures });
        } else {
            this.state.pictures.splice(index, 1);
            this.setState({ pictures: this.state.pictures });
        }
    }
    render() {
        const { menuPictures, pictures } = this.state;
        const menuItems = menuPictures.map((item, i) => {
            const image = 'data:image/png;base64,' + item.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow('menuPictures', i)}/>}
                    title={`Menu picture page ${i}`} />
            )
        });
        const pictureItems = pictures.map((item, i) => {
            const image = 'data:image/png;base64,' + item.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow('pictures', i)}/>}
                    title={`Picture page ${i}`} />
            )
        });
        return (
            <ScrollView style={styles.listContainer}>
                <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left', paddingTop: 20 }]}>Upload Menu</Text>
                { menuItems.length > 0 ? 
                    <List>{menuItems}</List> : null }
                <Button title='Upload'
                    icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                    titleStyle={[textStyles.medium, { height: 50 }]}
                    buttonStyle={styles.uploadButton}
                    onPress={() => this.uploadMenu('menuPictures')}/>

                <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left' }]}>Upload Restaurant Pictures</Text>
                { pictureItems.length > 0 ?
                    <List>{pictureItems}</List> : null }
                <Button title='Upload'
                    icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                    titleStyle={[textStyles.medium, { height: 50 }]}
                    buttonStyle={styles.uploadButton}
                    onPress={() => this.uploadMenu('pictures')}/>
            </ScrollView>
        );
    }
}

export default PicturesPage;