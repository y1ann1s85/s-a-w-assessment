import React from 'react';
import { Layout, Modal, Breadcrumb, Slider, Input, Icon, Row, Col } from 'antd';

// images
import Logo from '../assets/sawBigLogo.png'
import Board from '../assets/board.png';
import Caller from '../assets/caller.png';

// animations
import LightSpeed from 'react-reveal/LightSpeed';
import Jump from 'react-reveal/Jump';
import Swing from 'react-reveal/Swing';
import RubberBand from 'react-reveal/RubberBand';

// style
import './style.css';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

class SpotAWheel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            displayDivOne: 'flex',
            displayDivTwo: 'none',
            showBigLogo: false,
            showSmallLogo: false,
            showBoard: false,
            showModal: false,
            finalAmount: '',
            moneySliderScore: 0,
            monthsSliderScore: 1,
            validationAlert: false,
            userInput: null,
            showCallModal: false
        }
    }
    
    bigLogoVisible = () => {
        this.setState({
            showBigLogo: !this.state.showBigLogo
        }, 
        () => setTimeout(
            function() {
                this.setState({
                    showBigLogo: !this.state.showBigLogo
                },
                () => setTimeout (
                    function() {
                        this.setState({
                            showSmallLogo: !this.state.showSmallLogo,
                            displayDivOne: 'none',
                            displayDivTwo: 'flex'
                        },
                        () => setTimeout (
                            function() {
                                this.setState({
                                    showBoard: !this.state.showBoard
                                },
                                () => setTimeout (
                                    function() {
                                        this.setState({
                                            showModal: !this.state.showModal
                                        })
                                    }.bind(this), 1500)
                                )        
                            }.bind(this), 1500
                        )
                        )
                    }.bind(this), 1500)
                );
            }.bind(this), 2500)
        )
    }

    setMoneyScore = (value) => {
        console.log(value)
        this.setState({
            moneySliderScore: value
        })
    }

    setMonthsScore = (value) => {
        console.log(value)
        this.setState({
            monthsSliderScore: value
        })
    }

    onChange = (e) => {
        if (e.target.value.length > 0) {
            console.log(e.target.value)
            this.setState({
                userInput: e.target.value
            })    
        } else {
            this.setState({
                validationAlert: false
            })
        }
    }

    onSearch = () => {
        console.log('bla')
        let validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (validPhone.test(this.state.userInput)) {
            console.log('great')
            this.setState({
                validationAlert: false,
                showModal: false,
                showCallModal: true,
                showBoard: !this.state.showBoard
            })
        } else {
            this.setState({
                validationAlert: true
            })
        }    
    }

    closeModal = () => {
        this.setState({
            showModal: false
        },
        () => setTimeout(
            function () {
                this.setState({
                    showModal: true
                })
            }.bind(this), 2000
        )
        )
    }

    closeCallerModal = () => {
        window.location.reload();
    }

    render () {
        return(
            <>
                <Layout className="layout">
                    <Header style={{background: 'white', borderBottom: '1px solid black'}}>
                        <div className="logo">
                            <Jump when={this.state.showSmallLogo}>
                                <Swing>
                                    {this.state.showSmallLogo &&
                                    <img src={Logo} width='202px' height='35px' alt='logo' />}
                                </Swing>
                            </Jump>
                        </div>
                    </Header>
                    <Content style={{ padding: '0 50px', background: '#d2d2d2' }}>
                    <Breadcrumb style={{ margin: '16px 0', height: '50px' }} />
                        <div style={{ background: '#fff', padding: 24, minHeight: 350, display: this.state.displayDivOne, justifyContent: 'center',  alignItems: 'center', borderRadius: '15px'}}>
                            <LightSpeed right opposite when={this.state.showBigLogo}>
                                <img onLoad={this.bigLogoVisible} src={Logo} width='404px' height='70px' alt='logo'/>
                            </LightSpeed>
                        </div>
                        <div style={{ background: '#fff', padding: 24, minHeight: 350, display: this.state.displayDivTwo, justifyContent: 'center',  alignItems: 'center', borderRadius: '15px'}}>
                            {this.state.showBoard &&
                                <RubberBand>
                                    <img src={Board} height='250px' alt='billboard' />
                                </RubberBand>
                            }
                        </div>
                        <Modal
                            title=""
                            centered
                            visible={this.state.showModal}
                            onCancel={this.closeModal}
                            maskClosable={false}
                            >
                            <div style={{paddingTop: '22px'}}>
                                <p id='content1'>Καλώς ήρθατε στo πρόγραμμα δόσεων της Spotawheel!</p>
                                <p id='content2'>Επίλεξε την προκαταβολή και την διαρκεια που σε συμφέρει</p>
                            </div>
                            <div 
                                style={{
                                    height: '80px', 
                                    backgroundColor: '#01b0d7', 
                                    marginLeft: '-24px', 
                                    marginRight: '-24px'
                                }}
                            >
                                <div style={{paddingTop: '20px'}}>
                                    <Row>
                                        <Col span={4}/>
                                        <Col id='content3' span={4} style={{fontSize: '15px', opacity: '0.5', textAlign: 'left'}}>
                                            <p style={{marginBottom: '0px'}}>Μηνιαία</p>
                                            <p>Δόση</p>
                                        </Col>
                                        <Col id='content3' span={8} style={{marginTop: '-10px'}}>
                                            {this.state.moneySliderScore > 0 && this.state.monthsSliderScore > 1 &&
                                            Math.round((20000 - this.state.moneySliderScore) / this.state.monthsSliderScore)
                                            }€
                                        </Col>
                                        <Col span={8}></Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{textAlign: 'left', paddingTop: '20px'}}>
                                <span id='content4'>Προκαταβολή</span><span id='content5'> (απο 0€)</span>
                            </div>
                            <div style={{}}>
                                <Slider
                                min={0}
                                max={20000}
                                marks={{0: '0', 20000: '20000'}}
                                value={this.state.moneySliderScore}
                                defaultValue={0}
                                onChange={this.setMoneyScore}
                                tooltipVisible={false}
                                step={50}
                                />
                            </div>
                            <div style={{fontSize: '24px', color: 'black', paddingBottom: '20px', marginTop: '-20px'}}>
                                {this.state.moneySliderScore}€
                            </div>
                            <div style={{textAlign: 'left'}}>
                                <span id='content4'>Διάρκεια</span><span id='content5'> (έως 48 μηνες)</span>
                            </div>
                            <div style={{}}>
                                <Slider
                                min={1}
                                max={48}
                                marks={{1: '1', 48: '48'}}
                                value={this.state.monthsSliderScore}
                                defaultValue={1}
                                onChange={this.setMonthsScore}
                                tooltipVisible={false}
                                />
                            </div>
                            <div style={{fontSize: '24px', color: 'black', paddingBottom: '20px', marginTop: '-20px'}}>
                                {this.state.monthsSliderScore} μήνες
                            </div>
                            <div 
                                style={{
                                    backgroundColor: '#fffaad', 
                                    paddingTop: '20px', 
                                    paddingBottom: '20px', 
                                    paddingLeft: '30px', 
                                    paddingRight: '30px', 
                                    marginLeft: '-24px', 
                                    marginRight: '-24px', 
                                    marginBottom: '-24px', 
                                }}
                            >
                                <p id='content6' style={{margin: '-15px'}}>Χρειάζεσαι βοήθεια για το προγραμμα σου;</p>
                                <p id='content7' style={{margin: '-15px'}}>‘Eνας σύμβουλος της Spotawheel θα σε καλέσει άμεσα.</p>
                                <Search
                                    placeholder="Τηλέφωνο"
                                    prefix={<Icon type="phone" theme="filled" style={{ color: '#d4d4d4' }}/>}
                                    enterButton="Καλέστε με"
                                    size="large"
                                    onChange={this.onChange}
                                    onSearch={this.onSearch}
                                    allowClear={true}
                                ></Search>
                            </div>
                            <div style={{
                                height: '35px',
                                backgroundColor: '#fffaad', 
                                borderBottomLeftRadius: '8px', 
                                borderBottomRightRadius: '8px',
                                marginLeft: '-24px', 
                                marginRight: '-24px', 
                                marginBottom: '-24px'
                                }}
                            >
                                {this.state.validationAlert &&
                                    <p style={{paddingLeft: '24px', fontSize: '10px', color: 'red', textAlign: 'left', paddingTop: '10px', marginBottom: '-10px'}}>*Παρακαλώ εισάγετε έναν έγκυρο αριθμό</p>
                                }
                            </div>
                        </Modal>
                        <Modal
                            title=""
                            centered
                            visible={this.state.showCallModal}
                            onCancel={this.closeCallerModal}
                            maskClosable={false}
                        >
                            <p id="content8">Θα είμαστε σύντομα κοντά σας!</p>
                            <div>
                                <img id='caller' src={Caller} width='100px' alt='caller' />
                            </div>
                        </Modal>
                    </Content>
                    <Footer style={{ textAlign: 'center', height: '64px', borderBottom: '1px solid black', background: '#d2d2d2' }}></Footer>
                </Layout>
            </>
        )
    }
}

export default SpotAWheel;