// const { DataSource } = require('typeorm');
// const { User } = require('./entities/user.entity'); // Nhập các thực thể của bạn

// const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.DATABASE_HOST,
//     port: Number(process.env.DATABASE_PORT),
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     synchronize: false, // Đặt thành false cho các migrations
//     logging: true,
//     entities: [User], // Thêm các thực thể của bạn ở đây
//     migrations: [__dirname + '/migrations/*{.ts,.js}'],
// });

// module.exports = AppDataSource;
