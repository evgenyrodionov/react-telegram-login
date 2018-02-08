// @flow
import React from 'react';

export default class TelegramButton extends React.Component {
  constructor(props) {
    super(props);
  }

  dataOnauth(user, self) {
    self.props.dataOnauth(user);
  }

  componentDidMount() {
    const self = this;
    const { botName, dataSize, requestAccess, usePic } = this.props;
    window.TelegramLoginWidget = {
      callback: this.dataOnauth,
      dataOnauth: function(user) {
        this.callback(user, self);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?2';
    script.setAttribute('data-telegram-login', botName || 'samplebot');
    script.setAttribute('data-size', dataSize || 'large');
    script.setAttribute('data-request-access', requestAccess || 'write');
    script.setAttribute('data-userpic', !usePic);
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    script.async = true;
    self.instance.appendChild(script);
  }

  render() {
    return (
      <div
        id="telegram-button"
        ref={component => {
          this.instance = component;
        }}
      />
    );
  }
}