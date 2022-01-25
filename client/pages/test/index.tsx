import type { NextPage } from 'next'

type DataProps = {
  children?: React.ReactNode
  dbInfo: object
}

const Data: NextPage<DataProps> = ({ dbInfo }) => {
  return (
    <>
      <h2>this is a test page for db connection</h2>
      <pre>{JSON.stringify(dbInfo, null, 2)}</pre>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://server:3001/db')
  const dbInfo = await res.json()
  console.log('getting db info in nextjs', dbInfo)
  return {
    props: {
      dbInfo
    }
  }
}

export default Data
