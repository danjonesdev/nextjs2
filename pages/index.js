import React from 'react'
import NotFound from './notfound'
import { Client, linkResolver } from '../components/prismic'
import { RichText } from 'prismic-reactjs'
import { TextBlock } from '../components/slices'
import Layout from './layout'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    try {
      const home = await Client(req).getSingle('home_page')
      return { home }
    } catch(error) {
      return { error: true }
    }
  }

  renderSlices(slices) {
    return slices.map((slice, index) => {
      console.log('slice', slice);
      const res = (() => {
        switch(slice.slice_type) {
          case 'text_block': return (
            <div key={index} className="homepage-slice-wrapper">
              <TextBlock slice={slice} />
            </div>
          )

          default: return
        }
      })()
      return res
    })
  }

  renderBody() {
    console.log('homepage', this.props);
    return (
      <Layout title="Home" description={this.props.layout.data.site_description} layout={this.props.layout}>
        hello

        <div>
          {this.renderSlices(this.props.home.data.body)}
        </div>
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <Layout layout={this.props.layout}><NotFound /></Layout>
    else return this.renderBody()
  }
}
