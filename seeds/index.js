const sequelize = require("../config/connection");
const { User } = require("../models")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate([
        {
            email:"abc@abc.com",
            password:"password"
        }

    ],
    {
        individualHooks:true
    })
    process.exit(0)
}

seedMe()