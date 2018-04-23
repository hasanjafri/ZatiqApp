import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

export default styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40
    },
    inputDirectContainer: {
        borderBottomWidth: 0
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontFamily: 'nunito',
        fontWeight: 'bold'
    },
    inputContainer: {
        marginBottom: 20,
        borderWidth: 1,
        height: 50,
        borderColor: 'white',
        borderRadius: 25
    },
    input: {
        color: 'white',
        fontFamily: 'nunito',
        height: 50
    },
    iconContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
        borderRadius: 10
    },
    primaryButton: {
        backgroundColor: colors.primary,
        width: 300,
        height: 50,
        borderRadius: 25,
        borderColor: 'transparent',
        borderWidth: 0
    },
    buttons: {
        borderRadius: 10,
        padding: 20,
        alignSelf: 'stretch'
    }
});