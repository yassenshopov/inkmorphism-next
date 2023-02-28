export default function Account(props) {
    return (
        <main>
            <img src={props.profilePic}/>
            <p id="displayName">{props.displayName}</p>
        </main>
    )
}