import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

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


const STORAGE_KEY = 'emails'
const date = new Date()
//console.log ('email.service?')
_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var {isRead, subject} = filterBy
        emails = emails.filter(email => 
            email.isRead==isRead && email.subject.toLowerCase().includes(subject.toLowerCase()))
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(robotToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

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


function getDefaultFilter() {
    return {
        isRead: false,
        subject: ""

    }
}


function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    console.log ('here')
    if (!emails || !emails.length) {
        emails = [
            { id: 'e1', subject: 'I didnt hit her', body: 80, isRead: true, isStarred: true ,sentAt: date, removedAt: "", from: "Mark@hello.com", to: "test@hello.com" },
            { id: 'e2', subject: 'Its not true', body: 100, isRead: false, isStarred: false ,sentAt: date, removedAt: "", from: "Jenny@hello.com", to: "test@hello.com"  },
            { id: 'e3', subject: 'Its bullshit', body: 100, isRead: false, isStarred: false, sentAt: date, removedAt: "", from: "J@hello.com", to: "test@hello.com" },
            { id: 'e4', subject: 'Oh, hi Mark', body: 40, isRead: true, isStarred: true, sentAt: '', removedAt: "",from: "Jiui@hello.com", to: "test@hello.com" }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}