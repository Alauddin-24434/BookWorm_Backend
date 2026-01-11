import app from "./app";

const port = 5000;

async function serverStart() {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

serverStart();
