import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

export default StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 10,
        bottom: 10
    },
    wrapper: {
    },
    header: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingLeft: 10,
        borderColor: colors.lightgrey
    },
    headerText: {
        color: colors.gray,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 10
    },
    body: {
        paddingHorizontal: 20
    },
    feature: {
        flexDirection: 'row',
        height: 40,
        marginVertical: 10 
    }
});
