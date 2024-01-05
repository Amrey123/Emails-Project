import { useEffect, useState } from "react"
import { emailService } from "/Users/amit.re/Documents/Amit/Studies/Course/Lesson 4/Emails-Project/src/services/email.service"


export function EmailFilter ({filterBy, onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    console.log (filterByToEdit)
    function handleChange(ev) {
        let { name: field, value, type } = ev.target
        console.log (value)
        if (field =="isRead") {
            if (value == "true") value = true
            if (value == "false") value = false
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    const {subject,isRead} = filterByToEdit
    return (
        <form className = "email-filter">
            <label htmlFor="subject">Subject</label>
            <input onChange={handleChange} id="subject" value={subject} name="subject" type="text" />

            <label htmlFor="isRead">Status</label>
            <select onChange={handleChange} id="isRead" value={isRead} name="isRead" type="status">
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </form>

    )

}
