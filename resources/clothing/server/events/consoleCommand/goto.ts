import { onClient, Player } from "alt-server";
import { Vector3 } from "alt-shared";

onClient("consoleCommand::goto", (player: Player, pos: Vector3) => {
  player.pos = pos;
});
