import { BodyConstructor } from "./lib/RigidBody/BodyConstructor";

const b = new BodyConstructor();
b.update();
document.querySelector("#show").addEventListener("click",()=>{
    b.enableBoundingBox();
})