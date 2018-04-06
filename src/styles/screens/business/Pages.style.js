
import { StyleSheet } from 'react-native';
import colors from '../../colors.style';

export default styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    input: {
        color: colors.black,
        fontFamily: 'nunito'
    },
    headerText: {
        color: colors.lightgrey,
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
    uploadButtonsContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    uploadButtonContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    uploadButton: {
        width: 200
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
        height: 50,
        marginVertical: 10 
    }
});