import { StyleSheet } from 'react-native';
import colors from '../colors.style';

export default StyleSheet.create({
    wrapper: {
        flex: 1
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 30,
        borderBottomWidth: 1,
        paddingVertical: 20,
        borderColor: colors.lightgrey
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    labelText: {
        color: colors.lightgrey,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10
    },
    input: {
        color: colors.black,
        fontFamily: 'nunito'
    },
    textArea: {
        color: colors.black,
        fontFamily: 'nunito',
        height: 100
    }
});
