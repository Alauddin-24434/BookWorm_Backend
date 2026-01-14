import app from "./app";
import { connectDB } from "./config/database";

const port = 5000;

async function serverStart() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

serverStart();
