import { emitServer, log, on, Player } from "alt-client";
import { RequestModel } from "../../helper";

const localPlayer = Player.local;

on("client::loadDefaultPedModels", async () => {
  await RequestModel(0x705e61f2); // Male
  await RequestModel(0x9c9effd8); // Female

  emitServer("client::loadDefaultPeds::Finished");
});
