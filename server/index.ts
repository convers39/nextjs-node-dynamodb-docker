import express from 'express'
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/db', async (req, res) => {
  console.log('request on db tables in node')
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'ap-northeast-1',
    endpoint: 'http://db:' + (process.env.DYNAMODB_PORT || '6666'),
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
    }
  })
  const command = new ListTablesCommand({})
  try {
    const results = await client.send(command)
    console.log(results.TableNames?.join('\n'))
    res.json(results.TableNames?.join('\n'))
  } catch (error) {
    console.error(error)
    res.json('error')
  }
})

app.listen(PORT, () => {
  console.log(`Express server is listening at ${PORT}`)
})
