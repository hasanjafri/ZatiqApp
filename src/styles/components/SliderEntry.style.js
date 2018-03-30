import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '../colors.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight - 70 - 20 - 70; // 90 for header, 70 for pagination?
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        // borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        // borderRadius: IS_IOS ? entryBorderRadius : 0,
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'transparent'
    },
    radiusMaskEven: {
        backgroundColor: 'transparent'
    },
    contentContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        // borderBottomLeftRadius: entryBorderRadius,
        // borderBottomRightRadius: entryBorderRadius
    },
    contentContainerEven: {
        backgroundColor: 'white'
    },
    ratingContainer: {
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    open: {
        paddingHorizontal: 5,
        height: 25,
        marginTop: 10,
        marginLeft: 10,
        lineHeight: 25,
        color: 'white',
        textAlign: 'center',
        right: 0,
        position: 'absolute'
    },
    buttonBar: {
    },
    buttonCall: {
        backgroundColor: colors.primary,
        height: 40,
        flexDirection: 'row'
    },
    buttonView: {
        backgroundColor: 'rgba(160, 160, 160, 1)',
        height: 40,
        flexDirection: 'row'
    },
    buttonText: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
        lineHeight: 40
    }
});