import { Player } from "alt-client";
import { Vector3 } from "alt-shared";
import {
  getEntityForwardVector,
  getEntityModel,
  getEntityType,
  getShapeTestResult,
  startExpensiveSynchronousShapeTestLosProbe,
} from "natives";
import { IRaycastResult } from "../interfaces";

export class Raycast {
  static readonly player = Player.local;

  public static line(scale: number, flags: number, ignoreEntity: number) {
    const nativePlayerForwardVector = getEntityForwardVector(
      this.player.scriptID
    );
    const x = nativePlayerForwardVector.x * scale;
    const y = nativePlayerForwardVector.y * scale;
    const z = nativePlayerForwardVector.z * scale;
    const playerForwardVector = new Vector3(x, y, z);

    let targetPos = this.getTargetPos(this.player.pos, playerForwardVector);

    let ray = startExpensiveSynchronousShapeTestLosProbe(
      this.player.pos.x,
      this.player.pos.y,
      this.player.pos.z,
      targetPos.x,
      targetPos.y,
      targetPos.z,
      flags,
      ignoreEntity,
      undefined
    );

    return this.result(ray);
  }

  private static getTargetPos(
    entityVector: Vector3,
    forwardVector: Vector3
  ): Vector3 {
    const vector: Vector3 = new Vector3(
      entityVector.x + forwardVector.x,
      entityVector.y + forwardVector.y,
      entityVector.z + forwardVector.z
    );
    return vector;
  }

  private static result(ray: number): IRaycastResult {
    let result = getShapeTestResult(
      ray,
      undefined,
      undefined,
      undefined,
      undefined
    );
    let hitEntity = result[4];
    return {
      isHit: result[1],
      pos: new Vector3(result[2].x, result[2].y, result[2].z),
      hitEntity,
      entityType: getEntityType(hitEntity),
      entityHash: getEntityModel(hitEntity),
    };
  }
}
