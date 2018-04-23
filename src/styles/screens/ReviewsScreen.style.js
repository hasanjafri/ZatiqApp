import { StyleSheet } from 'react-native';
import colors from '../colors.style';

export default styles = StyleSheet.create({
    scrollViewContainer: {
        // flex: 1,
        height: '100%',
        width: '100%'
    },
    reviewsContainer: {
        marginVertical: 30,
        marginHorizontal: 10
    },
    reviewRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 20,
        borderLeftWidth: 5,
        backgroundColor: 'white',
        borderLeftColor: colors.primary,
        borderBottomWidth: 2,
        borderBottomColor: colors.lightergrey,
        borderTopWidth: 1,
        borderTopColor: colors.lightergrey,
        borderRightWidth: 1,
        borderRightColor: colors.lightergrey,
        marginBottom: 15
    },
    reviewTitle: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'nunito-bold',
        paddingBottom: 5
    },
    reviewContent: {
        color: 'black',
        fontFamily: 'nunito',
        fontSize: 12
    }
});