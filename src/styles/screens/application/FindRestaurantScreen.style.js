import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginVertical: 10
    },
    box: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    image: {
        alignSelf: 'center',
        flex: 1
    },
    restaurantName: {
        marginTop: 5,
        fontWeight: '300',
        fontSize: 18,
        color: '#626262',
        fontFamily: 'nunito',
        textAlign: 'center'
    },
    restaurantAddress: {
        color: 'lightgrey',
        fontFamily: 'nunito',
        textAlign: 'center'
    }
});