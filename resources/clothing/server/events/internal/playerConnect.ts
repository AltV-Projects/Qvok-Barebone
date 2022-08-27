import { on, Player } from "alt-server";
import { log } from "alt-shared";
import { AppDataSource } from "../../database";
import { DBWhitelist } from "../../database/entity";
import { IWhitelistedPlayer } from "../../interfaces";

let whitelistedPlayers: IWhitelistedPlayer[] = [];
const whitelistRepository = AppDataSource.getRepository(DBWhitelist);

async function reloadWhitelistedPlayers() {
  whitelistedPlayers = [];
  const tmp = await whitelistRepository.find();
  log(`Found ${tmp.length} whitelisted user(s) in our database`);
  tmp.forEach((item) =>
    whitelistedPlayers.push({
      DiscordId: item.DiscordID,
      Username: item.Username,
    })
  );
  log(`Added ${tmp.length} whitelisted user(s) to quick access`);
}

on("db::connected", async () => {
  await reloadWhitelistedPlayers();
});

on("playerConnect", async (player: Player) => {
  await reloadWhitelistedPlayers();
  let idx = whitelistedPlayers.findIndex(
    (x: IWhitelistedPlayer) => x.DiscordId == player.discordID
  );
  if (idx === -1) {
    log(
      `Someone tried to connect, but wasn't whitelisted. ID: ${
        player.discordID || "No Discord ID provided"
      }`
    );
    player.kick("You are not whitelisted!");
  }
});
