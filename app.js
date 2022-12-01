const { default: isAlpha } = require('validator/lib/isAlpha');
const { default: isEmail } = require('validator/lib/isEmail');
const { default: isMobilePhone } = require('validator/lib/isMobilePhone');
const contacts = require("./functions/contacts");

const main = async () => {
    var name = await contacts.question('What is your name? ');
    // Jika format nama sesuai maka akan lanjut ke pertanyaan selanjutnya 
    // Jika format nama tidak sesuai akan menampilkan pesan dan close
    if (isAlpha(name, 'en-US', { ignore: ' ' })) {
        var email = await contacts.question('What is your email? ');
        // Jika format email sesuai maka akan lanjut ke pertanyaan selanjutnya 
        // Jika format email tidak sesuai akan menampilkan pesan dan close
        if (isEmail(email)) {
            var phone = await contacts.question('What is your phone number? ');
            // Jika format no hp sesuai sesuai maka akan menyimpan input ke dalam file contacts.json di folder data
            // Jika format no hp tidak sesuai akan menampilkan pesan dan close
            if (isMobilePhone(phone, 'id-ID')) {
                contacts.saveContact(name, email, phone);
            } else {
                console.log(`'${phone}'`, 'is wrong format for indonesian phone number!');
                contacts.close();
            }
        } else {
            console.log(`'${email}'`, 'is wrong format for email!');
            contacts.close();
        }
    } else {
        console.log(`'${name}'`, 'is wrong format for name!');
        contacts.close();
    }
}

main()