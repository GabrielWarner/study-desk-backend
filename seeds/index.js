const connection = require('../config/connection');
const { Event, User } = require('../models')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected')

    // await User.insertMany([
    //     {
    //         username: "abc",
    //         email: "abc@abc.com",
    //         password: "password"
    //     },
    //     {
    //         username: "xyz",
    //         email: "xyz@xyz.com",
    //         password: "password1"
    //     }
    // ])

    // await Event.insertMany([
    //     {
    //         title: "Project",
    //         start: new Date(),
    //         end: new Date("2022, 9, 5"),
    //     },
    //     {
    //         title: "Metting",
    //         start: new Date(),
    //         end: new Date(),
    //     },
    //     {
    //         title: "Class",
    //         start: new Date("2022, 8, 28"),
    //         end: new Date("2022, 8, 31"),
    //     },
    // ]);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})