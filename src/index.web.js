import React, {Component} from 'react';
import './index.web.css';
import './otf.css';
import fonts from './assets/fonts.json';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import { Provider } from 'react-redux';
import store from './store'
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color'
import ReactSVG from 'react-svg';
import transform from './transform.json';
import domtoimage from 'dom-to-image';
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver/FileSaver';
import { saveSvgAsPng } from 'save-svg-as-png';
import html2canvas from 'html2canvas';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import { ok } from 'assert';

function arrowRenderer () {
    return (
      <i class ="fa fa-angle-down" style={{fontSize: '22px', color:'grey'}} />
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
            <div className = "header">
                <img src={require("./assets/img/logo.png")} className="logo" alt="logo" />
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Select 
                        options={[
                            {value: 'one', label: 'monogram'},
                            {value: 'two', label: 'monogram'},
                            {value: 'three', label: 'monogram'},
                        ]}
                        placeholder={"Our Sites"}
                        clearable={false}
                        arrowRenderer={arrowRenderer}
                        // value={this.state.selectValue}
                        // onChange={this.onSiteSelected}
                        style={{borderStyle:'none', width: '110px', height: '5px', backgroundColor: 'transparent', marginRight: '20px',}}
                    />
                    <a>Affiliate</a>
                    <a>Create a Store</a>
                    <a>Register</a>
                    <a>Login</a>
                </div>
            </div>
        );
    }    
}
class Menu extends Component{
    render() {
        return (
            <div className = "menu">
                <a>Bundles</a>
                <a>Free Fonts</a>
                <a>New Fonts</a>
                <a>Regular</a>
                <a>Script</a>
                <a>Logo</a>
                <a>Foregin</a>
                <a>Symbols</a>
                <a>Other Fonts</a>
                <a>One Dollar Deals</a>
            </div>
        );
    }    
}
class Title extends Component{
    render() {
        return (
            <div className = "title">
                {/* <h1>Create Your Free Monogram</h1> */}
                <span><b>Create your free monogram</b></span>
                <p className = "howto">
                    <b>1. </b>
                    <span>Type your letters</span>
                    <b> 2. </b>
                    <span>Choose your font and frame</span>
                    <b> 3. </b>
                    <span>Change the colors</span>
                    <b> 4. </b>
                    <span>Download and enjoy!</span>
                </p>
            </div>
        );
    }    
}
class Content extends Component{
    render() {
        return (
            <div className = "content">
                <Options />
                <Builder />
            </div>
        );
    }    
}

class Options extends Component {
    render() {
        return (
            <div className = "wrap-options">
                <Fonts />
                <Frames />
            </div>
        );

    }
}

class FontsComponent extends Component {

    fontClick(index) {
        this.props.dispatch({type: 'SET_FONT_BUILDER', font: index});
        if(index === 5 || index === 15) {
            this.props.dispatch({type: 'SET_MAX_LENGTH', maxLength: 2});
        } else {
            this.props.dispatch({type: 'SET_MAX_LENGTH', maxLength: null});
        }
    }

