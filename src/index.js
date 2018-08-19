import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {isMobile} from 'react-device-detect'

class App extends Component{
    
    constructor(props) {
        super(props);
        this.state = {module: null};
    }
    componentDidMount() {
        if(isMobile) {
            import('./index.mobile').then(module => this.setState({module: module.default}));
        } else {
            import('./index.web').then(module => this.setState({module: module.default}));
        }
    }
    render() {
        const {module: Component} = this.state;
        return (
            <div>
            {Component && <Component />}
            </div>
        );
    }    
}

ReactDOM.render(<App />, document.getElementById('root'));