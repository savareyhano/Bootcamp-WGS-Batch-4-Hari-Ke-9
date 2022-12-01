const fs = require('fs');
const readline = require('readline');

// Membuat folder data apabila tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (questions) => {
    return new Promise((resolve, reject) => {
        rl.question(questions, (answer) => {
            resolve(answer)
        })
    })
}

function close(){
    rl.close();
}

function saveContact (name, email, phone){
    const contact = {name, email, phone};
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Terimakasih sudah memasukkan data!');
    close();
}

module.exports = { question, saveContact, close };