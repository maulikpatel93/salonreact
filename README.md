# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
==================
https://github.com/eslint/eslint/issues/11183
===================
{
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "babel",
    "react",
    "flowtype"
  ],
  "rules": {
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/react-in-jsx-scope": 1,
  
    // Indent with 4 spaces
    "indent": [
      "error",
      4
    ],
    // Indent JSX with 4 spaces
    "react/jsx-indent": [
      "error",
      4
    ],
    // Indent props with 4 spaces
    "react/jsx-indent-props": [
      "error",
      4
    ],
    // TODO: Remove all of these exceptions
    // We have code that violates each one of these rules.
    // We should fix the style then remove the rules when we can.
    "consistent-return": "off",
    "flowtype/no-types-missing-file-annotation": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/prefer-default-export": "off",
    "react/default-props-match-prop-types": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-filename-extension": "off",
    "react/no-string-refs": "off",
    "react/no-unused-prop-types": "off",
    "react/no-unused-state": "off",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/sort-comp": "off",
    "max-len": "off",
    "no-case-declarations": "off",
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-nested-ternary": "off",
    "no-shadow": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off",
    "prefer-promise-reject-errors": "off"
  },
  "env": {
    "jest": true
  },
  "globals": {
    "fetch": false,
    "Response": false,
    "React": true
  }
}
================================

{
  "root": true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "requireConfigFile": false,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "impliedStrict": true
    },
    "ecmaVersion": "latest",
    "babelOptions": {
      "presets": ["@babel/preset-react"]
    }
  },
  "plugins": ["react", "react-hooks"],
  "rules": {
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/react-in-jsx-scope": 1,
    "react/jsx-filename-extension": 0,
    "no-param-reassign": 0,
    "react/prop-types": 1,
    "react/require-default-props": 0,
    "react/no-array-index-key": 0,
    "react/jsx-props-no-spreading": 0,
    "react/forbid-prop-types": 0,
    "import/order": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "prefer-destructuring": 0,
    "no-shadow": 0,
    "no-unused-vars": [
      1,
      {
        "ignoreRestSiblings": false
      }
    ]
  }
}

