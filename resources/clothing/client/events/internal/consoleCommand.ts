import { emit, emitServer, log, on, Player } from "alt-client";
import { Vector3 } from "alt-shared";
import {
  getEntityHeading,
  getGroundZFor3dCoord,
  setPedHeadBlendData,
} from "natives";

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

    case "hbd":
      if (args[0] === undefined) {
        let a1 = Math.floor(Math.random() * 45);
        let a2 = Math.floor(Math.random() * 45);
        let a3 = Math.floor(Math.random() * 45);
        let a4 = Math.floor(Math.random() * 45);
        let a5 = parseFloat(Math.random().toFixed(2));
        let a6 = parseFloat(Math.random().toFixed(2));
        setPedHeadBlendData(
          localPlayer,
          a1,
          a2,
          0,
          a3,
          a4,
          0,
          a5,
          a6,
          0,
          false
        );
        log(
          `setPedHeadBlendData(localPlayer, ${a1}, ${a2}, 0, ${a3}, ${a4}, 0, ${a5}, ${a6}, 0, false)`
        );
      } else {
        setPedHeadBlendData(
          localPlayer,
          parseInt(args[0]),
          parseInt(args[1]),
          0,
          parseInt(args[2]),
          parseInt(args[3]),
          0,
          parseFloat(args[4]),
          parseFloat(args[5]),
          0,
          false
        );
      }
      break;

    default:
      log("Error, command not found!");
      break;
  }
});
