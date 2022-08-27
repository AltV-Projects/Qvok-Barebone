import {
  emitServer,
  getServerIp,
  on,
  onServer,
  Player,
  setTimeout,
  showCursor,
  WebView,
} from "alt-client";
import {
  getNumberOfPedDrawableVariations,
  getNumberOfPedTextureVariations,
  setEntityHeading,
  setPedComponentVariation,
  setPedHeadBlendData,
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
  wv.on("wv::setGender", (gender: number) => {
    emitServer("client::setGender", gender);

    setTimeout(() => {
      if (gender === 1) {
        setPedHeadBlendData(
          localPlayer,
          36,
          32,
          0,
          39,
          17,
          0,
          0.48,
          0.34,
          0,
          false
        );
        setComponentForPed(2, 4);
      } else {
        setPedHeadBlendData(
          localPlayer,
          44,
          25,
          0,
          15,
          42,
          0,
          0.34,
          0.33,
          0,
          false
        );
        setComponentForPed(2, 7);
      }
    }, 100);
  });
  wv.on(
    "wv::setNameForComponent",
    (
      componentId: number,
      drawableId: number,
      textureId: number,
      name: string
    ) =>
      emitServer(
        "client::setNameForComponent",
        componentId,
        drawableId,
        textureId,
        name
      )
  );
  wv.on("wv::setTextureForComponent", setComponentForPed);

  onServer("server:getComponentName", (name: string, suggestions: string[]) => {
    wv.emit("client::getComponentName", name, suggestions);
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
