import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic'

export default ({ slice }) =>
  <section>
    <div className="l-wrapper">
      <div className="text-block-inner">
        <div className="text-block-title">
          {RichText.render(slice.primary.text_block_title, linkResolver)}
        </div>
        <div className="text-block-richtext">
          {RichText.render(slice.primary.text_block_paragraph, linkResolver)}
        </div>
      </div>
    </div>
  </section>
