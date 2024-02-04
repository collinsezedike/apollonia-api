import https from "https";
import { SERVER_URL } from "../config";

const pinger = () => {
  try {
    https.get(SERVER_URL!, (res) => {
      const ping = res.statusCode == 200 ? "Successful" : "Unsuccessful";
      console.log(`${ping} ping`);
    });
  } catch (err: any) {
    console.log("Error occured during ping", err.message);
  }
};

export default pinger;
