import { Vector3 } from "alt-shared";

export interface IRaycastResult {
  isHit: boolean;
  pos: Vector3;
  hitEntity: number;
  entityType: number;
  entityHash: number;
}
