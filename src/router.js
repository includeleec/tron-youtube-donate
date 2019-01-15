import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'containers/Home';
import Donate from 'containers/Donate';
import Notifications from 'containers/Notification';
import History from 'containers/History'
import NotFound from 'containers/NotFound';
import TronWeb from 'tronweb';
import Utils from 'utils';
import { event } from 'utils/event';

const FOUNDATION_ADDRESS = "TCq9RymCnquChQX6xRXxNRk4hriqkWxhLa"

class RootRouter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        currentMessage: {
            message: '',
            loading: false
        },
        messages: {
            recent: {},
            featured: []
        }
    }
  }

  async componentDidMount() {

      await new Promise(resolve => {

          const tronWebState = {
              installed: !!window.tronWeb,
              loggedIn: window.tronWeb && window.tronWeb.ready
          };

          if(tronWebState.installed) {
              this.setState({
                  tronWeb:tronWebState
              });

              return resolve();
          }

          let tries = 0;

          const timer = setInterval(() => {
              if(tries >= 10) {

                const TRONGRID_API = 'https://api.shasta.trongrid.io';

                const HttpProvider = TronWeb.providers.HttpProvider;

                const fullNode = new HttpProvider(TRONGRID_API);
                const solidityNode = new HttpProvider(TRONGRID_API);
                const eventServer =  TRONGRID_API;
                const privateKey = '08ec350a7e5d0e557b536c1523331724029627519e5fce198f3388efa9b60f51';

                window.tronWeb = new TronWeb(
                    fullNode,
                    solidityNode,
                    eventServer,
                    privateKey
                );

                  this.setState({
                      tronWeb: {
                          installed: false,
                          loggedIn: false
                      }
                  });

                  clearInterval(timer);
                  return resolve();
              }

              tronWebState.installed = !!window.tronWeb;
              tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

              if(!tronWebState.installed) {
                return tries++;
              }

              this.setState({
                  tronWeb: tronWebState
              });

              resolve();
          }, 100);
      });

      if(!this.state.tronWeb.loggedIn) {

          window.tronWeb.on('addressChanged', () => {
              if(this.state.tronWeb.loggedIn)
                  return;

              this.setState({
                  tronWeb: {
                      installed: true,
                      loggedIn: true
                  }
              });
          });
      }

      await Utils.setTronWeb(window.tronWeb);
      
      this.startEventListener()
      
  }

  // Polls blockchain for smart contract events
  startEventListener() {

    // NewDonation
    Utils.contract.NewDonation().watch((err,  result ) => {
        if(err) {
          return console.error('Failed to bind event listener:', err);
        } else {
          console.log('Detected new NewDonation:', result); // result.transaction
          // emit event in Notification page
          event.emit('NewDonationInMsg', result);
          event.emit('NewDonationInModal', result);

        }
    });

  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/donate' component={Donate} />
          <Route path='/noti' component={Notifications} />
          <Route path='/history' component={History} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default RootRouter;
