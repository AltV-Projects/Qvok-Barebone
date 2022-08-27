import {
  emitServer,
  getServerIp,
  onServer,
  setTimeout,
  showCursor,
  WebView,
} from "alt-client";

import { Ped as PedHelper } from "../helper/Ped";

let url =
  getServerIp() === "::ffff:127.0.0.1"
    ? "http://127.0.0.1:5173/"
    : "https://ts-wv.apps.galadan.it/";

export const wv = new WebView(url);

wv.on("load", () => {
  wv.focus();

  showCursor(true);

  wv.on("wv::setPlayerRotation", PedHelper.setPlayerRotation);
  wv.on("wv::getComponentInfoForId", PedHelper.getComponentInfoForId);
  wv.on("wv::setGender", (gender: number) => {
    emitServer("client::setGender", gender);

    setTimeout(() => PedHelper.setHeadBlendDataForGender(gender), 100);
  });
  wv.on(
    "wv::setComponentName",
    (
      componentId: number,
      drawableId: number,
      textureId: number,
      name: string
    ) =>
      emitServer(
        "client::setComponentName",
        componentId,
        drawableId,
        textureId,
        name
      )
  );
  wv.on("wv::setTextureForComponent", PedHelper.setComponentForPed);

  onServer("server:getComponentName", (name: string, suggestions: string[]) => {
    wv.emit("client::getComponentName", name, suggestions);
  });
});
