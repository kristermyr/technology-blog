const {User} = require('..models');

const userData = [{
    username: 'Peter',
    password: 'Peter'
},
{
    username: 'Mike',
    password: 'Mike'
},
{
    username: 'Nick',
    password: 'Nick'
},]
const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;