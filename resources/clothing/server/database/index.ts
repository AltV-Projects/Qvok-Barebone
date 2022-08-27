import { emit, log, on, Player } from "alt-server";
import { DataSource } from "typeorm";
import { DBCloth, DBClothSuggestion, DBWhitelist } from "./entity";

let canConnect = false;

on("playerConnect", (player: Player) => {
  if (!canConnect)
    player.kick(
      "Die Datenbank ist noch nicht vollständig geladen, bitte versuche es später erneut"
    );
});

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "clothing",
  password: "clothing",
  database: "clothing",
  entities: [DBCloth, DBClothSuggestion, DBWhitelist],
});

AppDataSource.initialize()
  .then(() => {
    log("Data Source has been initialized!");
    canConnect = true;
    emit("db::connected");
  })
  .catch((err) => {
    log("Error during Data Source initialization", err);
  });
