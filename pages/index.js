import React from "react";
import NotFound from "./notfound";
import { Client, linkResolver } from "../components/prismic";
import { RichText } from "prismic-reactjs";
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
        mainClass="container  mla  mra  pv5"
      >
      <section className="transition-elem-common">
        <img
          className="mla  mra  w-100  br4  shadow2  mb4"
          src="https://spaceholder.cc/1080x200"
          alt="space"
        />

      <h1 className="font--primary  f3  bold  mb3">Welcome to the Zero Grav Boilerplate</h1>
          <p className="font--secondary  f4  mb3">Features include:</p>
          <ul className="font--secondary  f5  mb3">
            <li className="pb2">
              Next.js SSR configuration.
            </li>
            <li className="pb2">
              Prismic CMS integration with link handlers.
            </li>
            <li className="pb2">
              SASS & PostCSS with Utliity based classes.
            </li>
            <li className="pb2">
              Next page transitions (next-page-transitions).
            </li>
          </ul>
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
