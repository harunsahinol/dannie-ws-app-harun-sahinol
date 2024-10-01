db._createDatabase("chatapp");
var users = require("@arangodb/users");

users.save("admin", "test123");
users.grantDatabase("admin", "chatapp", "rw");
users.grantDatabase("admin", "chatapp", "administrate");