import { Canvas } from "./lib/Canvas/Canvas";
import { Body } from "./lib/RigidBody/Body";
import { Vector } from "./lib/Vector";
const canvas = new Canvas();
const test: Vector[] = [
  new Vector(-0.7114314713496989, 0.7027554777966535, 0),
  new Vector(-0.9317773919853204, -0.3630301527215535, 0),
  new Vector(-0.7717606353542623, -0.6359131400730649, 0),
  new Vector(-0.48620068621291, -0.8738471792745545, 0),
  new Vector(-0.06961437380914305, -0.9975739766850181, 0),
  new Vector(0.5161287041979935, -0.8565110394518567, 0),
  new Vector(0.8853127566951984, -0.46499604603990824, 0),
  new Vector(0.9907006439948592, -0.13605967068963357, 0),
  new Vector(0.9977229083446032, 0.06744626130769878, 0),
  new Vector(0.9743832654944101, 0.22489386813439294, 0),
  new Vector(0.6580062334855861, 0.7530124811011518, 0),
  new Vector(-0.0265981252491878, 0.9996462072819705, 0),
  new Vector(-0.5119928105491718, 0.8589897333181344, 0),
  new Vector(-0.7114314713496989, 0.7027554777966535, 0),
];

const bod: Body = new Body(test);
const slider:HTMLInputElement = document.querySelector("#slider");
slider.addEventListener("input",()=>{
  //  bod.setRotation(new Vector(0,0, Number(slider.value)));
})
bod.setRotation(new Vector(0,0,45));
function animate(){
  canvas.clear();
  bod.show(canvas);
  requestAnimationFrame(animate);
}

animate();