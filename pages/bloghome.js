import React from 'react'
import { Link } from '../routes'

import NotFound from './notfound'
import { Client, Prismic, linkResolver } from '../components/prismic'
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
      const posts = await Client(req).query(Prismic.Predicates.at('document.type', 'blog_post'), { pageSize: 50 });
      return { posts }
    } catch(error) {
      return { error: true }
    }
  }

  renderPosts() {
    return this.props.posts.results.map((post, index) => {
      console.log(linkResolver(post));
      const res = (() => {
        return (
         <article key={index} className="homepage-slice-wrapper">
          <p>{post.data.title}</p>
          <Link to={linkResolver(post)}>
            <a className="a-button">Read post</a>
          </Link>
         </article>
       )
      })()
      return res
    })
  }

  renderBody() {
    return (
      <Layout title="{this.props.home.data.meta_title}" description="{this.props.home.data.meta_description}" layout={this.props.layout}>
        <div>
          {this.renderPosts()}
        </div>
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <Layout layout={this.props.layout}><NotFound /></Layout>
    else return this.renderBody()
  }
}
