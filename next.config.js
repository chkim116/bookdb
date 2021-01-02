const withImages = require("next-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
    withImages({
        target: "serverless",
        compress: true,
        webpack(config, { webpack }) {
            const prod = process.env.NODE_ENV === "production";
            const plugins = [...config.plugins];
            return {
                ...config,
                mode: prod ? "production" : "development",
                devtool: prod ? "hidden-source-map" : "inline-source-map",
                plugins,
                module: {
                    ...config.module,
                    rules: [...config.module.rules, {}],
                },
            };
        },
    })
);
