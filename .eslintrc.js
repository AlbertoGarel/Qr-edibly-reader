module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: [
        "react",
        "babel"
    ],
    rules: {
        // allow .js files to contain JSX code
        "react/jsx-filename-extension": [1, {"extensions": [".ts", ".tsx", ".js", ".jsx"]}],
        // prevent eslint to complain about the "styles" variable being used before it was defined
        "no-use-before-define": ["error", {"variables": false}],
        // ignore errors for the react-navigation package
        "react/prop-types": ["error", {"ignore": ["navigation", "navigation.navigate"]}],
        // ignore errors for import directives
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ]
    },
};
