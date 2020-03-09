//configure my connection
module.exports = {
    dialect: 'postgres',
    host: '127.0.0.1',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
        timestamps: true, // audit
        underscored: true, //patronize table
        underscoredAll: true
    },
};
