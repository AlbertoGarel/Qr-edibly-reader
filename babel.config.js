module.exports = (api) => {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo',
            ['@babel/preset-env', {targets: {node: 'current'}}]
        ],
        plugins: [
            ['module:react-native-dotenv', {
                // "envName": "APP_ENV",
                "moduleName": "@env",
                "path": ".env",
                "blocklist": null,
                "allowlist": null,
                "safe": true,
                "allowUndefined": true,
            }],
            ['transform-inline-environment-variables']
        ]
    };
};
