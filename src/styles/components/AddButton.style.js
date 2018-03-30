import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    icon: {

    },
    fixedContainer: {
        position: 'absolute',
        left: (width / 2) - 43,
        bottom: 30,
    },
    relativeContainer: {
        marginVertical: 20
    }
});
