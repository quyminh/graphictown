function initControls() {

    //Examine
    control = document.getElementById('control');

    view = document.getElementById('view');

    //pattern is actually the pause/play button
    togglePlay = document.getElementById('play');
    reset = document.getElementById('reset');
    toggleSun = document.getElementById('sun');
    //Rotate
    slider2 = document.getElementById('slider2');
    slider2.value = 1;

    sliderDay = document.getElementById('day');

    //**Translating**//                
    //X
    sliderX = document.getElementById('sliderX');
    sliderX.value = 0;

    //Y
    sliderY = document.getElementById('sliderY');
    sliderY.value = 0;

    //Z
    sliderZ = document.getElementById('sliderZ');
    sliderZ.value = 0;

    //**Scaling**//                
    //X
    sliderScaleX = document.getElementById('sliderScaleX');
    sliderScaleX.value = 5;

    //Y
    sliderScaleY = document.getElementById('sliderScaleY');
    sliderScaleY.value = 5;

    //Z
    sliderScaleZ = document.getElementById('sliderScaleZ');
    sliderScaleZ.value = 5;
}