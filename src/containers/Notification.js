import React from 'react';
import { Row, Col, List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { findGetParameter } from 'utils/util';
import Utils from 'utils'
import { event } from 'utils/event';
import TronLogoSmall from 'assets/images/tron-small.png'
import YouTube from 'react-youtube';
// import CoinMarketCap from 'coinmarketcap-api'

import 'styles/notification.scss'


const PromptText = styled.div`
	color: #000;
	margin-top: 20%;
	font-size: 3em;
	text-align: center;
	-webkit-transition: opacity 5s ease-in-out;
	-moz-transition: opacity 5s ease-in-out;
	-ms-transition: opacity 5s ease-in-out;
	-o-transition: opacity 5s ease-in-out;
	opacity: 1;
`
const IconImage = styled.img`
	display: inline-block !important;
	height: 50px;
	margin-bottom:5px;
`;

const DonateMessageWrapper = styled.div`
	animation: popup 1s;
`;

const DonateMessageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center; 
`;

const DonateMessageTitle = styled.div`
	font-size: 4em;
	margin: 0 10px;
	color: #fff;
	// text-shadow:
	// 1px 1px 0 #000,
	// -1px -1px 0 #000,  
 	// 1px -1px 0 #000,
 	// -1px 1px 0 #000,
	// 1px 1px 0 #000;
	text-shadow: 2px 2px #000;
`;

class NotiPage extends React.Component {
    constructor (props) {

			super(props)    
			this.state = {
				isBlank: false,
				donationAlert: false,
				donorAddress: '',
				donorName: '',
				recvAddress: '',
				donateMssg: '',
				donateValue: 0.0,
				liveuId:''
			}
    }

    componentDidMount () {

		let liveuId = findGetParameter('liveId');
		setTimeout( () => { this.setState({isBlank: true })}, 3000);
		
		event.on('NewDonationInModal', this.valueChange);
		
		this.setState({
			showYoutube: true,
			liveuId
		})

		setInterval(()=> {
			this.getTrxPrice()
		},3000)
	}
	

	valueChange = result => {
		console.log('valueChange', result.result);
		let addr = findGetParameter('addr');

		console.log( Utils.tronWeb.address.fromHex(result.result.raddr).toLowerCase() );

		console.log( addr.toLowerCase());
		if(addr.toLowerCase() != Utils.tronWeb.address.fromHex(result.result.raddr).toLowerCase() ) return;

		console.log('change state, ready to show modal')
		this.setState({
			donationAlert: true,
			donorAddress: result.result.daddr,
			donorName: result.result.donor,
			recvAddress: result.result.raddr,
			donateMssg: result.result.message,
			donateValue: +parseFloat(Utils.tronWeb.fromSun(result.result.value )).toFixed(7)
		});

		setTimeout( () => { this.setState({donationAlert: false })}, 5000);
	}

	getTrxPrice() {

		// const apiKey = '52a93259-7950-488e-8e7c-f57d609b32b0';
		// let coinMarketCapClient = new CoinMarketCap(apiKey);
		// coinMarketCapClient.getMetadata({symbol: ['TRX']}).then(console.log).catch(console.error)
	}

    render() {
		const opts = {
			width: '100%',
			height: '938',
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 1
			}
		  };
		
		const COINMARKET_EX_LOGO_BASE = 'https://s2.coinmarketcap.com/static/img/exchanges/32x32/';

		  const data = [
			{
			  title: 'Upbit',
			  avatar: COINMARKET_EX_LOGO_BASE + '351.png',
			  url:'https://upbit.com'
			},
			{
			  title: 'Binance',
			  avatar: COINMARKET_EX_LOGO_BASE + '270.png',
			  url:'https://www.binance.com'
			},
			{
				title: 'Huobi',
				avatar: COINMARKET_EX_LOGO_BASE + '102.png',
				url:'https://www.hbg.com'
			},
			{
				title: 'Bit-Z',
				avatar: COINMARKET_EX_LOGO_BASE + '300.png',
				url:'https://www.bit-z.com'
			},
			{
				title: 'HitBTC',
				avatar: COINMARKET_EX_LOGO_BASE + '42.png',
				url:'https://hitbtc.com'
			},
			{
				title: 'BitForex',
				avatar: COINMARKET_EX_LOGO_BASE + '403.png',
				url:'https://bitforex.com'
			},
			{
				title: 'Bithumb',
				avatar: COINMARKET_EX_LOGO_BASE + '200.png',
				url:'https://www.bithumb.com/'
			},
			{
				title: 'OKEx',
				avatar: COINMARKET_EX_LOGO_BASE + '294.png',
				url:'https://www.okex.com'
			},
			{
				title: 'DigiFinex',
				avatar: COINMARKET_EX_LOGO_BASE + '407.png',
				url:'https://www.digifinex.com'
			},
			{
				title: 'RightBTC',
				avatar: COINMARKET_EX_LOGO_BASE + '323.png',
				url:'https://www.rightbtc.com'
			},
			{
				title: 'MBAex',
				avatar: COINMARKET_EX_LOGO_BASE + '386.png',
				url:'https://www.mbaex.com/'
			},
			{
				title: 'Gate.io',
				avatar: COINMARKET_EX_LOGO_BASE + '302.png',
				url:'https://gate.io'
			}
		  ];


		  


		return (
			<Row
				style={{
					height: '100vh',
					transition: 'background-color 5s linear',
					background: 'black'
				}}

				type="flex"
				justify="space-around"
				align="top"
				>
					<Col  span={18} style={{position:'relative', textAlign:'center'}}>
						
						{  this.state.showYoutube ?  <YouTube
							videoId={this.state.liveuId}
							opts={opts}
						/>  : null}

						{ this.state.donationAlert ? 
						<DonateMessageWrapper style={{marginTop:'5%',position: "absolute", left: "50%", zIndex:"100", top:"20px"}}>
							<DonateMessageContainer>
								<DonateMessageTitle style={{color: '#c31928'}}> {`${this.state.donorName}`} </DonateMessageTitle> 
							</DonateMessageContainer>
							<DonateMessageContainer>
								<DonateMessageTitle style={{fontSize: '3em'}}> + <IconImage src={TronLogoSmall} /> {`${this.state.donateValue}` }</DonateMessageTitle>
							</DonateMessageContainer>
							<DonateMessageContainer>
								<DonateMessageTitle style={{fontSize: '3.2em', textAlign: 'center'}}> {`${this.state.donateMssg}`} </DonateMessageTitle>
							</DonateMessageContainer>
						</DonateMessageWrapper>
						: null	}
					
					</Col>

					<Col  span={6}>
						<div style={{padding:"10px 5px"}}>
							<img src={TronLogoSmall} />
							<h1 className="price-now">¥0.156747 CNY</h1>
						</div>
						<List
							style={{color:'#fff', padding:"10px"}}
							itemLayout="horizontal"

							dataSource={data}
							renderItem={item => (
							<List.Item>
								<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={<a href={item.url}>{item.title}</a>}
								/>
							</List.Item>
							)}
						/>

						<div style={{padding:"10px 20px"}}>
							<h1 className="donate-now"><Link to={'/donate?addr=' +findGetParameter('addr') + '&liveId='+findGetParameter('liveId') }> <Icon type="heart" theme="filled" /> Donate now</Link></h1>
						</div>

					</Col>

			</Row>
		)
    }

}

export default NotiPage
