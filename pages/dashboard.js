import Head from 'next/head';
import Dashnav from './components/dashnav.js' 
import Dashfooter from './components/dashfooter.js'
import Dash from './components/dash.js'
import { getAuth } from "firebase/auth";
import app from "../firebase/clientApp";

export default function Dashboard() { 

  
  const auth = getAuth(app);
  // console.log(auth)
  // if (auth.currentUser === null) {
  //   window.location.href = "../login";  
  // }

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