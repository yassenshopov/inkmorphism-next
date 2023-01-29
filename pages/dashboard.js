import Head from 'next/head';
import Dashnav from './components/dashnav.js'

function Dashboard() {

  return (
    <div className={"Dashboard"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Your Dashboard</title>
      </Head>

        <Dashnav/>  
    
    </div>
  );
}

export default Dashboard;
