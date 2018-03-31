import React from 'react';
import { Font } from 'expo';
import { AsyncStorage } from 'react-native';

// Custom imports
import { isSignedIn } from './src/actions/auth';
import createRootNavigator from './src/routes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null
        };
    }
    async componentWillMount() {
        let [user] = await Promise.all([
            isSignedIn(),
            AsyncStorage.removeItem('businessName'),
            Font.loadAsync({
                'nunito': require('./src/assets/fonts/Nunito-Regular.ttf'),
                'nunito-bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
                'nunito-italic': require('./src/assets/fonts/Nunito-Italic.ttf')
            })
        ]);
        this.setState({ isLoading: false, user });
    }
    render() {
        const Layout = createRootNavigator(this.state.user);
        return (
            !this.state.isLoading ? <Layout /> : null
        );
    }
}

export default App;