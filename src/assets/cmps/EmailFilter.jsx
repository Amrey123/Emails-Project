import { useEffect, useState } from "react"
import { emailService } from "/Users/amit.re/Documents/Amit/Studies/Course/Lesson 4/Emails-Project/src/services/email.service"


export function EmailFilter ({filterBy, onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    console.log (filterByToEdit)
    function handleChange(ev) {
        let { name: field, value, type } = ev.target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    const {subject} = filterByToEdit
    return (
        <form className = "email-filter">
            <label htmlFor="subject">Subject</label>
            <input onChange={handleChange} id="subject" value={subject} name="subject" type="text" />
        </form>

    )

}
