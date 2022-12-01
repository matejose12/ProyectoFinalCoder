class Productos {
    constructor(id,producto, marca, color, precio, imagen){
      
        this.id = id,
        this.producto = producto,
        this.marca = marca,
        this.color = color,
        this.precio = precio,
        this.imagen = imagen
    }
    mostrarProducto(){
        console.log(`El producto es ${this.producto}, la marca es ${this.marca}, su color es ${this.color} y su precio es ${this.precio}`)
    }
}
// Creacion de catalogo
//const producto1 = new productos(1,"Luz de colores", "3dmagic","multicolor", 2500,"luzcolor.jpg")
//const producto2 = new productos(2,"Lampara", "planeta","morado", 3500,"luzplaneta.jpg")
//const producto3 = new productos(3,"Iman Argentina", "san juan","blanco", 200,"iman.jpg")
//const producto4 = new productos(4,"Lapicera", "cross","negro", 1900,"lapicera.jpg")
//const producto5 = new productos(5,"Alfombrilla", "trust","rojo", 1200,"alfombrilla.jpg")
//const producto6 = new productos(6,"Portacelular", "3dmagic","blanco", 600,"portacelu.jpg")
//const producto7 = new productos(7,"Vaso termico", "keep","gris metalizado", 1200,"vaso.jpg")
//const producto8 = new productos(8,"Mate", "keep","marron", 1200,"mate.jpg")
//const producto9 = new productos(9,"Masajeador", "superlife","verde", 1700,"masajes.jpg")
//const producto10 = new productos(10,"termo", "Stanley","verde", 5000,"stanley.jpg")
//const producto11 = new productos(11,"Llavero Toronto destapador", "TAHG","rojo", 245,"LlaveroT.jpg")
//const producto12 = new productos(12,"Llavero Solar Key - Luz LED", "TAHG","gris", 1625,"LlaverSolar.png")
//const producto13 = new productos(13,"Llavero K159 rectangular madera", "TAHG","rosa", 1081,"LlaveroMadera.png")
//const producto14 = new productos(14,"Bol 750 Vento", "TAHG","Multicolor", 112,"vento.jpg")
//const producto15 = new productos(15,"Bol Shark", "Zecat","verde", 109,"shark.jpg")
//const producto16 = new productos(16,"Boligrafo Foster", "Zecat","Multicolor", 124,"foster.jpg")
//const producto17 = new productos(17,"Boligrafo Organic", "Zecat","Multicolor", 165,"organic.jpg")
//const producto18 = new productos(18,"Reloj de Pared RJP 1064 BLANCO", "Zecat","blanco", 4159,"Reloj.png")
//const producto19 = new productos(19,"Matera Sofia", "TAHG","gris", 7999,"Matera.jpg")
//const producto20 = new productos(20,"Utensilios para Cocina", "La Baule","Marron", 2100,"utencillos.jpg")
//array de stock
let catalogo = []
const cargarCatalogo = async()=>{
    const response = await fetch("productos.json")
    const data =  await response.json()
    console.log(data)
    for(let productos of data){
        let productosNuevos = new Productos(productos.id,productos.producto, productos.marca, productos.color, productos.precio, productos.imagen)
        catalogo.push(productosNuevos)
    }
}
cargarCatalogo()

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}else{
    //Entra por primera vez
    cargarCatalogo()
    console.log(catalogo)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}
