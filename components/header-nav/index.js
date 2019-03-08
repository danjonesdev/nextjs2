import React from "react";
import { Link } from "../../routes";

export default class extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     menuOpen: false
  //   };
  //   this.handleMenuOpen = this.handleMenuOpen.bind(this);
  //   this.handleClickMenuItem = this.handleClickMenuItem.bind(this);
  // }
  //
  // handleMenuOpen() {
  //   this.setState({ menuOpen: !this.state.menuOpen });
  // }
  //
  // handleClickMenuItem() {
  //   this.setState({ menuOpen: false });
  // }

  render() {
    return (
      <header className="header  flex">
        <div className="logo">
          <Link to="/">
            <img
              className="w3"
              src="/static/images/punch.png"
              alt={this.props.layout.data.site_name}
            />
          </Link>
        </div>

        <nav className="nav  flex">
          <ul class="nav__list">
            <li class="nav__item">
              <Link to="/category">
                Category
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
