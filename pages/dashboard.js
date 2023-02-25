import Head from 'next/head';
import Dashnav from './components/dashnav.js' 
import Dashfooter from './components/dashfooter.js'
import Dash from './components/dash.js'

export default function Dashboard() { 

  return (
    <div className={"Dashboard"}>

      <Head>
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Your Dashboard</title>
      </Head>

      <Dashnav/>
      <Dash/>
      <Dashfooter/>
    </div>
  );
}