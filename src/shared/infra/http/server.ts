/* eslint-disable no-console */
import { app } from './app';

app.listen(3333, () => {
  console.clear();
  console.log("🛰  Don't panic! The server is up...");
});
