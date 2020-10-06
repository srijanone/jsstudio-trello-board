import React from 'react';
import './style.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className={`Footer ${this.props.className}`} style={{ paddingLeft: "600px", paddingTop: "14px" }}>
        <p>Powered by <a className="link" target="_blank" rel="noopener noreferrer" href="https://www.srijan.net/">Srijan Technologies</a></p>
      </footer>
    )
  }
}

export default Footer;
