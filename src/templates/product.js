import React from "react";

import { graphql } from "gatsby";
import Layout from "../layouts/RootLayout";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import StripeSku from "../components/StripeSku";
import StripeCheckout from "../components/StripeCheckout";
import Sku from "../components/Sku";
import Link from "gatsby";

export default ({
  data: {
    site: {
      siteMetadata: { locale, lang, stripeKey, labels }
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
        {product.metadata.footer.split("\n\n").map((paragraph, key, footerNav) => (
          <p key={key}>{paragraph}</p>

          <p>
            <Link key={key} className="nav-item" alt={footerNav.label} to={footerNav.path}>
              {footerNav.path === "https://www.facebook.com/Studio-5-Dekor-as-290884624375196/"  (
                footerNav.label
              )}
            </Link>
          </p>
        ))}





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


const Nav = ({ items }) => (
  <nav className="nav">
    {items.map((item, key) => (
      <Link key={key} className="nav-item" alt={item.label} to={item.path}>
        {item.path === '/' ? (
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        ) : (
          item.label
        )}
      </Link>
    ))}
  </nav>
)