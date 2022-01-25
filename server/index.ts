import express from 'express'
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb'

require('dotenv').config()

const app = express()
const PORT = process.env.SERVER_HOST_PORT || 3001
const DB_HOST = process.env.DB_HOST || 'db'
const DB_HOST_PORT = process.env.DB_HOST_PORT || 6666

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/db', async (req, res) => {
  console.log('request on db tables in node')
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'ap-northeast-1',
    endpoint: `http://${DB_HOST}:${DB_HOST_PORT}`,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
    }
  })
  console.log('load from environment TEST_HOST: ', process.env.TEST_HOST)
  const command = new ListTablesCommand({})
  try {
    const results = await client.send(command)
    res.json(results.TableNames?.join('\n'))
  } catch (error) {
    console.error(error)
    res.json('error')
  }
})

app.listen(PORT, () => {
  console.log(`Express server is listening at ${PORT}`)
})
