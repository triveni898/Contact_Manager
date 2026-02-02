function getContacts(){return JSON.parse(localStorage.getItem("contacts"))||[]}
function saveContacts(c){localStorage.setItem("contacts",JSON.stringify(c))}