// import
import express from 'express'
import { json, urlencoded } from 'body-parser'
import graphqlHttp from 'express-graphql'
import { connect } from 'mongoose'
import logger from 'morgan'
import logging from './helpers/logging'

// import graphql schema & resolvers
import graphQLSchema from './graphql/schema'
import graphQLResolvers from './graphql/resolvers'

// init express
const app = express()

// parsing input
app.use(json())
app.use(urlencoded({ extended: true }))

// logger
app.use(logger('dev'))

// graphql
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
)

// database
connect('mongodb://localhost:27017/kedai-foxty', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logging('Connected to Database!')
  })
  .catch((err) => {
    logging('Oops! There is something wrong with database!')
    logging(err)
  })

// server
const port = process.env.PORT || 3000
app.listen(port, () => {
  logging('Server is listening on port: ' + port)
})
