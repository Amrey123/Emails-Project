import { Link } from "react-router-dom";

export function EmailPreview({ email }) {
    return (
        <article className="email-preview">
            <Link to={`/email/${email.id}`}>
                <h2>{email.subject}</h2>
                <h4>{email.body}</h4>
            </Link>
        </article>
    )
}
