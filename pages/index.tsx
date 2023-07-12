import Head from 'next/head'

// eslint-disable-next-line no-restricted-imports
import ContactList from 'components/base/contact'
import { DefaultLayout } from 'components/layouts'
import { NextPageWithLayout } from 'types'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Phone Appz</title>
      </Head>
      <ContactList />
    </>
  )
}

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Home
