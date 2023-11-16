const ContactsManager = require("./contacts.js");
const { Command } = require("commander");
const { nanoid } = require("nanoid");

const manager = new ContactsManager();
const program = new Command();

program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .action(async (args) => {
    switch (args.action) {
      case "list":
        const list = await manager.listContacts();
        console.table(list);
        break;
      case "get":
        const getContact = await manager.getContactById(args.id);
        console.log("Contact:", getContact);
        break;
      case "add":
        const data = {
          id: nanoid(),
          name: args.name,
          email: args.email,
          phone: args.phone,
        };
        const addedContact = await manager.addContact(data);
        console.log("Added contact:", addedContact);
        break;
      case "remove":
        const removedContact = await manager.removeContact(args.id);
        console.log("Removed contact:", removedContact);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  })
  .parse(process.argv);
