import React from 'react';
import { Font } from 'expo';
import { AsyncStorage } from 'react-native';
import keys from './src/libs/keys';
import appState from './src/appState';

// Custom imports
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
        const state = appState.getInstance();
        await Promise.all([
            state.loadAll(),
            Font.loadAsync({
                'nunito': require('./src/assets/fonts/Nunito-Regular.ttf'),
                'nunito-bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
                'nunito-italic': require('./src/assets/fonts/Nunito-Italic.ttf')
            })
        ]);
        const user = state.getUser();
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