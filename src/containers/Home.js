import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Col, Card, Button, Avatar, Carousel, Icon, Tooltip, Divider, Timeline, Modal, Tag, message } from 'antd';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import * as path from 'path';
import 'styles/homepage.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';
 
const cookies = new Cookies();
const IconButton = styled(Button)`
  margin: 0 -11px;
  border: 0px;
`

const MarginRow = styled(Row)`
  margin-bottom: 12px;
`

const StyledCarousel = styled(Carousel)`
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #333;
  overflow: hidden;
`;

const CarouselText  = styled.h2`
  color: #FFF;
`;

const IconImage = styled.img`
  height: 28px;
  display: inline-block !important;
  margin: 0 5px;
`;

const ArrowLeft = styled.div`
  width: 0; 
  height: 0; 
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent; 
  border-right: 10px solid #FFF; 
  margin-top: 6px;
  margin-right: -5px;
`;

const ReferenceCols = styled.div`
  text-align:center;
  width: 33%;
`;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      liveurl:'',
      addr: '',
      donatelink: '',
      notilink: '',
      historylink: '',
      demovisible: false,
    };
  } 

  componentDidMount() {
    let addr = cookies.get('addr');
    let liveurl = cookies.get('liveurl');
    let liveId = '';

    if(addr) {
      if(liveurl) {
        liveId = liveurl.split('/')[3];
      }
      this.updateAddrLinks(addr, liveId);

    }

  }

  onChangeLiveurl = (event) => {
    let liveurl = event.target.value;
    cookies.set('liveurl', liveurl, {path:'/', maxAge:603400 });
    this.setState({ liveurl });

    this.changeLink();
  }

  updateInputValue = (event) => {
    let addr = event.target.value;
    this.updateAddrLinks(addr);
  } 

  changeLink() {
    let addr = cookies.get('addr');
    let liveurl = cookies.get('liveurl');

    let liveId = ''
    if(liveurl) {
      liveId = liveurl.split('/')[3];
    }

    let liveAppend = liveId ? '&liveId='+liveId : '';

    let query = '?addr=' + addr + liveAppend;
    let donatelink =  'donate'+query;
    let notilink = 'noti' + query;
    let historylink = 'history' + query;

    if(liveId) {
      this.setState({addr: addr, donatelink: donatelink,notilink: notilink, historylink : historylink , liveurl:'https://youtu.be/'+liveId})

    } else {
      this.setState({addr: addr, donatelink: donatelink,notilink: notilink, historylink : historylink })
    }

  }

  updateAddrLinks = (addr, liveId='') => {

    let liveAppend = liveId ? '&liveId='+liveId : '';

    let donatelink =  'donate?addr=' + addr + liveAppend;
    let notilink = 'noti?addr=' + addr + liveAppend;
    let historylink = 'history?addr=' +  addr + liveAppend;
    cookies.set('addr', addr, {path: '/', maxAge: 603400});
    if(liveId) {
      this.setState({addr: addr, donatelink: donatelink,notilink: notilink, historylink : historylink , liveurl:'https://youtu.be/'+liveId})

    } else {
      this.setState({addr: addr, donatelink: donatelink,notilink: notilink, historylink : historylink })
    }

  }

  showDemo = (e) => {
    this.setState({
      demovisible: true,
    });
  }

  hideDemo = (e) => {
    this.setState({
      demovisible: false,
    });
  }

  copyLink = (link) => {
    var textField = document.createElement('textarea');
    textField.innerText = window.location.href + this.state[link];
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    message.success('Link copyied to clipboard!');
  };

  render() {

    return (
      <div>  
      <Header />
      <Row
        className = 'main-bg-color'
        style={{
          paddingBottom: '80px',
          minHeight: '85vh',
          marginTop: '-1px'
        }}
        type="flex"
        justify="space-around"
        align="middle"
      >


      
      <Col xs={{ span: 22 }} md = {{ span: 16}} lg={{ span: 8 }}>

      <div style = {{borderRadius: '10px'}}>
              <StyledCarousel autoplay>
              <div> <CarouselText><Icon type="heart" /> TRX donations for donating live</CarouselText></div>
              <div> <CarouselText><Icon type="team" /> 人间自有真情在</CarouselText></div>
              <div> <CarouselText><Icon type="check" /> Enter live URL and TRX address, Try it!</CarouselText></div>
              </StyledCarousel> 
            </div>


        <Card className = "HompagemMainCard" style = {{margin: '20px 0'}}  >
        <MarginRow>
            <div>Donate Live URL</div> 
            <Input 
              value={ this.state.liveurl.length ? this.state.liveurl : ''}
              placeholder="Donate Live URL" onChange={evt => this.onChangeLiveurl(evt)}/>
            </MarginRow>

          <MarginRow>
            <div>Tron Wallet address</div> 
            <Input 
              value={ this.state.addr.length ? this.state.addr : ''}
              placeholder="Tron Address" onChange={evt => this.updateInputValue(evt)}/>
            </MarginRow>
          <MarginRow>
            <Input
                placeholder="Generated donate link for this address"
                value={ this.state.donatelink.length ? path.join(window.location.href,this.state.donatelink) : ''}
                addonBefore= {  
                  <Tooltip placement="topLeft" title="People donate directly to this address through this link">
                  <Link to = {this.state.donatelink}> <span className="red">Create a Donate</span></Link>
                  </Tooltip>
                }
                addonAfter={<IconButton size="small" icon="copy" onClick={ () => this.copyLink('donatelink')} />}
                disabled
            />
          </MarginRow>
          <MarginRow>
            <Input
                placeholder="Generated live link for this address"
                value={ this.state.notilink.length ? path.join(window.location.href,this.state.notilink) : ''}
                addonBefore={
                  <Tooltip placement="topLeft" title="Streamer displays donate message through this link">
                    <Link to = {this.state.notilink}> <span className="blue">Youtube Live</span> </Link>
                  </Tooltip>
                }
                addonAfter={<IconButton size="small" icon="copy" onClick={ () => this.copyLink('notilink')}/>}
                disabled
            />
          </MarginRow>
          <MarginRow>
            <Input
                placeholder="Generated donate history link for this address"
                value={ this.state.historylink.length ? path.join(window.location.href,this.state.historylink) : ''}
                addonBefore={
                  <Tooltip placement="topLeft" title="Streamer checks the top donors and donate history here">
                    <Link to = {this.state.historylink}> <span className="yellow">Be Donated History</span> </Link>
                  </Tooltip>
                }
                addonAfter={<IconButton size="small" icon="copy" onClick={ () => this.copyLink('historylink')}/>}
                disabled
            />
          </MarginRow>
        </Card>

        <Divider style={{marginTop: '33px'}}>
          <div style={{display: 'flex'}}>
            <span style={{color: "#000", fontSize: "16px", backgroundColor: "#FFF", padding: "5px 15px", borderRadius: "10px"}}>0 fee,100x fast</span>
          </div>
        </Divider>

        <Card className = "HomepageSubCard" style = {{margin: '20px 0'}}  title= { "Source Code" }>
          
          <div style={{display: 'flex',justifyContent: 'center'}}>
            <ReferenceCols>
              <a href={`${TRONSCAN_URL}/#/contract/${CONTRACT_ADDRESS}`} target='_blank'>
                <IconImage src="assets/images/tronscan.png" /> 
              </a>
            </ReferenceCols>
            
            <ReferenceCols>
              <a href={GIT_HOMEPAGE} target='_blank'>
                <IconImage src="assets/images/github.png" /> 
                <span className="linkUrlSpan">Github</span>
              </a>
            </ReferenceCols>
          </div>
        </Card>
      </Col>
    </Row>
    <Footer/>
    </div>  
    );
  }
}

export default Home;
