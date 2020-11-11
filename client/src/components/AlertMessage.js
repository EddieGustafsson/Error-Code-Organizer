import React from 'react';
import { Message } from 'semantic-ui-react';

class AlertMessage extends React.Component {
  render() {

    const alerts = {
        FAILURE: 'failure',
        SUCCESS: 'success',
        WARNING: 'warning',
        CONNECTION: 'connection'
    }

    //let alert = alerts.CONNECTION;

    switch(alert) {
        case alerts.FAILURE:
            return(
                <Message header='FAILURE' content='Sorry, we had some technical problems during your last operation.' icon='exclamation triangle' negative />
            )
        case alerts.WARNING:
            return(
                <Message header='WARNING' content='We had some problems with your last request.' icon='exclamation triangle' warning />
            )
        case alerts.SUCCESS:
            return(
                <Message header='SUCCESS' content='Everything looks good from here, boss.' icon='check circle' positive />
            )
        case alerts.CONNECTION:
            return(
                <Message header='CONNECTION' content='Unable to connect with the server. Check your internet connection and try again.' icon='plug' negative />
            )
        default:
            return(null)
    }

  }
}

export default AlertMessage;
