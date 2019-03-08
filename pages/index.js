import React from "react";
import NotFound from "./notfound";
import { Client, linkResolver } from "../components/prismic";
import { RichText } from "prismic-reactjs";
import { TextBlock } from "../components/slices";
import Layout from "./layout";

export default class extends React.Component {
  // static async getInitialProps({ req }) {
  //   try {
  //     const home = await Client(req).getSingle("home_page");
  //     return { home };
  //   } catch (error) {
  //     return { error: true };
  //   }
  // }

  // renderSlices(slices) {
  //   return slices.map((slice, index) => {
  //     console.log("slice", slice);
  //     const res = (() => {
  //       switch (slice.slice_type) {
  //         case "text_block":
  //           return (
  //             <div key={index} className="homepage-slice-wrapper">
  //               <TextBlock slice={slice} />
  //             </div>
  //           );
  //
  //         default:
  //           return;
  //       }
  //     })();
  //     return res;
  //   });
  // }

  renderBody() {
    return (
      <Layout
        title="Home"
        description={this.props.layout.data.site_description}
        layout={this.props.layout}
        mainClass="container  mla  mra"
      >
        <section className="pa5">
          <img
            className="mla  mra  w-100  br4  shadow2"
            src="https://spaceholder.cc/1200x400"
            alt="space"
          />
        </section>
      </Layout>
    );
  }

  render() {
    if (this.props.error)
      return (
        <Layout layout={this.props.layout} mainClass="container  mla  mra">
          <NotFound />
        </Layout>
      );
    else return this.renderBody();
  }
}
