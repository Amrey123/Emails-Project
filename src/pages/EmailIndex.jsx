import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../assets/cmps/EmailList"
import { EmailFilter } from "../assets/cmps/EmailFilter"
//import { EmailFilter } from "../assets/cmps/EmailFilter"


export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        //console.log("Effect")
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        console.log ("emails:", emails)
        setEmails(emails)
    }




    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!emails){
        return <div>Loading...</div>
    }
    const { subject,isRead } = filterBy
    //console.log ("Render")
    return (
        <section className="emails-index">
            <h1>Emails index</h1>
            <EmailFilter filterBy={{ subject,isRead }} onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
        </section>
    )
}