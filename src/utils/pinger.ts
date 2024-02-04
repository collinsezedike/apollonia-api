import http from "http";
import { SERVER_URL } from "../config";

const pinger = () => {
  try {
    http.get(SERVER_URL!, (res) => {
      const ping = res.statusCode == 200 ? "Successful" : "Unsuccessful";
      console.log(`${ping} ping`);
    });
  } catch (err: any) {
    console.log("Error occured during ping", err.message);
  }
};

export default pinger;
