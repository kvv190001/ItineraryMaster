var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from './database.js';
import './dotenv.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
const currentPath = fileURLToPath(import.meta.url);
const tripsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'), "utf8");
const tripsData = JSON.parse(tripsFile);
const createTripsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createTripsTableQuery = `
        DROP TABLE IF EXISTS trips CASCADE;

        CREATE TABLE IF NOT EXISTS trips (
            id serial PRIMARY KEY,
            title varchar(100) NOT NULL,
            description text NOT NULL,
            img_url text NOT NULL,
            num_days integer NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_cost money NOT NULL
        );
    `;
    try {
        const res = yield pool.query(createTripsTableQuery);
        console.log('🎉 trips table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating trips table', err);
    }
});
const seedTripsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createTripsTable();
    tripsData.forEach((trip) => {
        const insertQuery = {
            text: 'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        };
        const values = [
            trip.title,
            trip.description,
            trip.img_url,
            trip.num_days,
            trip.start_date,
            trip.end_date,
            trip.total_cost
        ];
        try {
            pool.query(insertQuery, values);
            console.log(`✅ ${trip.title} added successfully`);
        }
        catch (err) {
            console.error('⚠️ error inserting trip', err);
        }
    });
});
const createDestinationsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createDestinationsTableQuery = `
        DROP TABLE IF EXISTS destinations CASCADE;

        CREATE TABLE IF NOT EXISTS destinations (
            id serial PRIMARY KEY,
            destination varchar(100) NOT NULL,
            description text NOT NULL,
            city varchar(100) NOT NULL,
            country varchar(100) NOT NULL,
            img_url text NOT NULL,
            flag_img_url text NOT NULL
        );
    `;
    try {
        const res = yield pool.query(createDestinationsTableQuery);
        console.log('🎉 destinations table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating destinations table');
    }
});
const createActivitiesTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createActivitiesTableQuery = `
      CREATE TABLE IF NOT EXISTS activities (
          id serial PRIMARY KEY,
          trip_id int NOT NULL,
          activity varchar(100) NOT NULL,
          num_votes integer DEFAULT 0,
          FOREIGN KEY(trip_id) REFERENCES trips(id)
      );
    `;
    try {
        const res = yield pool.query(createActivitiesTableQuery);
        console.log('🎉 activities table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating activities table', err);
    }
});
const createTripsDestinationsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createTripsDestinationsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips_destinations(
            trip_id int NOT NULL,
            destination_id int NOT NULL,
            PRIMARY KEY (trip_id, destination_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
            FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
        );
    `;
    try {
        const res = yield pool.query(createTripsDestinationsTableQuery);
        console.log('🎉 trips_destinations table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating trips_destinations table', err);
    }
});
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createUsersTableQuery = `
        DROP TABLE IF EXISTS users CASCADE;

        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            githubid integer NOT NULL,
            username varchar(100) NOT NULL,
            avatarurl varchar(500) NOT NULL,
            accesstoken varchar(500) NOT NULL
        );
    `;
    try {
        const res = yield pool.query(createUsersTableQuery);
        console.log('🎉 users table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating users table', err);
    }
});
const createTripsUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createTripsUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS trips_users (
            trip_id int NOT NULL,
            user_id int NOT NULL,
            PRIMARY KEY (trip_id, user_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
            FOREIGN KEY (trip_id) REFERENCES users(id) ON UPDATE CASCADE
        );
    `;
    try {
        const res = yield pool.query(createTripsUsersTableQuery);
        console.log('🎉 trips_users table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating trips_users table', err);
    }
});
const createUsersTripsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const createUsersTripsTableQuery = `
      CREATE TABLE IF NOT EXISTS users_trips (
        id serial PRIMARY KEY,
        trip_id int NOT NULL,
        username text NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(id)
      );
    `;
    try {
        const res = yield pool.query(createUsersTripsTableQuery);
        console.log('🎉 users_trips table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating users_trips table', err);
    }
});
seedTripsTable();
createDestinationsTable();
createActivitiesTable();
createTripsDestinationsTable();
createUsersTable();
createTripsUsersTable();
createUsersTripsTable();
