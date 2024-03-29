import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

//exporting all the functions for further use by the different comps 
export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    _createEmails,
}




const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

//set the storage key
const STORAGE_KEY = 'emails'
//const date = new Date()
//console.log ('email.service?')

//create emails using the _createEmails function 
_createEmails()

//This async function is pulling a list of emails using the filterBy parameter 
async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var {isRead, subject} = filterBy
        console.log ("filter"+ isRead)
        //If the isRead isnt empty, consider its value and pull all the matching subject with ignoring the case
        if (isRead!== "") {
            emails = emails.filter(email => 
                email.isRead==isRead && email.subject.toLowerCase().includes(subject.toLowerCase()))
            }
        //If the isRead is empty, ignore its value and pull all the matching subject with ignoring the case
        else {
            emails = emails.filter(email => 
                email.subject.toLowerCase().includes(subject.toLowerCase()))
        }
    }
    return emails
}

//This function will get the email from storage using the emailId
function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}
//This function will remove the email from storage using the emailId
function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

//This function will save a new  email to the storage and edit the email if the emailId already existed 
function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

//This function creates an email 
function createEmail(id = '', subject = '',body='',isRead=false,isStarred=false,sentAt='',removedAt="",from='',to='') {
    return {
        id,
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to,
    }
}

//This function creates a default filter that will later be used by pulling the ifrst intial list of emails
function getDefaultFilter() {
    return {
        isRead: "",
        subject: ""

    }
}

//This function creates a list of emails with initial sets of emails, and saves them to the storage
function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    console.log ('here')
    if (!emails || !emails.length) {
        emails = [
            { id: 'e1', subject: 'I didnt hit her', body: 80, isRead: true, isStarred: true ,sentAt: "12/3/2022 22:00", removedAt: "", from: "Mark@hello.com", to: "test@hello.com" },
            { id: 'e2', subject: 'Its not true', body: 100, isRead: false, isStarred: false ,sentAt: "7/5/2023 09:00", removedAt: "", from: "Jenny@hello.com", to: "test@hello.com"  },
            { id: 'e3', subject: 'Its bullshit', body: 100, isRead: false, isStarred: false, sentAt: "3/30/2023 23:00", removedAt: "", from: "J@hello.com", to: "test@hello.com" },
            { id: 'e4', subject: 'Oh, hi Mark', body: 40, isRead: true, isStarred: true, sentAt: '3/3/2023 08:00', removedAt: "",from: "Jiui@hello.com", to: "test@hello.com" }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}