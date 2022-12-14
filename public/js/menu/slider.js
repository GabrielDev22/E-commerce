let slider = document.querySelector('.section-slider__contenedor')
let sliderIndividual = document.querySelectorAll('.section-slider__slider')
let contador = 1;
let width = sliderIndividual[0].clientWidth;
console.log(width)
let intervalo = 5000;

window.addEventListener('resize', function(){
    width = sliderIndividual[0].clientWidth;
})

setInterval(function(){
    slides();
},intervalo);

function slides(){
    slider.style.transform = "translate("+(-width*contador)+"px)";
    slider.style.transition = "transform .5s";
    contador++;

    if(contador == sliderIndividual.length){
        setTimeout(function(){
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },5000)
    }
}