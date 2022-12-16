async function renderPlantillaListado(listado) {

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

    (() => {
        const titleQuestions = [...document.querySelectorAll('.questions__title')];
        console.log(titleQuestions)
    
        titleQuestions.forEach(question =>{
            question.addEventListener('click', ()=>{
                let height = 0;
                let answer = question.nextElementSibling;
                let addPadding = question.parentElement.parentElement;
    
                addPadding.classList.toggle('questions__padding--add');
                question.children[0].classList.toggle('questions__arrow--rotate');
    
                if(answer.clientHeight === 0){
                    height = answer.scrollHeight;
                }
    
                answer.style.height = `${height}px`;
            });
        });
    })();

    try {
        
        const respuesta = await fetch('plantillas/inicio.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)

        const html = template({ listado })
    
        document.getElementsByClassName('cards-container')[0].innerHTML = html

    } catch (error) {
        console.error(error)
    }
}

function agregarCarrito(e, id, ref) { 
    e.preventDefault()
    const producto = productoController.productos.find(producto => producto.id == id)
    console.log(producto)
    carritoController.agregarAlCarrito(producto)
}

async function initInicio() {
    console.warn('initInicio()')

    const productos = await productoController.obtenerProductos()

    await renderPlantillaListado(productos)

    document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${productos.length} productos`
}