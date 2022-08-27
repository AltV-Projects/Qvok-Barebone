import { emitServer, Player } from "alt-client";
import {
  getNumberOfPedDrawableVariations,
  getNumberOfPedTextureVariations,
  setEntityHeading,
  setPedComponentVariation,
  setPedHeadBlendData,
} from "natives";
import { Gender } from "../enum";
import { wv } from "../webview";

export class Ped {
  static localPlayer = Player.local;

  static getComponentInfoForId(componentId: string, drawableId: string) {
    const pedMaxDrawableVariations = getNumberOfPedDrawableVariations(
      Ped.localPlayer,
      parseInt(componentId)
    );
    const pedMaxTextureVariations = getNumberOfPedTextureVariations(
      Ped.localPlayer,
      parseInt(componentId),
      parseInt(drawableId)
    );

    Ped.setComponentForPed(parseInt(componentId), parseInt(drawableId));

    wv.emit(
      "client::setMaxVariations",
      pedMaxDrawableVariations - 1,
      pedMaxTextureVariations - 1
    );
  }

  static setComponentForPed(
    componentId: number,
    drawableId: number,
    textureId = 0
  ) {
    emitServer("client::getComponentName", componentId, drawableId, textureId);
    setPedComponentVariation(
      Ped.localPlayer,
      componentId,
      drawableId,
      textureId,
      0
    );
  }

  static setHeadBlendDataForGender(gender: Gender) {
    if (gender === Gender.Female) {
      setPedHeadBlendData(
        Ped.localPlayer,
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
      Ped.setComponentForPed(2, 4);
    } else {
      setPedHeadBlendData(
        Ped.localPlayer,
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
      Ped.setComponentForPed(2, 7);
    }
  }

  static setPlayerRotation(angle: number) {
    setEntityHeading(Ped.localPlayer, angle);
  }
}
