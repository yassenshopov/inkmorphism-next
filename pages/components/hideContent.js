import { AiFillLock } from "react-icons/ai"

export default function HideContent() {
    return (
        <div id="hideContent">
            < AiFillLock />
            <p>You don't have permission to view this page.</p>
            <a href='../../dashboard' className="noSelect">← Return to your Dashboard</a>
        </div>
    )
}