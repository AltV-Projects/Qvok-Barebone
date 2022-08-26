import { emit, on } from "alt-client";
import { displayHud, displayRadar } from "natives";

on("connectionComplete", () => {
  displayHud(false);
  displayRadar(false);
  emit("client::loadDefaultPedModels");
});
