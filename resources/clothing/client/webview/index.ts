import {
  emitServer,
  getServerIp,
  on,
  onServer,
  Player,
  showCursor,
  WebView,
} from "alt-client";
import { log } from "alt-shared";
import {
  getNumberOfPedDrawableVariations,
  getNumberOfPedTextureVariations,
  setEntityHeading,
  setPedComponentVariation,
} from "natives";

let url =
  getServerIp() === "::ffff:127.0.0.1"
    ? "http://127.0.0.1:5173/"
    : "https://ts-wv.apps.galadan.it/";

const localPlayer = Player.local;

on("client::destroyCamera", () => {
  showCursor(false);
  wv.destroy();
});

let wv = new WebView(url);

wv.on("load", () => {
  wv.focus();

  showCursor(true);

  wv.on("wv::setPlayerRotation", setPlayerRotation);
  wv.on("wv::getComponentInfoForId", getComponentInfoForId);
  wv.on("wv::setGender", (gender: number) =>
    emitServer("client::setGender", gender)
  );
  wv.on("wv::setTextureForComponent", setComponentForPed);

  onServer("server:getComponentName", (name: string) => {
    wv.emit("client::getComponentName", name);
  });
});

function getComponentInfoForId(componentId: string, drawableId: string) {
  const pedMaxDrawableVariations = getNumberOfPedDrawableVariations(
    localPlayer,
    parseInt(componentId)
  );
  const pedMaxTextureVariations = getNumberOfPedTextureVariations(
    localPlayer,
    parseInt(componentId),
    parseInt(drawableId)
  );

  setComponentForPed(parseInt(componentId), parseInt(drawableId));

  wv.emit(
    "client::setMaxVariations",
    pedMaxDrawableVariations - 1,
    pedMaxTextureVariations - 1
  );
}

function setComponentForPed(
  componentId: number,
  drawableId: number,
  textureId = 0
) {
  emitServer("client::getComponentName", componentId, drawableId, textureId);
  setPedComponentVariation(localPlayer, componentId, drawableId, textureId, 0);
}

function setPlayerRotation(angle: number) {
  setEntityHeading(localPlayer, angle);
}
