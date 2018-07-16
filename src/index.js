import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './otf.css';
import fonts from './assets/fonts.json';
// import frames from './assets/frames.json';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Provider } from 'react-redux';
import store from './store'
import { connect } from 'react-redux';


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
        this.props.dispatch({type: 'SET_FONT_BUILDER', font_index: index})
        this.props.dispatch({type: 'SET_FRAME_BUILDER', frame_index: undefined});
        if(index === 0 || index === 2)
            this.props.dispatch({type: 'SET_MAX_LENGTH', maxLength: 3})
        else if(index === 1)
            this.props.dispatch({type: 'SET_MAX_LENGTH', maxLength: 2})
        else if(index === 3 || index === 4)
            this.props.dispatch({type: 'SET_MAX_LENGTH', maxLength: 1})
        else
            this.props.dispatch({type: 'SET_MAX_LENGTH', maxLength: null})
    }

    render() {
        let _this = this
        return(
            <div className = "wrap-fonts">
                <div style={{margin: '10px 0 15px 0'}}>
                    <span>Fonts</span>
                </div>
                <div style={{display: 'flex'}}>
                {/* {
                    fonts.map(function(name, index) {
                        return (
                            <div 
                                style={{
                                // display: 'inline-block',
                                // width: '30%',
                                // height: 'auto',
                                // marginRight: '2%',
                                // background: 'white',
                                    border: index === _this.props.font_index ? '1px solid #0e9bd0' : null,
                                }} 
                                dangerouslySetInnerHTML={{ __html: fonts[fonts.length - 1 - index]['svg_preview'].replace('<svg ', '<svg width="100%" height="100%" ') }}
                                className = "font"
                                onClick={() => _this.fontClick(index)}
                                >
                            </div>
                        )
                    })
                } */}
                <div className="font">
                    {/* <span style={{fontFamily: 'ArtDecograms-Regular', fontSize: '30px'}}>ABC</span> */}
                    DAFS
                </div>
                <div className="font">
                    {/* <span style={{fontFamily: 'ArtMono-Regular', fontSize: '30px'}}>ABC</span> */}
                </div>
                <div className="font">
                    {/* <span style={{fontFamily: 'Aunigramia-Regular', fontSize: '30px'}}>ABC</span> */}
                </div>
                <div className="font">
                    <span style={{fontFamily: 'AvenueMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'C&SMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'Duograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'FMMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'InitialsD-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'JasmineMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'Marionograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'Monogramia3-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'Monogramia4-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'SelinaMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'STDMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'Triograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'WeLoveMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
                <div className="font">
                    <span style={{fontFamily: 'YAMMonograms-Regular', fontSize: '30px'}}>ABC</span>
                </div>
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
        this.props.dispatch({type: 'SET_FRAME_BUILDER', frame_index: index});
        this.props.dispatch({type: 'SET_FONT_BUILDER', font_index: undefined});
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
                <div>
                {
                [...Array(200)].map((obj, index) =>
                    (
                    <div
                        style={{
                            border: index === _this.props.frame_index ? '1px solid #0e9bd0' : null,
                        }}
                        className="frame"
                        onClick = {() => _this.onFrameClick(index)}
                    >
                        <img src={require('./assets/frames/' + (index + 1) + '.svg')} alt="Frame" />
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
        }
    }

  
    onTextChange = (event) => {
        var text = event.target.value;
        let filter = text[text.length - 1];
        if((filter <= 'z' && filter >= 'a') || (filter <= 'Z' && filter >= 'A') || !filter)
            this.setState({text: text.toLowerCase()});
    }

    renderLetter = () =>{
        // if(this.props.font_index === 0)
        //     return this.renderLetter1();
        // else if(this.props.font_index === 1)
        //     return this.renderLetter2();
        // else if(this.props.font_index === 2)
        //     return this.renderLetter3();
        // else if(this.props.font_index === 3)
        //     return this.renderLetter4();
        // else if(this.props.font_index === 4)
        //     return this.renderLetter5();
        // else
        //     return this.renderOtf(this.props.font_index);

        return this.renderOtf(this.props.font_index);

    }
    renderLetter1 = () => {

        let letters = require('./assets/font/1/letters.json');

        return (
            <div style={{display: 'flex', width: '228px', height: '228px', justifyContent: 'center', alignItems: 'center'}}>
            {
                this.state.text[0] >= 'a' && this.state.text[0] <= 'z'?
                <div style={{
                    width: '33%',
                    marginRight: '10px',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[0]]['left']}} ></div>
                :
                null
            }
            {
                this.state.text[1] ?
                <div style={{
                    width: '33%',
                    marginRight: this.state.text.length > 2 ? '10px' : '0px',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[1]][this.state.text.length > 2 ? 'middle' : 'right']}} ></div>
                :null
            }
            {
                this.state.text[2] ?
                <div style={{
                    width: '33%',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[2]]['right']}} ></div>
                :null
            }
            </div>
        )
        
    }

    renderLetter2 = () => {

        let letters = require('./assets/font/2/letters.json');

        return (
            <div style={{display: 'flex', width: '228px', height: '228px', justifyContent: 'center', alignItems: 'center',}}>
            {
                this.state.text[0] ?
                <div style={{
                    width: '50%',
                    marginRight: '10px',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[0]]['left']}} ></div>
                :
                null
            }
            {
                this.state.text[1] ?
                <div style={{
                    width: '50%',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[1]]['right']}} ></div>
                :null
            }
            </div>
        )
        
    }
    renderLetter3 = () => {

        let letters = require('./assets/font/3/letters.json');

        return (
            <div style={{display: 'flex', width: '228px', height: '228px', justifyContent: 'center', alignItems: 'center',}}>
            {
                this.state.text ?
                <div style={{
                    width: this.state.text.length > 1 ? '33%' : '66%',
                    marginRight: '10px',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[0]][this.state.text.length > 1 ? 'left' : 'middle']}} ></div>
                :
                null
            }
            {
                this.state.text[1] ?
                <div style={{
                    width: this.state.text.length > 2 ? '90%' : '33%',
                    marginLeft: this.state.text.length > 2 ? '-35px' : '-50px',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[1]][this.state.text.length > 2 ? 'middle' : 'right']}} ></div>
                :null
            }
            {
                this.state.text[2] ?
                <div style={{
                    width: '33%',
                    marginLeft: '-25px'
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[2]]['right']}} ></div>
                :null
            }
            </div>
        )
    }
    renderLetter4 = () => {

        let letters = require('./assets/font/4/letters.json');

        return (
            <div style={{display: 'flex', width: '228px', height: '228px', justifyContent: 'center', alignItems: 'center',}}>
            {
                this.state.text ?
                <div style={{
                    width: '100%',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[0]]}} ></div>
                :
                null
            }
            </div>
        )
    }

    renderLetter5 = () => {

        let letters = require('./assets/font/5/letters.json');

        return (
            <div style={{display: 'flex', width: '228px', height: '228px', justifyContent: 'center', alignItems: 'center',}}>
            {
                this.state.text ?
                <div style={{
                    width: '100%',
                }} dangerouslySetInnerHTML={{ __html: letters[this.state.text[0]]}} ></div>
                :
                null
            }
            </div>
        )
    }


    renderOtf = (font_index) => {
        let font = 'ArtDecograms-Regular';
        // if(font_index === 5)
        //     font = "ArtDecograms-Regular";
        // else if(font_index === 6)
        //     font = "CollegeStarFull";
        // else if(font_index === 7)
        //     font = "HitchHikerRegular";
        // else if(font_index === 8)
        //     font = "DoubleTrouble";
        // else if(font_index === 9)
        //     font = "BlossomyRegular";
        // else if(font_index === 10)
        //     font = "EMFunNeverEnds";
        return (
            <div style={{display: 'flex', maxWidth: '500px', height: '228px', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
                <span style={{fontFamily: font, fontSize: '72pt',}}>{this.state.text}</span>
            </div>
        )
    }

    renderFrame = () => {
        return (
            <div style={{display: 'flex', width: '456px', height: '456px', justifyContent: 'center', alignItems: 'center',}}>
            {
                <div style={{
                    width: '100%',
                }}>
                    <img src={require('./assets/frames/' + (this.props.frame_index + 1) + '.svg')} alt="Frame"/>
                </div>
            }
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
                    <div style={{display:'flex', flex: '20%', justifyContent: 'space-between',  maxWidth: '70px', alignItems: 'center', margin: '0 2%'}}>
                        <span>Text</span>
                        <svg height="16" width="16">
                            <circle cx="8" cy="8" r="8" fill="red" />
                        </svg>
                        <svg height="16" width="16">
                            <circle cx="8" cy="8" r="8" fill="black" />
                        </svg>
                    </div>
                    <svg height="30" width="4">
                        <line x1="2" y1="0" x2="2" y2="30" style={{stroke: "lightgrey", strokeWidth: "2"}} />
                    </svg>
                    <div style={{display:'flex', flex: '20%', justifyContent: 'space-between', maxWidth: '90px', alignItems: 'center', margin: '0 2%'}}>
                        <span>Frames</span>
                        <svg height="16" width="16">
                            <circle cx="8" cy="8" r="8" fill="chocolate" />
                        </svg>
                        <svg height="16" width="16">
                            <circle cx="8" cy="8" r="8" fill="black" />
                        </svg>
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
                        />
                        <span style={{color: 'grey', fontSize: '24px'}}>A</span>
                    </div>
                </div>
                <div
                    style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems:'center'}}
                >
                    {
                        this.props.font_index !== undefined ?
                        this.renderLetter()
                        :
                        null
                    }
                    {
                        this.props.frame_index !== undefined ?
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

class App extends Component{
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
        font_index: state.appSetting.font_index,
        maxLength: state.appSetting.maxLength,
        frame_index: state.appSetting.frame_index,
    }
}

const Fonts = connect(mapStateToProps)(FontsComponent);
const Builder = connect(mapStateToProps)(BuilderComponent);
const Frames = connect(mapStateToProps)(FramesComponent);


ReactDOM.render(<App />, document.getElementById('root'));
