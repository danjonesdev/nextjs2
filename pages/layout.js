import Head from 'next/head'
import { Link } from '../routes'

import config from '../config';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this)
  }

  handleMenuOpen() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleClickMenuItem() {
    this.setState({ menuOpen: false })
  }

  renderHead() {
    return (
      <Head className="{this.props.className}">
        <title>{this.props.title || 'Not Found'} - {this.props.layout.data.site_name}</title>
        <meta name="description" content={this.props.description || config.meta.description} />
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content={config.meta.theme_colour} />
        <meta name="author" content="Dan"/>

        <link href="/static/images/punch.png" rel="icon" type="image/png" />
        <link href="https://fonts.googleapis.com/css?family=PT+Mono" rel="stylesheet"/>
        <link href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" rel="stylesheet" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        <link href="/_next/static/style.css" rel="stylesheet" />
      </Head>
    )
  }
  render() {
    return (
      <React.Fragment>
        {this.renderHead()}
        <div className={`header${this.state.menuOpen ? ' header--is-nav-opened' : ''}`} id="header">
          <div className="header-inner">
            <Link to="/">
              <a className="header-name">{this.props.layout.data.site_name}</a>
            </Link>
            <nav className="header-nav">
              {this.props.layout.data.site_description}
            </nav>
            <div className="header-burger" id="header-burger" onClick={this.handleMenuOpen}>
              <img className="header-burger-img header-burger-img--closed" src="/static/images/burger-closed.svg" alt="Mobile menu toggle - closed state" />
              <img className="header-burger-img header-burger-img--opened" src="/static/images/burger-opened.svg" alt="Mobile menu toggle - opened state" />
            </div>
          </div>
        </div>

        <main>
          {this.props.children}
        </main>

        <footer className="footer">
          footer
        </footer>
      </React.Fragment>
    )
  }
}
