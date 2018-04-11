import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

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
        marginBottom: 15,
        paddingVertical: 20,
        borderColor: colors.lightgrey
    },
    body: {
        paddingHorizontal: 20
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

    textAreaContainer: {
        borderWidth: 1,
        borderColor: colors.lightergrey,
        borderRadius: 5,
        padding: 10
    },
    textArea: {
        color: colors.black,
        fontFamily: 'nunito'
    },

    searchContainer: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginHorizontal: 10
    },
    searchInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.lightergrey
    }
});
