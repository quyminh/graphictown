const canvas = document.getElementById("mycanvas");
var forward, turn, lift, x, y, z;
var counter, time, play, pause;

var Tcamera, Tprojection, Tmcp, buffers, coord, matrixStack,
    Tmc, Tmodel, rotator, inColor, shaders, texture;


const gl = twgl.getWebGLContext(canvas);
const m4 = twgl.m4;
const v3 = twgl.v3;
const p = twgl.primitives;


function draw() {
    if (control.selectedIndex === 0)
        Tcamera = rotator.getViewMatrix();
    else
        Tcamera = drive();

    let translate = [0, 0, 0];
    let scale = [1, 1, 1];
    let xAngle = [0, 0, 0];
    let yAngle = [0, 0, 0];
    let zAngle = [0, 0, 0];
    val = (8-time)*(16-time)*0.01;
    inColor = [Math.max(1.1-Math.max(val,0.0),0.2), Math.max(1.0-Math.max(val,0.0),0.2), Math.max(1.0-Math.max(val,0.0),0.2)];


    pushMatrix();
    
    mat4.scale(Tmodel, Tmodel, [0.05 * sliderScaleX.value, 0.05 * sliderScaleY.value, 0.05 * sliderScaleZ.value]);
    
    mat4.translate(Tmodel, Tmodel, [sliderX.value * 0.1, sliderY.value * 0.1, sliderZ.value * 0.1]);
    skybox();
    pushMatrix();
    world();
    popMatrix();
    popMatrix();
    time=sliderDay.value;
    //update
    if (play)
        counter += 0.05 * slider2.value;
    if (sun){
        //console.log(sliderDay.value);
        //sliderDay.value=sliderDay.value+0.001;
        sliderDay.value%=24;
    }


    window.requestAnimationFrame(draw);
}



window.onload = setup;