import { EmailPreview } from "./EmailPreview"

export function EmailList({ emails, onRemoveEmail }) {
    return (
        <ul className="email-list">
            {emails.map(email =>
                
                <li key={email.id}>
                    <EmailPreview email={email} />
                    <div className="robot-actions">
                        <button onClick={() => onRemoveEmail(email.id)}>X</button>
                    </div>
                </li>
            )}
        </ul>
    )
}
