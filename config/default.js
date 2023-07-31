module.exports = {
    JWT:{
        secret: 'D3F5GHTY66YY77V67IOLK',
        expiry: 5000,
    },
    DATABASE:{
        NAME: 'videoapp',
        USER: 'root',
        PASSWORD: 'Admin@123',
        HOST: 'localhost',
        PORT: 3306,
        DB_DIALECT: 'mysql',
        DEBUG: true
    },
    PORT: 8085,
    VIDEO_FOLDER: 'public/videos',
    DEFAULT_FOLDER: 'public/uploads',
    VIDEO_URL: 'http://localhost:8085'
}
