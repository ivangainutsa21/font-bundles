import React, {Component} from 'react';
import './index.mobile.css';
import './otf.css';
import fonts from './assets/fonts.json';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Provider } from 'react-redux';
import store from './store'
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color'
import ReactSVG from 'react-svg';
import transform from './transform.json';

function arrowRenderer () {
    return (
      <i className ="fa fa-angle-down" style={{fontSize: '22px', color:'grey'}} />
    )
  }

class Header extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            selectValue: ''
        }
    }
    
    onSiteSelected = (newValue) => {
        this.setState({selectValue: newValue})
    }
    
    render() {
        return (
            <div className="header">
                <img src={require("./assets/img/logo.png")} className="logo" alt="logo" />
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <a style={{marginRight: '10px'}}>Menu</a>
                    <i className ="fa fa-bars" style={{fontSize: '22px', color:'white'}} />
                </div>
            </div>
        );
    }    
}

class Title extends Component{
    render() {
        return (
            <div className = "title">
                <span><b>Create your free monogram</b></span>
            </div>
        );
    }    
}
class Content extends Component{
    render() {
        return (
            <div className = "content">
                <Fonts />
                <Builder />
                <Frames />
            </div>
        );
    }    
}

class FontsComponent extends Component {

    fontClick(index) {
        this.props.dispatch({type: 'SET_FONT_BUILDER', font: index})
    }

    render() {
        let _this = this;
        return(
            <div className = "wrap-fonts">
                <div style={{marginBottom: '10px'}}>
                    <span>Fonts</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row',}}>
                {
                    fonts.map(function(name, index) {
                        return (
                            <div 
                                style={{border: index === _this.props.font ? '1px solid #0e9bd0' : null,}}
                                className = "font"
                                key={index}
                                onClick={() => _this.fontClick(index)}
                            >
                                <span style={{fontFamily: name.font_family, fontSize: '26px', }}>AG</span>   
                            </div>
                        )
                                    
                    })
                }
                </div>
            </div>
        );
    }
}

