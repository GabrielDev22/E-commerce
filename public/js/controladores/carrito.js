class CarritoController extends CarritoModel {

    constructor() {
        super()
        
        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []

        } catch (error) {

            console.error('Algo ocurrió con la lectura del localStorage', error)
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
            
        }

    }

    elProductoEstaEnElCarrito(producto) {
        const productos = this.carrito.filter(prods =>prods.id == producto.id).length
        return productos
    }


    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto) {

        const aumentoCarrito = document.querySelector('.search-bar__numeroProducto')

            if(!this.elProductoEstaEnElCarrito(producto)) {
                producto.cantidad = 1
                aumentoCarrito.innerHTML = this.carrito.push(producto)

            } else {
                const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
                productoDeCarrito.cantidad++
            }
    
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }

    async borrarProductoCarrito(id) {
        
        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.log(error)
        }
    }

    async enviarCarrito() {
        
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

            elemSectionCarrito.innerHTML = `
                <h2 style="text-align:center; margin-bottom:40px; font-size:35px; color:#01a5b1;">Enviando carrito...</h2>
                <img style="display: flex; margin: 0 auto;" src="img/productos/enviandoCarrito.svg">
            `
            
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')
                /* mostraCarrito = false */
                console.log(preference)
                await renderPago(preference)
            }, 0)

        } catch (error) {
            console.error(error)
        }
    }
}

const carritoController = new CarritoController()