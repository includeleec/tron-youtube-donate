import React from 'react';
import {  Row, Col, List, Avatar } from 'antd';
import Utils from 'utils';
import styled from 'styled-components';
import { findGetParameter } from 'utils/util';
import Header from 'components/Header';
import Footer from 'components/Footer';
import 'styles/history.scss';
import TronLogoSmall from 'assets/images/tron-small.png'

const TrxIcon = styled.img`
	height: 20px;
	margin: 0 5px 0 0;
`;

class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
			data: [],
			loading: true,
    }
	} 
	
  async componentDidMount () {

		
				let tries = 0;

				const timer = setInterval(() => {

					let addr = findGetParameter('addr');
					let isAddr = Utils.tronWeb.isAddress(addr);
					let contract = Utils.contract;
					console.log(isAddr)

					if(isAddr && !!contract) {

							clearInterval(timer);

							 contract.getDonationsCount(addr).call().then((resDcount, error)=> {
									let dcount = parseInt(resDcount.length._hex,16)
									console.log('getDonationsCount', dcount)
									if(!error){
										if(dcount == 0){
											this.setState({loading:false});
											return;
										}
										let donateList = [];
										for(let i = 0; i < dcount; ++i){

											Utils.contract.getDonation(addr, i).call().then((result, error ) => {
												console.log('getDonation', result)
												let value = Utils.tronWeb.fromSun(parseInt(result.value._hex,16));
												let donor = result.name;
												donateList.push({
													donor: donor,
													value: +parseFloat(value)
												});

												console.log('donateList', donateList)
												if(donateList.length == dcount){
													this.setState({data: this.genDonateList(donateList)});
													this.setState({loading:false});
												}
											})
										}
									}
								})


					}

					if(tries >= 10) {
						clearInterval(timer);
						this.setState({loading:false});
					}
				},200);


			}
	
	genDonateList (data) {
		let donateRecords = [];
		let donateList = {};
		data.forEach(el => {
			if(el.donor in donateList){
				donateList[el.donor] += el.value;
			}
			else{
				donateList[el.donor] = el.value;
			}
		});
		for(let donor in donateList){
			donateRecords.push([donor, donateList[donor]]);
		}
		donateRecords.sort(function(a,b){return b[1]-a[1]});
		for(let i = 0; i < donateRecords.length; ++i){
			donateRecords[i] = {donor: donateRecords[i][0], value: +donateRecords[i][1].toFixed(7), rank: i+1};
		}
		return(donateRecords);
	}

  render () {
    return (
      <div>
      <Header/>
      <Row
        className = 'main-bg-color'
        style={{
          paddingBottom: '80px',
          minHeight: '85vh',
					marginTop: '-1px',
					paddingTop: '4%'
        }}
        type="flex"
        justify="space-around"
        align="middle"
      >
				<Col xs={{ span: 22 }} md = {{ span: 16}} lg={{ span: 8 }}>
         
				 <h1 style={{color:'#fff', textAlign:'center'}}>Be Donated History</h1>
         <List
				 	className="donateRecords"
					style={{
						backgroundColor: '#FFF'
					}}
					loading= {this.state.loading}
          itemLayout="horizontal"
          size="large"
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item className="donateRecord">
							<List.Item.Meta
								
								title= {`${item.donor}`} 
								description= { <div><TrxIcon src={TronLogoSmall}  /> <span className="donatedValue">{`${item.value}`} </span></div>}
							/>
      
            </List.Item>
          )}
        />
				</Col>
      </Row>
      <Footer/>
      </div>
    )
  }
}

export default History
