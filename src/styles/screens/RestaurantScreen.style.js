import { StyleSheet } from 'react-native';
import colors from '../colors.style';

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
        borderRadius: 5,
        padding: 10,
        height: 100,
        backgroundColor: '#7f8c8d',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    widthsContainer: {
        flexDirection: 'row'
    },
    open: {
        paddingHorizontal: 5,
        height: 25,
        lineHeight: 25,
        color: 'white',
        textAlign: 'center'
    },
    tag: {
        height: 25,
        lineHeight: 25,
        backgroundColor: colors.primaryHalfOpacity
    },
    reviewsContainer: {
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
        marginLeft: 10
    },
    reviewRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    reviewTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'nunito-bold',
        paddingBottom: 10
    },
    reviewContent: {
        color: 'white',
        fontFamily: 'nunito',
        fontSize: 12
    }
});