    render() {
        let _this = this;
        return(
            <div className = "wrap-fonts">
                <div style={{margin: '10px 0 15px 0'}}>
                    <span>Fonts</span>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        fonts.map(function(name, index) {
                            return (
                                <div 
                                    style={{border: index === _this.props.font ? '1px solid #0e9bd0' : null, cursor: 'pointer'}}
                                    className = "font"
                                    onClick={() => _this.fontClick(index)}
                                >
                                    <span style={{fontFamily: fonts[index]['font_family'], fontSize: '36px'}}>{index === 5 || index === 15? 'Ag' : 'AG'}</span>
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
                <div style={{margin: '10px 0 15px 0', width: '70%'}}>
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
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                [...Array(201)].map((obj, index) =>
                    (
                    <div
                        style={{
                            border: index === _this.props.frame ? '1px solid #0e9bd0' : null,
                            cursor: 'pointer'
                        }}
                        className="frame"
                        onClick = {() => _this.onFrameClick(index)}
                    >
                        <img src={require('./assets/frames/' + index + '.svg')} style={{width: '100%', height: '100%'}}alt="Frame" />
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
        {
            this.setState({text: text.toUpperCase()});
        }
            
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
    
    downloadContent = () => {
        // domtoimage.toBlob(document.getElementById("content3"))
        //     .then(function(blob) {
        //         saveAs(blob, 'my-node.png');
        //     });
        if(this.state.text.length === 0 && this.props.frame === 0)
            return;
        html2canvas(document.getElementById("content3"), {backgroundColor: null, scale: 2}).then(canvas => {
            let link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = "monoframe.png"
            link.click();
        })
    }
    onDownloadSelected = (eventKey) => {
        if(this.state.text.length === 0 && this.props.frame === 0)
            return;
        var fileName = "monoframe_"+new Date().getTime();
        switch(eventKey) {
            case 'png':
                html2canvas(document.getElementById("content3"), {backgroundColor: null, scale: 2}).then(canvas => {
                    let link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = fileName + '.png';
                    link.click();
                })
                break;
            case 'svg':
                // var node = document.getElementById("Слой_1");
                // htmlToImage.toPng(node).then(function(dataUrl) {
                //     console.log(dataUrl);
                // })
                // html2canvas(document.getElementById("content3"), {backgroundColor: null, scale: 2}).then(canvas => {
                //     let link = document.createElement('a');
                //     link.href = canvas.toDataURL('image/jpg');
                //     link.download = "monoframe.jpg"
                //     link.click();
                // })
                break;
            case 'dfx':
                break;
            case 'eps':
                break;
            default:
                return;
        }
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
            fontSize = 108;
        } else {
            // fontSize = this.state.text.length <= 1 ? transform[0][j]['oneSize']  * transform[1][i]['alpha']: transform[0][j]['size'] / this.state.text.length * transform[1][i]['alpha'];
            fontSize = text.length <= 1 ? 110 : 210 / text.length;
        }
        var svg = require('./assets/frames/' + this.props.frame + '.svg');
        return (
            <div style={{position: 'relative', minWidth: '456px', minHeight: '456px',}}>
                {
                    i >= 0 ?
                    <ReactSVG
                        path={svg}
                        svgStyle={{fill: this.props.frameColor, }}
                    >
                    </ReactSVG>
                    :null
                }
                    <div 
                        className="centered"
                        style={{transform: i >= 0 ? transform[0][j]['translate'] + " "  + transform[1][i]['translate'] + " " + "scale(" + this.props.slider_value / 55 +")": "translate(-50%, -50%)"  + " " + "scale(" + this.props.slider_value / 55 +")",}}
                    >
                        <span id="myText" style={{color: this.props.fontColor, fontFamily: fonts[j]['font_family'], fontSize: fontSize}}>{text}</span>
                    </div>
            </div>
        )
    }

    render() {
        return (
            <div className = "builder">
                <div className="wrap-input">
                    <div style={{flex: '35%', margin: '0 2%'}}>
                        <input
                            maxLength={this.props.maxLength}
                            type="text"
                            value={this.state.text}
                            style={{fontSize: '16px', width: '100%', padding: '5px 0',  boxShadow: 'none', borderStyle: 'none', textTransform: 'uppercase'}}
                            onChange = {this.onTextChange}
                        />
                    </div>
                    <svg height="30" width="4">
                        <line x1="2" y1="0" x2="2" y2="30" style={{stroke: "lightgrey", strokeWidth: "2"}} />
                    </svg>
                    <div 
                        style={{display:'flex', flex: '20%', maxWidth: '50px', alignItems: 'center', margin: '0 2%'}}
                    >
                        <span style={{marginRight: '10px'}}>Text</span>
                        <div
                            style={{display:'flex',alignItems: 'center', cursor: 'pointer'}}
                            onClick={() => this.setState({showColorPicker: 'flex', cpClassName: 'color-picker-font'})}
                        >
                            <svg height="16" width="16">
                                <circle cx="8" cy="8" r="8" fill={this.props.fontColor} />
                            </svg>
                        </div>
                    </div>
                    <svg height="30" width="4">
                        <line x1="2" y1="0" x2="2" y2="30" style={{stroke: "lightgrey", strokeWidth: "2"}} />
                    </svg>
                    <div style={{display:'flex', flex: '20%', maxWidth: '70px', alignItems: 'center', margin: '0 2%'}}>
                        <span style={{marginRight: '10px'}}>Frames</span>
                        <div
                            style={{display:'flex',alignItems: 'center', cursor: 'pointer'}}
                            onClick={() => this.setState({showColorPicker: 'flex', cpClassName: 'color-picker-frame'})}
                        >
                            <svg height="16" width="16">
                                <circle cx="8" cy="8" r="8" fill={this.props.frameColor} />
                            </svg>
                        </div>
                    </div>
                    <svg height="30" width="4">
                        <line x1="2" y1="0" x2="2" y2="30" style={{stroke: "lightgrey", strokeWidth: "2"}} />
                    </svg>
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
                            style={{width: '100%', marginRight: '10px', marginLeft: '10px',}}
                            value={this.props.slider_value}
                            onChange={this.handleSlider}
                        />
                        <span style={{color: 'grey', fontSize: '24px'}}>A</span>
                    </div>
                </div>
                <div 
                    style={{display: this.state.showColorPicker}}
                    className={this.state.cpClassName}
                    onMouseLeave={() => this.setState({showColorPicker: 'none'})}
                >
                    <ChromePicker
                        color={ this.state.userColor }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                </div>
                <div
                    style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems:'center'}}
                    id="content3"
                >
                    {
                        this.props.frame !== 0 || this.props.font !== undefined ?
                        this.renderFrame()
                        :
                        null
                    }
                </div>

                <div
                    style={{alignSelf: 'flex-end',}}
                >
                <DropdownButton
                    bsStyle="success"
                    title="Download"
                    dropup
                    pullRight
                    onSelect={this.onDownloadSelected}
                >
                    <MenuItem eventKey="png">Download PNG</MenuItem>
                    <MenuItem eventKey="svg">Download SVG</MenuItem>
                    <MenuItem eventKey="dfx">Download DFX</MenuItem>
                    <MenuItem eventKey="eps">Download EPS</MenuItem>
                </DropdownButton>
                </div>
                {/* <div 
                    style={{position: 'absolute',  display: 'flex', alignSelf: 'flex-end',  alignItems: 'center', top: 780, cursor: 'pointer', width: '150px',}} 
                    // className = "btn-download"
                    // onClick={this.downloadContent}
                >
                    <Select 
                        options={[
                            {value: 'png', label: 'PNG'},
                            {value: 'svg', label: 'SVG'},
                            {value: 'dfx', label: 'DFX'},
                            {value: 'eps', label: 'EPS'},
                        ]}
                        placeholder={<span style={{color: 'white', marginLeft: 15   }}>Download{<i class ="fas fa-arrow-down" style={{fontSize: '14px', color:'white', marginLeft: 15}} />}</span>}
                        arrowRenderer={null}
                        onChange={this.onDownloadSelected}
                        style={{borderStyle:'none', backgroundColor: 'transparent', cursor: 'pointer', width: '150px',}}
                    />
                </div> */}
                {/* <div 
                    style={{backgroundColor: '#58c759', cursor: 'pointer', display: 'flex'}} 
                    className = "btn-download"
                    onClick={this.downloadContent}
                >
                    <span style={{color: 'white', marginRight: '10px'}}>Download</span>
                    <i class ="fas fa-arrow-down" style={{fontSize: '14px', color:'white'}} />
                </div> */}
            </div>
        );

    }
}

class Footer extends Component{
    render() {
        return (
            <div className = "wrap-footer">
                <div className = "padding-space">
                </div>
                <div className = "footer">
                    <div className="wrap-social">
                        <div style={{backgroundColor: '#3B5998'}} className = "btn-social">
                            <i class ="fa fa-facebook-f" style={{fontSize: '22px', color:'white'}} />
                            <span className="social-letter">share</span>
                        </div>
                        <div style={{backgroundColor: '#448AFF'}} className = "btn-social">
                            <i class ="fab fa-facebook-messenger" style={{fontSize: '22px', color:'white'}} />
                            <span className="social-letter">share</span>
                        </div>
                        <div style={{backgroundColor: '#55acee'}} className = "btn-social">
                            <i class ="fab fa-twitter" style={{fontSize: '22px', color:'white'}} />
                            <span className="social-letter">share</span>
                        </div>
                        <div style={{backgroundColor: '#CB2027'}} className = "btn-social">
                            <i class ="fab fa-pinterest" style={{fontSize: '22px', color:'white'}} />
                            <span className="social-letter">share</span>
                        </div>
                        <div style={{backgroundColor: '#7d7d7d'}} className = "btn-social">
                            <i class ="fa fa-envelope" style={{fontSize: '22px', color:'white'}} />
                            <span className="social-letter">share</span>
                        </div>
                        <div style={{backgroundColor: '#dc4e41'}} className = "btn-social">
                            <i class ="fab fa-google-plus" style={{fontSize: '22px', color:'white'}} />
                            <span className="social-letter">share</span>
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

export default class WebApp extends Component{
    render() {
        return (
            <Provider store={store}>
                <div className = "app">
                    <Header />
                    <Menu />
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