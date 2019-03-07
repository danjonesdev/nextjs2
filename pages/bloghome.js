import React from 'react'
import { Link } from '../routes'
import NotFound from './notfound'
import Layout from './layout'

export default class extends React.Component {

  static async getInitialProps({ req, query }) {
    try {
      return true
    } catch(error) {
      return { error: true }
    }
  }

  // renderPosts() {
  //   return this.props.posts.map((document, index) =>
  //     <div key={index} className="blog-home-post-wrapper">
  //       <article>
  //         <img className="blog-home-post-image" src={document.data.image.url} alt={document.data.image.alt} />
  //         <p className="blog-home-post-title">
  //           {RichText.asText(document.data.title)}
  //         </p>
  //         <p className="blog-home-post-excerpt">
  //           {RichText.asText(document.data.rich_content).substring(0, 158)} …
  //         </p>
  //         <div className="blog-home-post-button-wrapper">
  //           <Link to="blog/blog-post-1">
  //             <a className="a-button">blog/blog-post-1</a>
  //           </Link>
  //         </div>
  //       </article>
  //     </div>
  //   )
  // }

  renderBody() {
    return (
      <Layout title="{this.props.bloghome.data.meta_title}" description="{this.props.bloghome.data.meta_description}" layout={this.props.layout}>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <section className="blog-home-section">
          <div className="blog-home-posts-wrapper">
            posts
            <Link to="blog/blog-post-1">
                        <a className="a-button">blog/blog-post-1</a>
                      </Link>
          </div>
        </section>
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <Layout layout={this.props.layout}><NotFound /></Layout>
    else return this.renderBody()
  }
}
