import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service"
import { Link } from "react-router-dom"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onBack() {
        navigate('/emails')
    }
    console.log('Render');
    
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <h1>Email Details</h1>
            <h3>Subject: {email.subject}</h3>
            <h3>Email's Body: {email.body}</h3>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
