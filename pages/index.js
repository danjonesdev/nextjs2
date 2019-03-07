import React from 'react'
import NotFound from './notfound'
import { Client, linkResolver } from '../components/prismic'
import { RichText } from 'prismic-reactjs'
import { TextBlock } from '../components/slices'
import Layout from './layout'

const graphQuery = `
{
  homepage {
    ...homepageFields
    body {
      ... on text_block {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on separator {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on cta_banner {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on big_bullet_item {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on featured_items {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          link_to_product {
            product_image
            product_name
            sub_title
          }
        }
      }
    }
  }
}
`

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
      <Layout title="{this.props.home.data.meta_title}" description="{this.props.home.data.meta_description}" layout={this.props.layout}>
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
