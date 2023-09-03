import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 8080;
const host = "localhost";
const protocol = "http";

app.listen(port, () => {
  console.log(`🚀 Server is running at ${protocol}://${host}:${port}`);
});
