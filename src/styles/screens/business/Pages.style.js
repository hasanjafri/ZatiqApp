
import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

export default styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20
    },
    overlayContainer: {
        position: 'absolute',
        top: 10,
        bottom: 10
    },
    input: {
        color: colors.black,
        fontFamily: 'nunito'
    },
    headerText: {
        color: colors.gray,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10
    },
    priceButtonWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceButtonContainer: {
        flex: 1
    },
    priceButton: {
        borderRadius: 50,
        width: 100,
        height: 35,
        backgroundColor: 'lightgrey'
    },

    listContainer: {
        backgroundColor: '#eef0f3',
        paddingHorizontal: 20
    },
    uploadButton: {
        width: 200,
        marginTop: 20,
        marginBottom: 40
    },

    equalWidthContainer: {
        width: '100%',
        flexDirection: 'row'
    },
    equalWidthView: {
        width: '50%'
    },
    
    feature: {
        flexDirection: 'row',
        height: 40,
        marginVertical: 10 
    }
});