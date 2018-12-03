const proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    lang: "no",
    footerNav: [
      {
        //<Link to="/contact/">Contact</Link>
        label: "Studio 5 Dekor på Facebook eller ",
        path: "https://www.facebook.com/Studio-5-Dekor-as-290884624375196/"
      },
      {
        label: "Studio 5 Dekor",
        path: "https://studio5dekor.no/"
      }
    ],

    locale: "no-bok",
    stripeKey: process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
    labels: {
      checkout: "Kjøp",
      paymentMessageSuccess:
        "Takk for handelen, t-skjorte på vei til deg innen få dager.",
      paymentMessageFail: "Noe gikk galt, prøv igen eller ta kontakt. ",
      paymentMessageOutOfInventory:
        "Det er dessverre ikke flere igjen av den t-skjorten.",
      notFoundTitle: "Ojsann",
      notFoundContent: "Denne siden finnes ikke.",
      notFoundLink: "Gå tilbake til forsiden."
    }
  },
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-stripe-checkout",
    {
      resolve: "gatsby-source-stripe",
      options: {
        objects: ["products", "skus"],
        secretKey: process.env.STRIPE_SECRET_KEY
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Stripe Store",
        short_name: "stripestore",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/assets/icon.png" // This path is relative to the root of the site.
      }
    }
  ]
};
//console.log(footerNav);
//label: "www.studio5dekor.no",
//path: "https://studio5dekor.no"