class FramesComponent extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            selectValue: ''
        }
    }
    
    onSiteSelected = (newValue) => {
        this.setState({selectValue: newValue})
    }
    
    onFrameClick = (index) =>{
        this.props.dispatch({type: 'SET_FRAME_BUILDER', frame: index});
    }

    render() {
        let _this = this;
        return(
            <div className = "wrap-frames">
                <div>
                    <Select 
                        options={[
                            {value: 'one', label: 'All frames'},
                            {value: 'two', label: 'Animals & Pet'},
                            {value: 'three', label: 'Arrows'},
                            {value: 'four', label: 'Basic'},
                        ]}
                        clearable={false}
                        placeholder={<span style={{color: 'black'}}>All Frames</span>}
                        arrowRenderer={arrowRenderer}
                        value={this.state.selectValue}
                        onChange={this.onSiteSelected}
                        simpleValue
                        style={{borderStyle:'none', height: '5px', backgroundColor: 'transparent', marginRight: '20px',}}
                    />
                </div>
                <div style={{display: 'flex', }}>
                {
                [...Array(200)].map((obj, index) =>
                    (
                    <div
                        style={{
                            border: index === _this.props.frame ? '1px solid #0e9bd0' : null,
                        }}
                        className="frame"
                        onClick = {() => _this.onFrameClick(index)}
                        key={index}
                    >
                        <img src={require('./assets/frames/' + index + '.svg')} style={{width: '70px', height: '70px'}} alt="Frame" />
                    </div>
                    )
                )
                }
                </div>
            </div>
        );
    }
}
class BuilderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            showColorPicker: 'none',
            cpClassName: 'color-picker-font',
            userColor: '#fff',
        }
    }

    onTextChange = (event) => {
        var text = event.target.value;
        let filter = text[text.length - 1];
        if((filter <= 'z' && filter >= 'a') || (filter <= 'Z' && filter >= 'A') || !filter)
            this.setState({text: text.toUpperCase()});
    }

    handleChangeComplete = (color) => {
        this.setState({userColor: color.hex});
        if(this.state.cpClassName === 'color-picker-font') {
            this.props.dispatch({type: 'SET_FONT_COLOR', fontColor: color.hex});
        } else if(this.state.cpClassName === 'color-picker-frame') {
            this.props.dispatch({type: 'SET_FRAME_COLOR', frameColor: color.hex});
        }
    }

    handleSlider = (value) => {
        this.props.dispatch({type: "SET_SLIDER_VALUE", slider_value: value});
    } 
    
    renderFrame = () => {
        let i = this.props.frame - 1;
        let j = this.props.font;
        var fontSize;
        var text = this.state.text;
        if(this.props.font === 5 || this.props.font === 15) {
            let a = text[0] ? text[0].toUpperCase() : "";
            let b = text[1] ? text[1].toLowerCase() : "";
            text = a + b;
        }
        if(this.props.frame === 0) {
            fontSize = 72;
        } else {
            // fontSize = this.state.text.length <= 1 ? transform[0][j]['oneSize']  * transform[1][i]['alpha']: transform[0][j]['size'] / this.state.text.length * transform[1][i]['alpha'];
            fontSize = text.length <= 1 ? 110 : 210 / text.length;
        }
        var svg = require('./assets/frames/' + this.props.frame + '.svg');
        return (
            <div style={{display: 'flex', position: "relative", minWidth: '250px', minHeight: '250px', overflow: 'hidden', alignItems: 'center'}}>
                {
                    i >= 0 ?
                    <ReactSVG
                        path={svg}
                        svgStyle={{fill: this.props.frameColor, width: '100%', height: '100%', }}
                    >
                    </ReactSVG>
                    :null
                }
                    <div className="centered" style={{transform: i >= 0 ? transform[0][j]['translate'] + " "  + transform[1][i]['translate'] + " " + "scale(" + this.props.slider_value / 55 +")": "translate(-50%, -50%)"  + " " + "scale(" + this.props.slider_value / 55 +")",}} >
                        <span style={{color: this.props.fontColor, fontFamily: fonts[j]['font_family'], fontSize: fontSize}}>{this.state.text}</span>
                    </div>
            </div>
        )
    }

    render() {
        return (
            <div className = "builder">
                <div className="wrap-input">
                    <input
                        maxLength={this.props.maxLength}
                        type="text"
                        value={this.state.text}
                        style={{fontSize: '16px', width: '100%', marginRight: '5%', height: '35px', boxShadow: 'none', borderStyle: 'none', textTransform: 'uppercase', boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.2)'}}
                        onChange = {this.onTextChange}
                    />

                    <div style={{display: 'flex', width: '45px', height: '35px', backgroundColor: 'white', boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}}>
                        <i className ="fa fa-times" style={{fontSize: '22px', color:'black'}} />
                    </div>
                </div>
                <div className="wrap-picksizer">
                    <div 
                        style={{display:'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <span style={{marginRight: '10px'}}>Text</span>
                        <div
                            style={{display:'flex',alignItems: 'center', cursor: 'pointer', height: '35px'}}
                            onClick={() => this.setState({showColorPicker: 'flex', cpClassName: 'color-picker-font'})}
                        >
                            <svg height="16" width="16" style={{marginRight: '5px'}}>
                                <circle cx="8" cy="8" r="8" fill={this.props.fontColor} />
                            </svg>
                        </div>
                    </div>
                    <div style={{margin: "0px 30px"}}>
                        <svg height="30" width="4">
                            <line x1="2" y1="0" x2="2" y2="30" style={{stroke: "lightgrey", strokeWidth: "2", }} />
                        </svg>
                    </div>
                    <div style={{display:'flex', alignItems: 'center', }}>
                        <span style={{marginRight: '10px'}}>Frames</span>
                        <div
                            style={{display:'flex',alignItems: 'center', cursor: 'pointer'}}
                            onClick={() => this.setState({showColorPicker: 'flex', cpClassName: 'color-picker-frame'})}
                        >
                            <svg height="16" width="16" style={{marginRight: '5px'}}>
                                <circle cx="8" cy="8" r="8" fill={this.props.frameColor} />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="wrap-picksizer">
                    <div style={{display:'flex', flex: '25%', alignItems: 'center', margin: '0 2%'}}>
                        <span style={{color: 'grey', fontSize: '14px'}}>A</span>
                        <Slider 
                            railStyle={{backgroundColor: '#d3d3d3', height: 5}}
                            trackStyle={{backgroundColor: '#77c0dc', height: 5}}
                            handleStyle = {{
                                borderColor: 'white',
                                backgroundColor: '#0e9bd0',
                                height:20,
                                width: 20,
                                marginTop: -8,
                            }}
                            style={{width: '100%', marginRight: '10px', marginLeft: '10px', zIndex: 100}}
                            value={this.props.slider_value}
                            onChange={this.handleSlider}
                        />
                        <span style={{color: 'grey', fontSize: '24px'}}>A</span>
                    </div>
                </div>
                <div 
                    style={{display: this.state.showColorPicker}}
                    className="color-picker"
                    onMouseOut={() => this.setState({showColorPicker: 'none'})}
                >
                    <ChromePicker
                        color={ this.state.userColor }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                </div>
                <div
                    style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems:'center'}}
                >
                    {
                        this.props.frame !== 0 || this.state.text.length !== 0 ?
                        this.renderFrame()
                        :
                        null
                    }
                </div>
            </div>
        );

    }
}

