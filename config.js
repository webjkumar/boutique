var config = {
    expressPort: 9090,
    client: {
        mongodb: {
            defaultDatabase: "boutique",
            defaultCollection: "users",
            defaultUri: "mongodb://localhost:27017"
        },
        mockarooUrl: ""        
    }
};

module.exports = config;