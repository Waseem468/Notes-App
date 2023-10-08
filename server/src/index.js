const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
require("./db/server");
const userRouter = require("./routes/userRouter");
// const NoteRouter = require("./routes/noteRouter")

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/user', userRouter);
// app.use('/api', NoteRouter)

app.listen(5000, () => {
    console.log("listening port 5000")
})