class Footer extends Component{
    render() {
        return (
            <div className = "wrap-footer">
                <div className = "footer">
                    <div className="wrap-social">
                        <div style={{backgroundColor: '#3B5998'}} className = "btn-social">
                            <i className ="fa fa-facebook-f" style={{fontSize: '22px', color:'white'}} />
                        </div>
                        <div style={{backgroundColor: '#448AFF'}} className = "btn-social">
                            <i className ="fab fa-facebook-messenger" style={{fontSize: '22px', color:'white'}} />
                        </div>
                        <div style={{backgroundColor: '#55acee'}} className = "btn-social">
                            <i className ="fab fa-twitter" style={{fontSize: '22px', color:'white'}} />
                        </div>
                        <div style={{backgroundColor: '#CB2027'}} className = "btn-social">
                            <i className ="fab fa-pinterest" style={{fontSize: '22px', color:'white'}} />
                        </div>
                        <div style={{backgroundColor: '#7d7d7d'}} className = "btn-social">
                            <i className ="fa fa-envelope" style={{fontSize: '22px', color:'white'}} />
                        </div>
                        <div style={{backgroundColor: '#dc4e41'}} className = "btn-social">
                            <i className ="fab fa-google-plus" style={{fontSize: '22px', color:'white'}} />
                        </div>
                    </div>
                    <div className = "footer-content">
                        <span><strong>Monogram creator</strong></span>
                        <p>The monogram frame creator is a free online tool that gives you the possibility to <strong>create your monogram</strong> with our frames &amp; fonts. This tool is easy to use: Type your letters, choose your font and frame in our library, change the colors and download your SVG, PNG or DXF file. You can see also the latest creations from users here.</p>
                        {/* <a href="/inspirations">How it works</a> */}
                        <span style={{color: '#0e9bd0', fontSize: '14px'}}>How it works</span>
                    </div>
                </div>
            </div>
        );
    }    
}

export default class MobileApp extends Component{
    render() {
        return (
            <Provider store={store}>
                <div className = "app">
                    <Header />
                    <Title />
                    <Content />
                    <Footer />
                </div>
            </Provider>
        );
    }    
}

function mapStateToProps(state) {
    return {
        font: state.appSetting.font,
        maxLength: state.appSetting.maxLength,
        frame: state.appSetting.frame,
        fontColor: state.appSetting.fontColor,
        frameColor: state.appSetting.frameColor,
        slider_value: state.appSetting.slider_value,
    }
}

const Fonts = connect(mapStateToProps)(FontsComponent);
const Builder = connect(mapStateToProps)(BuilderComponent);
const Frames = connect(mapStateToProps)(FramesComponent);