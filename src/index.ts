import { BodyConstructor } from "./lib/RigidBody/BodyConstructor";

const b = new BodyConstructor();
b.update();
document.querySelector("#showBB").addEventListener("click", () => {
  b.enableBoundingBox();
});
document.querySelector("#showCM").addEventListener("click", () => {
  b.enableCenterOfMass();
});

document.querySelector("#showEB").addEventListener("click", () => {
  b.enableEdgeBisector();
});
document.querySelector("#showNOR").addEventListener("click", () => {
  b.enableNormalize();
});
document.querySelector("#scaler").addEventListener("input", () => {
  let val = document.querySelector("#scaler") as HTMLInputElement;
  b.setScale(Number(val.value));
});
