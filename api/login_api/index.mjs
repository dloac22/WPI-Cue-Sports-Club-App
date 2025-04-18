import mysql from 'mysql';

export const handler = async (event) => {
    const pool = mysql.createPool({
        host: "cue-sports-database.cfa2g4o42i87.us-east-2.rds.amazonaws.com",
        user: "buddy",
        password: "sR$p&aapi,n3]PM",
        database: "cue_club"
    });
    
    const accountNotFound = {
        status: 404,
        message: "Account not found",
    }
    const insufficientData = {
        status: 400,
        message: "Insufficient data",
    }
    const invalidCredentials = {
        status: 401,
        message: "Invalid credentials",
    }

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

    const getAccountDetails = async (username) => {
        const accountQuery = "SELECT user_id, user_name, password_hash, role, rating FROM users WHERE user_name = ?";
        const account = await executeQuery(accountQuery, [username]);
        if (account.length === 0) {
            return accountNotFound;
        } else {
            return account[0];
        }
    };


    

    

    try {
        const { username, password } = event;
        if (!username || !password) {
            return insufficientData;
        }
        const user = await getAccountDetails(username);

        if (user.password_hash !== password) {
            return invalidCredentials;
        }

        return {
            status: 200,
            message: "Login successful",
            user: {
                id: user.user_id,
                username: user.user_name,
                role: user.role,
                rating: user.rating
            }
        };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal server error" + error.message };
    } finally {
        pool.end();
    }
};
