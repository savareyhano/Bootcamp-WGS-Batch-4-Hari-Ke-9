const fs = require('fs');
const { default: isAlpha } = require('validator/lib/isAlpha');
const { default: isEmail } = require('validator/lib/isEmail');
const { default: isMobilePhone } = require('validator/lib/isMobilePhone');

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

// Menampilkan list dari file JSON
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

// Menampilkan data dari file JSON berdasarkan nama yang dicari
function getName(name) {
    const contacts = JSON.parse(read);
    const found = contacts.find((contact) => contact.name === name);
    if (found) {
        console.log(found.name, found.email, found.phone);
    } else {
        console.log('Nama tidak ditemukan!');
    }
}

// Menghapus data dari file JSON
function del(name) {
    const contacts = JSON.parse(read);
    const fil = contacts.filter((contact) => contact.name !== name);
    fs.writeFileSync('data/contacts.json', JSON.stringify(fil));
}

// Mengupdate data pada file JSON berdasarkan nama yang dicari (menggunakan --where)
function up(where, name, email, phone) {
    const contacts = JSON.parse(read);
    const fil = contacts.find((contacts) => contacts.name === where);
    del(name);
    if (name !== undefined) {
        if (isAlpha(name, 'en-US', { ignore: ' ' })) {
            fil.name = name;
        } else {
            console.log('Nama tidak sesuai dengan format!');
        }
    }
    if (email !== undefined) {
        if (isEmail(email)) {
            fil.email = email;
        } else {
            console.log('Email tidak sesuai dengan format!');
        }
    }
    if (phone !== undefined) {
        if (isMobilePhone(phone, 'id-ID')) {
            fil.phone = phone;
        } else {
            console.log('No hp tidak sesuai dengan format!');
        }
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Data telah terupdate!');
}

module.exports = { save, show, getName, del, up };