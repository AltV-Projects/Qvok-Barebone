import { emitClient, onClient, Player } from "alt-server";

interface IVariation {
  DlcName: string;
  PedName: string;
  ComponentId: number;
  DrawableId: number;
  TextureId: number;
  Label: string;
}

let clothing: IVariation[] = [];

onClient(
  "client::getComponentName",
  (
    player: Player,
    componentId: number,
    drawableId: number,
    textureId: number
  ) => {
    const modelName =
      player.model == 1885233650 ? "mp_m_freemode_01" : "mp_f_freemode_01";
    let name: string;
    try {
      const componentName = clothing.find(
        (item) =>
          item.ComponentId == componentId &&
          item.DrawableId == drawableId &&
          item.TextureId == textureId &&
          item.PedName == modelName
      );
      name = componentName.Label;
    } catch {}

    emitClient(player, "server:getComponentName", name);
  }
);
