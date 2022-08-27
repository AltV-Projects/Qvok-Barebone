import { emit, on, Player } from "alt-client";
import { displayHud, displayRadar, setPedHeadBlendData } from "natives";

const localPlayer = Player.local;

on("connectionComplete", () => {
  displayHud(false);
  displayRadar(false);
  emit("client::loadDefaultPedModels");
});
