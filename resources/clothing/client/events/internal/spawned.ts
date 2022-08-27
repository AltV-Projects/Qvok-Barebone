import { on, Player, setTimeout, toggleGameControls } from "alt-client";
import { setEntityHeading } from "natives";
import { Camera } from "../../helper";
import { Vector3 } from "alt-shared";

const localPlayer = Player.local;

let camera: Camera;

on("spawned", () => {
  setEntityHeading(localPlayer, 180);
  toggleGameControls(false);

  setTimeout(() => {
    const cameraPosition = new Vector3(402.8995, -999.0761, -99.104);
    camera = new Camera(cameraPosition, new Vector3(0, 0, 0));
    camera.pointAt(localPlayer.pos);
    camera.show();
  }, 1500);
});
