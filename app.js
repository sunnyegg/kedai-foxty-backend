// import
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

// import graphql schema & resolvers
const graphQLSchema = require("./src/graphql/schema");
const graphQLResolvers = require("./src/graphql/resolvers");

// init express
const app = express();

// parsing json
app.use(bodyParser.json());

// graphql
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

// database
mongoose
  .connect(`mongodb://localhost:27017/kedai-foxty`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database.");

    // server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Server is listening on port: " + port);
    });
  })
  .catch(err => {
    console.log("Error occured.");
    console.log(err);
  });
