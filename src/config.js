// const config = {
//   // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
//   siteName: 'Beauty',
//   baseUrl: process.env.PUBLIC_URL,
//   basePath: "/php/2022/salonapp",
//   basename: "/php/2022/salonapp/login",
//   logopath: "/php/2022/salonapp/images/logo.png",
//   imagepath: "/php/2022/salonapp/images/",
//   defaultPath: "/php/2022/salonapp/dashboard",
//   API_URL: 'https://dddemo.net/php/2022/salon/public/api/v1/',
//   phone_number_pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
//   phone_number_334_error: "phone_number_334_error",
//   google_api_key: "AIzaSyDtEOPPr627_yGNQJaZaBLFrKUF_GVNpvw",
//   bing_api_key: "AisIvzcLWeb3W3FZt45Al5-dT3BQUh6bMbtEiTHXwZlfAw8lH4wCxuldUuX-lgX1"
// };

// const config = {
//   // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
//   siteName: 'Beauty',
//   baseUrl: process.env.PUBLIC_URL,
//   basePath: "/git/salonreact/build",
//   basename: "/git/salonreact/build/login",
//   logopath: "/git/salonreact/build/images/logo.png",
//   imagepath: "/git/salonreact/build/images/",
//   defaultPath: "/git/salonreact/build/dashboard",
//   API_URL: 'http://127.0.0.1:8000/api/v1/',
//   phone_number_pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
//   phone_number_334_error: "phone_number_334_error",
//   google_api_key: "AIzaSyDtEOPPr627_yGNQJaZaBLFrKUF_GVNpvw",
//   bing_api_key: "AisIvzcLWeb3W3FZt45Al5-dT3BQUh6bMbtEiTHXwZlfAw8lH4wCxuldUuX-lgX1"
// };

const config = {
  // basename or basePath: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  siteName: "Aura Beauty Salon",
  siteAddress: "3/100 Sunshine Road Brisbane 4000 07 3000 000",
  baseUrl: process.env.PUBLIC_URL,
  basePath: "",
  basename: "/login",
  logopath: "/images/logo.png",
  imagepath: "/images/",
  defaultPath: "/dashboard",
  API_URL: "http://127.0.0.1:8000/api/v1/",
  phone_number_pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  phone_number_334_error: "Mobile is Invalid",
  duration_pattern: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
  duration_HM_error: "Only Allow hours and Minutes",
  google_api_key: "AIzaSyDtEOPPr627_yGNQJaZaBLFrKUF_GVNpvw",
  bing_api_key: "AisIvzcLWeb3W3FZt45Al5-dT3BQUh6bMbtEiTHXwZlfAw8lH4wCxuldUuX-lgX1",
  voucher_terms_condition: "This voucher is valid until the expiry date specified and cannot be redeemed or replaced after this date. Aura is not responsible for lost / stolen vouchers, and is not responsible for replacing a voucher that has been lost /stolen. This voucher is non-refundable and cannot be exchanged for cash. This voucher is not valid with any other offer and / or special at Aura. This voucher must be used by one person in one visit.",
};

export default config;
