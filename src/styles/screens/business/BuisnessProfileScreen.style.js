
import { StyleSheet } from 'react-native';

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
        paddingVertical: 8,
        marginBottom: 10
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});