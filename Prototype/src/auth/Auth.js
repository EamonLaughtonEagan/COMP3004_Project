import { Cache, Users } from "../cache/Cache";

export class Auth {
    static user = null;

    static login = (email, pass) => {
        if (!email || !pass) {
            return null;
        }

        const authCallback = () => {
            Cache.users.forEach((u) => {
                if (u.email.toLowerCase() === email.toLowerCase()) {
                    Auth.user = u;
                }
            });

            if (!Auth.user) {
                console.log("No user with email " + email + " found");
                return null;
            }

            if (pass === "hunter2") {
                return Auth.user;
            }
        };

        if (!Cache.fetchedRecently()) {
            Users.fetchUsers().then(() => {
                authCallback();
            });
        } else {
            authCallback();
        }
    };
}
