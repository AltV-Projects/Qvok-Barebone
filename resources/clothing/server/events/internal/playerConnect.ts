import { on, Player } from "alt-server";
import { log } from "alt-shared";

const whitelistedPlayers: string[] = [
  "342344761505742849",
  "227484676510580738",
];

on("playerConnect", (player: Player) => {
  let idx = whitelistedPlayers.findIndex((x: string) => x == player.discordID);
  if (idx === -1) {
    log(
      `Someone tried to connect, but wasn't whitelisted. ID: ${
        player.discordID || "No Discord ID provided"
      }`
    );
    player.kick("You are not whitelisted!");
  }
});
