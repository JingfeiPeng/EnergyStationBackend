const bcrypt  = require('bcrypt')

// 1234 = abcd, need to use a saw
// generate a salt, something thats before each password
async function run(){
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash('1234', salt)) //1234 is passowrd
    console.warn(salt)
}

run()