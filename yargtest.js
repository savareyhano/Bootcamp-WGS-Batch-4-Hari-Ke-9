const { argv } = require("yargs");
const yargs = require("yargs");
const yargfunct = require("./functions/yargfunct")

// Command untuk menambahkan data pada file JSON
yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type: 'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile,
        };
        console.log(contact)
        yargfunct.save(argv.name, argv.email, argv.mobile);
    },
});

// Command untuk menampilkan list data dari file JSON
yargs.command({
    command: 'show',
    describe: 'show data from JSON file',
    handler() {
        yargfunct.show();
    },
});

// Command untuk menampilkan data dari file JSON berdasarkan nama yang dicari
yargs.command({
    command: 'find',
    describe: 'find a name',
    handler(argv) {
        yargfunct.getName(argv.name)
    }
});

// Command untuk menghapus data dari file JSON berdasarkan nama yang dicari
yargs.command({
    command: 'delete',
    describe: 'delete value from JSON',
    handler(argv) {
        yargfunct.del(argv.name)
    }
});

// Command untuk mengupdate data dari file JSON
yargs.command({
    command: 'update',
    describe: 'update value from JSON',
    builder: {
        where: {
            describe: 'Search Name',
            demandOption: true,
            type: 'string',
        },
        name: {
            describe: 'Contact Name',
            demandOption: false,
            type: 'string',
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type: 'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        yargfunct.up(argv.where, argv.name, argv.email, argv.mobile);
    },
});

yargs.parse();