import { onServer, Player } from "alt-client";
import { setPedComponentVariation, setPedHeadBlendData } from "natives";

const localPlayer = Player.local;

onServer("server::setDefaultComponents", () => {
  setPedHeadBlendData(localPlayer, 44, 25, 0, 15, 42, 0, 0.34, 0.33, 0, false);
  setPedComponentVariation(localPlayer, 2, 7, 0, 0);
});
