import { emit, emitServer, log, on, Player } from "alt-client";
import { Vector3 } from "alt-shared";
import { getEntityHeading, getGroundZFor3dCoord } from "natives";

const localPlayer = Player.local;

on("consoleCommand", (command: string, ...args: string[]) => {
  switch (command) {
    case "gps":
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
      break;

    case "goto":
      emitServer(
        "consoleCommand::goto",
        new Vector3(
          parseFloat(args[0]),
          parseFloat(args[1]),
          parseFloat(args[2])
        )
      );
      break;

    case "destroycam":
      emit("client::destroyCamera");
      break;
  }
});
