import { log, on, Player } from "alt-client";
import { getEntityHeading, getGroundZFor3dCoord } from "natives";

const localPlayer = Player.local;

on("consoleCommand", (command: string, ...args: string[]) => {
  if (command === "gps") {
    log(
      JSON.stringify({
        x: localPlayer.pos.x,
        y: localPlayer.pos.y,
        z: getGroundZFor3dCoord(
          localPlayer.pos.x,
          localPlayer.pos.y,
          localPlayer.pos.z,
          null,
          true,
          true
        ),
        r: {
          y: localPlayer.rot.x,
          p: localPlayer.rot.y,
          r: getEntityHeading(localPlayer),
        },
      })
    );
  }
});
