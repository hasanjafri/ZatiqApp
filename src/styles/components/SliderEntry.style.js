import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '../colors.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight - 70 - 20 - 70; // 90 for header, 70 for pagination?
const slideWidth = wp(85);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin
    },
    shadow: {
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, 
        backgroundColor: 'white'
    },
    imagePlaceholder: {
        resizeMode: 'cover',
        // width: 150,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover'
    },
    radiusMask: {
    },
    radiusMaskEven: {
    },
    contentContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white'
    },
    contentContainerEven: {
        backgroundColor: 'white'
    },
    
    tagContainer: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        backgroundColor: colors.blue,
        lineHeight: 20,
        marginBottom: 5,
        paddingHorizontal: 10,
        marginRight: 5
    },
    leftPart: {
        flex: 1
    },
    rightPart: {
        paddingLeft: 10
    },
    open: {
        paddingHorizontal: 10,
        marginLeft: 10,
        lineHeight: 20,
        fontSize: 11,
        color: 'white'
    },
    buttonBar: {
        marginTop: 10,
        flexDirection: 'row',
        height: 40
    },
    buttonCall: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(160, 160, 160, 1)',
    },
    buttonText: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
        lineHeight: 40
    }
});