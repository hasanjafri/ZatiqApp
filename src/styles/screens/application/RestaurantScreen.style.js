import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

export default styles = StyleSheet.create({
    view: {
        height: '100%',
        width: '100%',
        flex: 1
    },
    scrollViewContainer: {
        flex: 1
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    restaurantImage: {
        height: 150,
        width: '75%',
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonCall: {
        backgroundColor: colors.primary,
        height: 40,
        flexDirection: 'row',
        width: 280
    },
    buttonText: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
        lineHeight: 40
    },
    item: {
        justifyContent: 'flex-end',
        padding: 10,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(127, 140, 141, 0.3)'
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    widthsContainer: {
        flexDirection: 'row'
    },
    sectionTitle: {
        paddingVertical: 10,
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: colors.lightergrey,
        width: '90%'
    },
    open: {
        paddingHorizontal: 10,
        height: 25,
        lineHeight: 25,
        color: 'white',
        textAlign: 'center'
    }
});