
function updateName(oldname, newname) {
    var dbName = 'rldb';

    const { MongoClient } = require("mongodb");
    // Connection URI
    const uri = "mongodb+srv://admin:sunless@rocketleague.39ina.mongodb.net/rocketleague?retryWrites=true&w=majority";
    // Create a new MongoClient
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        if (err) {
        console.log(err);
        throw err;
        }

        console.log("Connected successfully to Mongodb");

        const db = client.db(dbName);

        var query = { name: oldname };
        var newval = { $set: {name: newname } };
        db.collection("players").updateOne(query, newval, function(err, res) {
            if(err) throw err;
            console.log("1 document updated");
            db.close();
        })

        db.close();
    }
    );
}
