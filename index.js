const express = require("express");

const { userRouter } = require("./routes/users.routes");
const { connectDB } = require("./db");
const { notesRouter } = require("./routes/notes.routes");
require("dotenv").config()
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",notesRouter)





// app.listen(process.env.port, async()=>{
//     try {
//         await connection
//         console.log("Connected to db");
//         console.log(`Server running at port ${process.env.port}`);
//     } catch (error) {
//         console.error("Error starting the server:", error);
//         console.log("something went wrong");
//     }
// })

// const express = require("express");
// require("dotenv").config();
// const { connectDB } = require("./db");
// const { userRouter } = require("./routes/user.routes");
// const { postRouter } = require("./routes/post.routes");

// const app = express();
// app.use(express.json());

// app.use("/users", userRouter);
// app.use("/posts", postRouter);

connectDB().then(() => {
  app.listen(process.env.port, async () => {
    try {
      console.log(`connected to server port ${process.env.port}`);
    } catch (error) {
      console.log(error);
      console.log("something went wrong");
    }
  });
});