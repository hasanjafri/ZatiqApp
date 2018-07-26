import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginVertical: 10
    },
    box: {
        borderWidth: 2,
        borderColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        height: 150,
        shadowColor: 'red',
        shadowOffset: {
            width: 2,
            height: 2
        },   
        elevation: 3,
        shadowRadius: 5,
        shadowOpacity: 1
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