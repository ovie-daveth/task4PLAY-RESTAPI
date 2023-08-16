const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())



const PORT = process.env.PORT || 5001
app.use(express.json());

app.use("/api/v1/task", require("./routes/taskRoute.js"))


app.listen(PORT, () => console.log(`listening on port  ${PORT} `))