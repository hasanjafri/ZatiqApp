import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    view: {
        height: '100%',
        width: '100%',
        flex: 1
    },
    // Header
    header: {
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLogo: {
        height: '50%',
        width: '50%',
        marginBottom: 80,
        marginLeft: 88
    },
    // Mood Container
    moodContainer: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 11
    },
    suggestions: {
        backgroundColor: '#70757c',
        height: 110,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginBottom: 10
    },
    // Top picks
    topPick: {
        height: '100%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    topPickView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // Surprise me
    surpriseMeView: {
        height: 110,
        width: '90%',
        marginLeft: 20,
        marginBottom: 10
    },
    surpriseMeContainer: {
        height: '100%'
    },
    surpriseMeImageBackground: {
        height: '100%',
        width: '70%',
        justifyContent: 'center'
    },
    scrollViewContainer: {
        marginTop: -120,
        flex: 1
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        backgroundColor: '#7f8c8d',
    },
    text: {
        color: "white",
        fontSize: 32,
    }
});