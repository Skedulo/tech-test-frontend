import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'

const PORT = process.env.PORT || 3500
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.applyMiddleware({ app })

app.get('/ping', (req, res) => {
  res.send({ text: 'pong' })
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/graphql`))
