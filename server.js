const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const app = express();

console.log("PID: ", process.pid)

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
