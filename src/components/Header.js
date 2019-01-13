import React from 'react';
import { Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import YoutubeLogo from 'assets/images/youtube.png'
import TronLogo from 'assets/images/tron-logo.png'
const { Header } = Layout;

export default () => (
    <Row span={24}>
        <Header
            className='main-bg-color'
            style={{
            color: '#FFF',
            fontSize: '2em',
            padding: '20px',
            height:'auto'
            }}
            type="flex"
            justify="center"
            align="middle"
        >
        <Link to="/">
        
            <img style={{height:'80px'}} src={TronLogo} alt="Tron" />
            <h1 style={{color:'#fff',display:'inline',margin:'0 20px'}}>+</h1>
            <img style={{height:'55px'}} src={YoutubeLogo} alt="Youtube" />
        </Link>
            
        
        </Header>
    </Row>
)