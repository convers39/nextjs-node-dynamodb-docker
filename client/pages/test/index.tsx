import type { NextPage } from 'next'

type DataProps = {
  children?: React.ReactNode
  dbInfo: object
  serverPort: number
  serverHost: string
}

const Data: NextPage<DataProps> = ({ dbInfo, serverPort, serverHost }) => {
  return (
    <>
      <h2>this is a test page for db connection</h2>
      <pre>{dbInfo}</pre>
      <h3>
        Server host: {serverHost} and port: {serverPort}
      </h3>
    </>
  )
}

export async function getStaticProps() {
  const SERVER_HOST = process.env.SERVER_HOST || 'server'
  const SERVER_PORT = process.env.SERVER_HOST_PORT || 3001

  let dbInfo
  try {
    const res = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/db`)
    dbInfo = await res.json()
    console.log('getting db info in nextjs', dbInfo)
  } catch (err) {
    console.error(err)
    dbInfo = 'failed to get db info'
  }
  return {
    props: {
      dbInfo,
      serverPort: SERVER_PORT,
      serverHost: SERVER_HOST
    }
  }
}

export default Data
