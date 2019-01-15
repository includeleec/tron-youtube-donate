import React from 'react';
import { Input, Row, Col, Form, Icon, Card, Button, Alert, Avatar, message} from 'antd';
import { findGetParameter } from 'utils/util';
import Utils from 'utils';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { event } from 'utils/event';
import TronLogoSmall from 'assets/images/tron-small.png'

const FormItem = Form.Item;
const { TextArea } = Input;

class DonateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // showMetamaskError: false,
      showTronlinkError: false,
      showNetworkWarning: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let that = this;
    this.props.form.validateFields((err, values) => {
      if (!err && window.tronWeb) {
        /* check metamask login status */
        window.tronWeb.trx.getAccount().then(e => {
          console.log(e);

          
          if(e.length == 0){
            that.setState({showTronlinkError: true});
          }
          else{
            that.setState({showTronlinkError: false});
            that.donateCall(values, e[0]);
          }
        });
      } else {
        that.setState({showTronlinkError: true});
      }
    })
  }

  donateCall = (values, addr) => {
    let that = this;

    console.log(values, addr)

    console.log("getNodeInfo",window.tronWeb.trx.getNodeInfo())

    let donateTransactionOptions = {
      callValue: parseInt(tronWeb.toSun(values.damount)), // data type must be equal integer
      shouldPollResponse:true
    }
    console.log(donateTransactionOptions);
    Utils.contract.donate(values.daddr, values.ddonor, values.dmssg).send(donateTransactionOptions,(error, result)=> {
      if (!error) {
        // console.log(result);
        event.on('NewDonationInMsg', this.msgShow);
        console.log('r', result)
      } else {
        console.log('e', error)
      }
    });

  }

  msgShow(result) {
    console.log('msgShow', result)
    message.success(<span> View transaction result on <a href={`${TRONSCAN_URL}#/transaction/${result.transaction}`}>Tronscan</a></span>, 8);
  }
    
  componentDidMount () {
    this.props.form.setFieldsValue({
      daddr: findGetParameter('addr')
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
      <Header/>
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
        <Col style={{
          width: '45vh'
        }}>
          <Card title={
            <div>
              <Avatar size={42} src={TronLogoSmall}/> 
              <span> Donate Now</span>
            </div>
          } style ={{marginTop: '12%'}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div> Streamer's Address </div>
              <FormItem>
                {getFieldDecorator('daddr', {
                  rules: [{ required: true, message: `Please input the streamer's wallet address!` }]
                })(
                  <Input prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Address"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('ddonor', {
                  rules: [{ required: true, message: 'Please input your donate username' }]
                })(
                  <Input maxLength={30} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Donor Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('damount', {
                  rules: [{ required: true, message: 'Please input the amount of TRX' }]
                })(
                  <Input type="text" pattern="[0-9.]*" prefix={<Icon type="red-envelope" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="0.00 TRX" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('dmssg', {
                  rules: [{ required: true, message: 'Please say something :o' }]
                })(
                  <TextArea maxLength={100} prefix={<Icon type="red-envelope" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Donate messages (100 characters)" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" block={true} htmlType="submit" className="login-form-button">
                  Donate
                </Button>
              </FormItem>
            </Form>
            { this.state.showMetamaskError ? <div
              style = {{marginBottom: '10px'}}
              justify="space-around"
            > <Alert
                message="Metamask not login"
                description={ <div>Please ensure you have installed <a href="https://metamask.io">Metamask</a> and login </div>}
                type="error"
                showIcon
              /></div> : null }
            { this.state.showNetworkWarning ? <div> <Alert
              message="Network warning"
              description= { <div>Please switch to {NETWORK_NAME} </div>}
              type="warning"
              showIcon
            /> </div> : null }
          </Card>
        </Col>
      </Row>
      <Footer/>
      </div>
    )
  }
}

const WrappedDonateForm = Form.create()(DonateForm)
export default WrappedDonateForm
