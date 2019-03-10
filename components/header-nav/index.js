import React from 'react';
import { Link } from '../../routes';

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
    const { layout } = this.props;

    const navLinks = [
      {
        text: 'Home',
        to: '/',
      },
      {
        text: 'Recycling',
        to: '/category/recycling',
      },
    ];
    return (
      <header className="header  flex">
        <div className="logo">
          <Link to="/">
            <img
              className="w3"
              src="/static/images/punch.png"
              alt={layout.data.site_name}
            />
          </Link>
        </div>

        <nav className="nav  flex">
          <ul className="nav__list">
            {navLinks.map(link => (
              <li className="nav__item">
                <Link to={link.to}><a className="link  black">{link.text}</a></Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }
}
