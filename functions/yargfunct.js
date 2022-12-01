const fs = require('fs');

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

const read = fs.readFileSync('data/contacts.json', 'utf-8');

// Menyimpan value ke dalam file contacts.json di folder data
function save(name, email, phone) {
    const contact = { name, email, phone }
    const contacts = JSON.parse(read);
    const duplicate = contacts.find((contact) => contact.name === name && contact.email === email && contact.phone === phone);
    if (duplicate) {
        console.log('Data yang serupa sudah ada!');
        return false;
    } else {
        contacts.push(contact);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('Terimakasih sudah memasukkan data!');
    }
}

function show() {
    const filedataObj = JSON.parse(read);
    for (let i = 0; i < filedataObj.length; i++) {
        let obj = filedataObj[i];

        console.log(obj.name, obj.email, obj.phone);
    }
    // fs.readFile('data/contacts.json', 'utf-8', (err, fileData)=>{
    //     if(err) throw err;

    //     const filedataObj = JSON.parse(fileData);
    //     for(let i = 0; i < filedataObj.length; i++) {
    //         let obj = filedataObj[i];

    //         console.log(obj.name, obj.email, obj.phone);
    //     }

    //     // filedataObj.forEach(function(item){
    //     //     console.log('Nama: ' + item.name);
    //     //     console.log('Email: ' + item.email);
    //     //     console.log('No HP: ' + item.phone);
    //     // });
    // })
}

function getName(name) {
    const contacts = JSON.parse(read);
    const found = contacts.find((contact) => contact.name === name);
    if (found) {
        console.log(found.name, found.email, found.phone);
    } else {
        console.log('Nama tidak ditemukan!');
    }
}

function del(name) {
    const contacts = JSON.parse(read);
    const fil = contacts.filter((contact) => contact.name !== name);
    fs.writeFileSync('data/contacts.json', JSON.stringify(fil));
}

function up(name, email, phone, where) {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    const fil = contacts.find((contacts) => contacts.name === where);
    // console.log(fil);
    del(name)
    // contacts.push(fil)
    // const contact = fil
    // contacts.push(contact);
    if (name !== undefined) {
        fil.name = name
    }
    if (email !== undefined) {
        fil.email = email
    }
    if (phone !== undefined) {
        fil.phone = phone
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    // console.log('Terimakasih sudah memasukkan data!');
}

module.exports = { save, show, getName, del, up };