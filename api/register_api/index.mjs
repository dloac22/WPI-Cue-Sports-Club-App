import mysql from 'mysql';

export const handler = async (event) => {
    const pool = mysql.createPool({
        host: "cue-sports-database.cfa2g4o42i87.us-east-2.rds.amazonaws.com",
        user: "buddy",
        password: "sR$p&aapi,n3]PM",
        database: "cue_club"
    });

    const insufficientData = {
        status: 400,
        message: "Insufficient data",
    };
    const userExists = {
        status: 403,
        message: "Username already exists",
    };

    const executeQuery = (query, params) => {
        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    const checkIfUserExists = async (username) => {
        const checkQuery = "SELECT user_id FROM users WHERE user_name = ?";
        const result = await executeQuery(checkQuery, [username]);
        return result.length > 0;
    };

    try {
        const { name, username, password } = event;

        if (!name || !username || !password) {
            return insufficientData;
        }

        const exists = await checkIfUserExists(username);
        if (exists) {
            return userExists;
        }

        const insertQuery = `
            INSERT INTO users (name, user_name, password_hash)
            VALUES (?, ?, ?)
        `;
        var results = await executeQuery(insertQuery, [name, username, password]);
        console.log(results);

        return {
            status: 200,
            message: "User registered successfully",
            user: {
                id: results.insertId,
                username: username,
                role: 'member',
                rating: 50
            },
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Internal server error: " + error.message
        };
    } finally {
        pool.end();
    }
};
