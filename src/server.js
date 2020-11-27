// Modules
const { ApolloServer } = require('apollo-server');
const schema = require('./schema.js');
const moongoose = require('mongoose');

// Configuration
const { MONGODB } = require('./config');

// Create the apollo Graphql Server
const server = new ApolloServer({ schema: schema });


// Run callback when the connection is open
moongoose.connection.on("open", (ref) => {
    console.log("Connected to MongoDB Atlas... ");
    server.listen({ port: 3000 }).then(res => {
        console.log(`Apollo server listening on ${res.url}`);
    });
})

// Execute the callback in case of a connection error
moongoose.connection.on("error", (err) => {
    console.log(err);
})


console.log("Connecting to MongoDB Atlas..")
moongoose.connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true });

