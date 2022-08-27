import { emitServer, log, on, onServer, Player } from "alt-client";
import { setPedComponentVariation } from "natives";
import { RequestModel } from "../../helper";
import { setPedHeadBlendData } from "natives";

const localPlayer = Player.local;

on("client::loadDefaultPedModels", async () => {
  await RequestModel(0x705e61f2); // Male
  await RequestModel(0x9c9effd8); // Female

  emitServer("client::loadDefaultPeds::Finished");
});

onServer("server::setDefaultComponents", () => {
  setPedHeadBlendData(localPlayer, 44, 25, 0, 15, 42, 0, 0.34, 0.33, 0, false);
  setPedComponentVariation(localPlayer, 2, 7, 0, 0);
});
