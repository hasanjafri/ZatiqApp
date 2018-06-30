import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin: 20,
        marginBottom: 30
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    logo: {
        width: 300,
        height: 300
    },
    signInButtons: {
        borderRadius: 25
    },
    centered: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});