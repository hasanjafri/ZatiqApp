import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        width: '100%'
    },

    // Question Container
    questionView: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    // Top picks
    topPickView: {
        height: 130,
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    topPickImage: {
        height: '100%',
        width: '100%',
        backgroundColor: '#70757c'
    },
    topPickImageOverlay: {
        flex: 1,
        justifyContent: 'center'
    },

    // Surprise Me & Popular & Newset
    equalWidthsContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    equalWitdhView: {
        width: '50%',
        height: 130
    },
    imageContainer: {
        height: '100%',
        backgroundColor: '#70757c',
        flex: 1,
        justifyContent: 'center'
    },
    equalHeightContainer: {
        height: '100%'
    },
    equalHeightView: {
        height: 65
    },

    // Categories
    scrollViewContainer: {
        flex: 1
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