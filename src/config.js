const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  siteName: 'Beauty',
  baseUrl: process.env.PUBLIC_URL,
  basePath: "/php/2022/salonapp",
  basename: "/php/2022/salonapp/login",
  logopath: "/php/2022/salonapp/images/logo.png",
  imagepath: "/php/2022/salonapp/images/",
  defaultPath: "/php/2022/salonapp/dashboard",
  API_URL: 'https://dddemo.net/php/2022/salon/public/api/v1/',
  phone_number_pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  phone_number_334_error: "phone_number_334_error",
  google_api_key: "AIzaSyDtEOPPr627_yGNQJaZaBLFrKUF_GVNpvw",
  bing_api_key: "AisIvzcLWeb3W3FZt45Al5-dT3BQUh6bMbtEiTHXwZlfAw8lH4wCxuldUuX-lgX1"
};

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

// const config = {
//   // basename or basePath: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
//   siteName: "Beauty",
//   baseUrl: process.env.PUBLIC_URL,
//   basePath: "",
//   basename: "/login",
//   logopath: "/images/logo.png",
//   imagepath: "/images/",
//   defaultPath: "/dashboard",
//   API_URL: "http://127.0.0.1:8000/api/v1/",
//   phone_number_pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
//   phone_number_334_error: "phone_number_334_error",
//   google_api_key: "AIzaSyDtEOPPr627_yGNQJaZaBLFrKUF_GVNpvw",
//   bing_api_key: "AisIvzcLWeb3W3FZt45Al5-dT3BQUh6bMbtEiTHXwZlfAw8lH4wCxuldUuX-lgX1",
// };

export default config;
