const devUrl = "https://ntc-dr-m-dev.cdu.so/"

module.exports = {
    getProxy: () => {
        return {
            "/core-service/api/v1/*": {
                target: devUrl,
                changeOrigin: true
            },
        };
    },

    getMessage: () => {
        return `The dev-server was started in the mode - (${devUrl})`;
    },
};
