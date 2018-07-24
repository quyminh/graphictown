  function world() {

    //PLANE
    pushMatrix();
    inColor = [1.0,1.0,1.0];
    texture = camoTex;
    translate([0,50,-100]);
    var count = (counter*0.1)%2;
    //console.log(count);
    var up = [0,1,0]
    var t;
    var p0;
    var d0;
    var p1;
    var d1;
    if(count<1) {
     t = count;
     p0=[0,0,0];
     d0=[500,0,0];
     p1=[0,0,200];
     d1=[200,-200,0];
    }
    else {
     t = count-1;
     p1=[0,0,0];
     d1=[500,0,0];
     p0=[0,0,200];
     d0=[200,-200,0];
    }

    var P = [p0,d0,p1,d1]; // All the control points
      

    var Tmodel_trans=m4.translation(Cubic(Hermite,P,t));
    var Tmodel_rot=m4.lookAt([0,0,0],Cubic(HermiteDerivative,P,t),up);
    var temp=m4.multiply(Tmodel_rot,Tmodel_trans);
    mat4.mul(Tmodel,Tmodel,temp)
    rotate(rad(90),[0,1,0]);
    drawPlane();
    popMatrix();

    pushMatrix();

    translate([0,-5,0])
    //ground
    for (var i = -1; i<=1; i++) {
      for (var j = -1; j<=1; j++) {
        if (sun){
          inColor = [0.45,0.5,0.0];
          texture = grassTex;
        }
        else{
          texture = snowTex;
        }
        
        pushMatrix();

        
        translate([i*100,0,j*100]);
        drawGround();
        popMatrix();
      }
    }
    inColor = [1.0,1.0,1.0];
        
    //person
    pushMatrix();
    scale([0.8,0.8,0.8]);
    rotateFromPiv([0,0,0],-rad(counter*8),[0,1,0]);
    translate([12,2,0]);
    drawPerson();
    popMatrix();
   

    //house
    for (var i = -3; i<=3; i++) {
      for (var j = -3; j<=3; j++) {
        pushMatrix();
        translate([40*i,5,40*j])
        scale([3,3,3]);
        
        drawHouse();
        defaultTex();
        popMatrix();
        inColor = [1.0,1.0,1.0];

      }
    }
    popMatrix();

    //signpost
    pushMatrix();
    translate([20,-10,10]);
    drawSign();
    popMatrix();
  }

  
  function drawPlane() {
    pushMatrix();
    scale([15,5,5]);
    rotate(rad(90),[0,0,1]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    translate([10,0,0]);
    scale([5,5,5]);
    rotate(rad(-90),[0,0,1]);
    createBuffers('truncatedCone');
    popMatrix();

    pushMatrix();
    rotateFromPiv([12,5,0,0],rad(counter*100),[1,0,0]);
    scale([0.5,5,1.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    rotateFromPiv([12,5,0,0],rad(counter*100+120),[1,0,0]);
    scale([0.5,5,1.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    rotateFromPiv([12,5,0,0],rad(counter*100+240),[1,0,0]);
    scale([0.5,5,1.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,2,0]);
    scale([5,5,2.5]);
    createBuffers('sphere');
    popMatrix();

    pushMatrix();
    translate([-10,0,0]);
    scale([5,5,5]);
    rotate(rad(90),[0,0,1]);
    createBuffers('truncatedCone');
    popMatrix();

    pushMatrix();
    translate([-10,0,0]);
    scale([3,1,20]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([-12,5,0]);
    rotate(rad(45),[0,0,1]);
    scale([3,10,1]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,0,7]);
    rotate(rad(-45),[0,1,0]);
    scale([5,1.5,10]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,0,-7]);
    rotate(rad(45),[0,1,0]);
    scale([5,1.5,10]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,-4,0]);
    rotate(rad(45),[1,0,0]);
    scale([0.5,6,0.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,-7,2]);
    scale([1,1,2]);
    rotate(rad(90),[1,0,0]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    translate([0,-4,0]);
    rotate(rad(-45),[1,0,0]);
    scale([0.5,6,0.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,-7,-2]);
    scale([1,1,2]);
    rotate(rad(90),[1,0,0]);
    createBuffers('cylinder');
    popMatrix();

  }


  function drawSign() {
    pushMatrix();
    texture = roofTex;
    scale([0.5,20,0.5]);
    translate([0,0.63,0]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    texture = signTex;
    if (!sun)
    texture = logoTex;
    scale([12,15,0.5]);
    translate([0,2,0]);
    createBuffers('cube')
    popMatrix();
  }

  function drawHouse() {
    pushMatrix();
    inColor=[1,1.1,1.2];
    texture = bricksTex;
    //walls
    coord = [-1.4,1.4];
    for (var i = 0; i<2; i++) {
      pushMatrix();
      translate([coord[i],0,0]);
      scale([0.3,3,3]);
      createBuffers('cube');
      popMatrix();
    }
    texture = bodyTex;
    for (var i = 0; i<2; i++) {
      if (i==1) texture = faceTex;
      pushMatrix();
      translate([0,0,coord[i]]);
      scale([3,3,0.3])
      createBuffers('cube');
      popMatrix();
    }

    pushMatrix();
    inColor=[0.2,0.8,1.0];
    texture = roofTex;
    //roof
    translate([0,2.5,0]);
    scale([3,2,3]);
    createBuffers('pyramid');
    popMatrix();

    //chimney
    inColor=[0.8,0.7,0.8];
    pushMatrix();
    translate([0.7,2.5,0.7]);
    scale([0.5,1.5,0.5]);
    createBuffers('cube');
    popMatrix();

    if(!sun){
      texture = steamTex;
      inColor=[1,1,1];
      //smoke
      for(i=0;i<5;i++) {
        pushMatrix();
        translate([0.7,2.5+((counter+i)*0.5)%5,0.7]);
        scale([0.1,0.1,0.1]);
        createBuffers('sphere');
        popMatrix();
      }
      inColor = [1.0,1.0,1.0];
    }
   

    popMatrix();
    

  }



  function drawGround() {
    pushMatrix();

    pushMatrix();
    translate([0,0,0]);
    scale([100,100,100]);
    createBuffers('plane');
    popMatrix();

    popMatrix();
  }



  function drawPerson(speed) {
    pushMatrix();

    //head
    texture = headTex;
    pushMatrix();
      translate([0,1.25,0]);
      scale([0.8,0.8,0.8]);
      rotate(rad(130),[0,1,0]);
      createBuffers("sphere");
    popMatrix();

    //body
    texture = steamTex;
    if(sun){
      inColor = [1.5,0.0,0.0];
    } else{
      inColor = [0,0,0];
    }
    
    pushMatrix();
      translate([0,0,0]);
      scale([1,1.75,0.5]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

    //arms
    texture = steamTex;
    if(sun){
      inColor = [0.8,0.6,0.4];
    } else{
      inColor = [0,0,0];
    }
    coord = [0.75,-0.75];
    var armRot = [rad(30*Math.sin(counter*0.8)), rad(-30*Math.sin(counter*0.8))]
    for (var i = 0; i<coord.length; i++) {
      pushMatrix();
        mat4.translate(Tmodel,Tmodel,[coord[i],0.75,0]);
        rotateFromPiv([0,-0.75,0], -armRot[i],[1,0,0]);
        mat4.scale(Tmodel,Tmodel,[0.5,1.75,0.5]);
        createBuffers("cube")
      popMatrix();
    }

    if(sun){
      inColor = [0.17,0.53,1.14];
    } else{
      inColor = [0,0,0];
    }
    //legs
    coord = [0.25,-0.25];
    var legRot = [rad(50*Math.sin(counter*0.8)), rad(-50*Math.sin(counter*0.8))]
    for (var i = 0; i<coord.length; i++) {
      pushMatrix();
        mat4.translate(Tmodel,Tmodel,[coord[i],-0.75,0]);
        rotateFromPiv([0,-0.75,0], legRot[i],[1,0,0]);
        mat4.scale(Tmodel,Tmodel,[0.5,1.5,0.5]);
        createBuffers("cube")
      popMatrix();
    }

    inColor = [1.0,1.0,1.0];
    popMatrix();
  }

function createBuffers(block, sky) {
    switch (block) {
      case "truncatedCone":
        buffers = truncatedConeBuffer;
        break;
      case "torus":
        buffers = torusBuffer;
        break;
      case "plane":
        buffers = planeBuffer;
        break;
      case "cresent":
        buffers = cresentBuffer;
        break;
      case "disc":
        buffers = discBuffer;
        break;
      case "sphere":
        buffers = sphereBuffer;
        break;
      case "skyBox":
        buffers = skyBoxBuffer;
        break;
      case "cube":
        buffers = cubeBuffer;
        break;
      case "cylinder":
        buffers = cylinderBuffer;
        break;
      case "pyramid":
        buffers = pyramidBuffer;
        break;
      case "octagon":
        buffers = octagonBuffer;
        break;
      case "diamond":
        buffers = diamondBuffer;
        break;
    }


    var skyBox = sky || 0.0;
    Tmc = m4.multiply(Tmodel,Tcamera);
    Tmcp = m4.multiply(Tmc,Tprojection);
    twgl.setUniforms(shaders,{transf : Tmcp,
                               normalMatrix:m4.transpose(m4.inverse(Tmodel)),
                                 time:counter*10,
                                   patttern:play,
                                         inColor:inColor,
                                             day:sliderDay.value,
                                               tex: texture,
                                                skyBox: skyBox,});
    twgl.setBuffersAndAttributes(gl,shaders,buffers);
    twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
  }
