import { BsPlusLg } from 'react-icons/bs'

export default function Dash(props) {
    return (
        <main id="dash">
            <h1>Your Dashboard</h1>
            <div id="websites">
                <p>You have {props.sitesTotal} website projects in total. <a href='../templates'>Start a new one?</a></p>
                {props.theData}
                <a href="../templates">
                    <article><BsPlusLg/></article>
                </a>
            </div>
        </main>
    );
}