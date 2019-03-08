import React from "react";
import { Link } from "../../routes";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this);
  }

  handleMenuOpen() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleClickMenuItem() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <header className="header">
        <nav className="nav  flex">
          <div className="w3">
            <div className="link  cp">
              <Link to="/">
                <img
                  className="w3"
                  src="/static/images/punch.png"
                  alt={this.props.layout.data.site_name}
                />
              </Link>
            </div>
          </div>
          <div className="flex">
            <ul class="nav__list  list-none  flex  flex-wrap  w-100  pa0  ma0">
              <li class="nav__item  rel  flex  align-center">sss</li>
              <li class="nav__item  rel  flex  align-center">aa</li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
