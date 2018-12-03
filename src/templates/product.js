import React from "react";

import { graphql } from "gatsby";
import Layout from "../layouts/RootLayout";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import StripeSku from "../components/StripeSku";
import StripeCheckout from "../components/StripeCheckout";
import Sku from "../components/Sku";
import { Link } from "gatsby";
export default ({
  data: {
    site: {
      siteMetadata: { locale, lang, footerNav, stripeKey, labels }
    }
  },
  pageContext: { product, productSkus }
}) => {
  return (
    <Layout title={product.name} description={product.description}>
      <Hero title={product.name} subtitle={product.description} />
      <Main>
        <StripeCheckout stripeKey={stripeKey} lang={lang}>
          {onCheckout =>
            productSkus.map(sku => (
              <StripeSku
                sku={sku}
                product={product}
                key={sku.id}
                locale={locale}
                shippable={true}
                onCheckout={onCheckout}
                labels={labels}
                SkuComponent={Sku}
              />
            ))
          }
        </StripeCheckout>
      </Main>
      <Footer>
        {product.metadata.footer.split("\n\n").map((paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
        <div>
          {footerNav.map((footerNav, key) => (
            <Link
              key={key}
              //className="nav-item"
              //alt={footerNav.label}
              to={footerNav.path}
            >
              {footerNav.label}
            </Link>
            //<Link to="/contact/">Contact</Link>
          ))}
        </div>
      </Footer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PageQuery {
    site {
      siteMetadata {
        locale
        lang
        footerNav {
          label
          path
        }
        stripeKey
        labels {
          checkout
          paymentMessageSuccess
          paymentMessageFail
          paymentMessageOutOfInventory
        }
      }
    }
  }
`;
//console.log(footerNav);

// <div>
// const Nav = ({footerNav}) => (
// {footerNav.map(key => (
//   <Link
//     key={key}
//     className="nav-item"
//     alt={footerNav.label}
//     to={footerNav.path}
//   >
//     {footerNav.path ===
//       "/"(
//         //const lenke1 = footerNav.map(lenke => footerNav[0]); const lenke2 =
//         //footerNav.map(lenke => footerNav[1]); )}

//         footerNav.label
//       )}
//   </Link>
// ))}
// )
// </div>
