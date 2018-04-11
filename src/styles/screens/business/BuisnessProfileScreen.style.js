
import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

export default styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    page: {
        height: '100%'
    },
    paginationContainer: {
        paddingVertical: 20,
        width: '100%',
        borderTopWidth: 2,
        borderColor: colors.primary
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8
    }
});