import { hash, Player, Vector3 } from "alt-client";
import {
  createCameraWithParams,
  destroyCam,
  pointCamAtCoord,
  renderScriptCams,
  setCamActive,
} from "natives";
import { CameraTypes } from "../enum";

export class Camera {
  _position: Vector3;
  _rotation: Vector3;
  _fieldOfView: number;
  _camHandle: number;
  _localPlayer: Player;
  _isHidden: boolean;
  _isDestroyed: boolean;
  constructor(position: Vector3, rotation: Vector3, fieldOfView: number = 50) {
    this._position = position;
    this._rotation = rotation;
    this._fieldOfView = fieldOfView;
    this._camHandle = createCameraWithParams(
      hash(CameraTypes.DEFAULT_SCRIPTED_CAMERA),
      this._position.x,
      this._position.y,
      this._position.z,
      this._rotation.x,
      this._rotation.y,
      this._rotation.z,
      this._fieldOfView,
      true,
      0
    );
    this._localPlayer = Player.local;
    this._isDestroyed = false;
  }

  private checkIfCamIsDestroyed() {
    if (this._isDestroyed)
      throw new Error("Can not use or destroy an already destroyed camera");
  }

  destroy() {
    this.checkIfCamIsDestroyed();
    if (!this._isHidden) this.hide();
    destroyCam(this._camHandle, false);
    this._isDestroyed = true;
  }

  hide() {
    this.checkIfCamIsDestroyed();
    renderScriptCams(false, false, 0, true, false, 0);
    this._isHidden = true;
  }

  pointAt(position: Vector3) {
    pointCamAtCoord(this._camHandle, position.x, position.y, position.z);
  }

  show() {
    this.checkIfCamIsDestroyed();
    setCamActive(this._camHandle, true);
    renderScriptCams(true, false, 0, true, false, 0);
    this._isHidden = false;
  }
}
