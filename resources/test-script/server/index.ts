import { on, onClient, Player } from "alt-server";

on("playerConnect", (player: Player) => {
  console.log(`[playerConnect] ${player.name} just connected`);
});

onClient("client::event::connectionComplete", (player: Player) => {
  console.log(
    `[client::event::connectionComplete] ${player.name} sent foreign event`
  );
});
