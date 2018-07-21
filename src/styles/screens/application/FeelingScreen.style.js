import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    scrollViewContainer: {
        flex: 1
    },
    questionView: {
        marginVertical: 10,
    },

    topPicksLabel: {
        fontSize: 20,
        color: 'white',
        marginVertical: 10,
        fontFamily: 'nunito',
        paddingLeft: 10
    },
    filterCategoryContainer: {
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 10
    },
    buttonTextContainer: {
        paddingVertical: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(127, 140, 141, 0.3)'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'nunito',
        fontSize: 23
    },

    item: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        padding: 10,
        height: 150,
        backgroundColor: 'rgba(127, 140, 141, 0.3)'
    }
});