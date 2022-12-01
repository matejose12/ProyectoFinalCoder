//capturas del DOM
let divProductos = document.getElementById("productos")
let btnGuardarLibro = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")


let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

//FUNCTIONS
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let productos of array){
        let nuevoProducto = document.createElement("div")
        nuevoProducto.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        
        nuevoProducto.innerHTML = `<div id="${productos.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${productos.imagen}" alt="${productos.titulo} de ${productos.marca}">
                                    <div class="card-body">
                                        <h4 class="card-title">${productos.producto}</h4>
                                        <p>Marca: ${productos.marca}</p>
                                        <p class="${productos.precio <= 2000 ? "ofertaColor" : "precioComun"}">Precio: ${productos.precio}</p>
                                    <button id="agregarBtn${productos.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevoProducto)
        let btnAgregar = document.getElementById(`agregarBtn${productos.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(productos)
        })
    }
}
//function AGREGAR AL CARRITO
function agregarAlCarrito(productos){
    
    //Primer paso
    productosEnCarrito.push(productos)
    
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    Swal.fire({
        title: "Se agrego producto al carrito",
        icon: "success",
        confirmButtonText: "Entendido",
        confirmButtonColor: "blue",
        timer: 3000,
        text: `El producto ${productos.producto} se agrego al carrito`


    })
}
//function IMPRIMIR cards en el carrito
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.producto}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
           //vuelvo a calcular el total
           compraTotal(array)
        })
    })
    compraTotal(array)
}

//function calcular total de compra 
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `  El total de su carrito es ${acumulador}`
}


//function de buscador 
function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (productos) => productos.producto.toLowerCase().includes(buscado.toLowerCase()) || productos.marca.toLowerCase().includes(buscado.toLowerCase())
        
    )
  
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su búsqueda.. a continuación tiene todo nuestro catálogo disponible</h3>`, mostrarCatalogo(array)) 
    : (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}


function ordenarMayorMenor(array){
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a,b) => (b.precio - a.precio))
    console.log(array)
    console.log(mayorMenor)
    mostrarCatalogo(mayorMenor)
}
function ordenarMenorMayor(array){
    let menorMayor = [].concat(array)
   menorMayor.sort((a,b) => (a.precio - b.precio))
   console.log(array)
   console.log(menorMayor)
   mostrarCatalogo(menorMayor)
}
function ordenarAlfabeticamente(array){
    let alfabeticamente = array.slice()
    alfabeticamente.sort((a,b) => {
    if(a.titulo < b.titulo)return -1
    if(a.titulo > b.titulo)return 1
    return 0
   })
   console.log(array)
   console.log(alfabeticamente)
   mostrarCatalogo(alfabeticamente)
}





//EVENTOS FILTROS
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, catalogo)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
if (selectOrden.value == 1){
ordenarMayorMenor(catalogo)
}else if (selectOrden.value == 2){
ordenarMenorMayor(catalogo)
}else if (selectOrden.value == 3){
ordenarAlfabeticamente(catalogo)
}else{
    mostrarCatalogo(catalogo)
}
}) 

botonFinalizarCompra.addEventListener("click",()=>{
    finalizarCompra()
})
// ALERTAS
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'blue',
            text: `Muchas gracias por su compra ;) . `,
            })
            productosEnCarrito =[]
            localStorage.removeItem("carrito")
        }else{
            
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Recuerde que los productos estan en carrito ;)`,
                confirmButtonColor: 'blue',
                timer:4000
            })
        }
    })
}
//CÓDIGO:
//mostrarCatalogo(catalogo)
setTimeout ( ()=>{
    loaderTexto.innerHTML=""
    loader.remove()
    mostrarCatalogo(catalogo)
},500)


productosEnCarrito.length == 0 && console.log("El carrito está vacio")
// fin del codigo gracias por su visita :)


