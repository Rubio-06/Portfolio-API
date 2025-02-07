import express from 'express';
import cors from 'cors';
import 'dotenv/config'

// ----- Routes ----- //
import mailsRoutes from "./routes/mails.routes.js";
import githubRoutes from "./routes/github.routes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/mails", mailsRoutes);

app.use("/github", githubRoutes);

app.listen(port, () => {
    console.log(`Portfolio API | listening on port ${port}`);
});