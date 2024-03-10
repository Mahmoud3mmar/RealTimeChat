// import { Sequelize, Model, DataTypes } from "sequelize";
import mongoose from 'mongoose'



const ConnectToDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/SocketApp")
    .then(() => {
      console.log("Connected to db....");
    })
    .catch((error) => {
      console.error('DB connection failed!!!!!', error);
    });
};


export default ConnectToDB

