import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    //Reescrevendo a database
    return createConnection(
        Object.assign(defaultOptions, {
            //Basicamente um IF
            database: process.env.NODE_ENV === 'test'
                ? "./src/database/database.test.sqlite"
                : defaultOptions.database,
        })
    );
};

