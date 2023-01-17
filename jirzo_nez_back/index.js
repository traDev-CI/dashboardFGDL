const mongoose = require("mongoose");
const app = require("./app");
const { PORT, PORT_DB, API_VERSION, IP_SERVER } = require("./config");

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/jirzonez`,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      app.listen(PORT, () => {
        console.log("********************************");
        console.log("*********** API REST ***********");
        console.log("********************************");
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
      });
    }
  }
);
