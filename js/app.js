var inputs = document.querySelectorAll("input.form-control");
var categoria = document.querySelector("#myDropdown.form-control option:checked") //pseudoclase :checked se utiliza para tomar la opción que está seleccionada
var dropDown = document.querySelector("#myDropdown.form-control");
const maxTickets = 10; //Numero maximo de tickets admitidos 

//Creamos tres maps. Uno para poder hacer las validaciones, y otro para guardar los datos.
var datos =  new Map();
var datosValidos = new Map();
var categorias = new Map();

//Rellenamos los descuentos por categoria
categorias.set("Sin categoria",0);
categorias.set("Junior", 15);
categorias.set("Trainee",50);
categorias.set("Estudiantes",80);

/*Ponemos en cada mapa el correspondiente nombre del dato, que usaremos como key y como value usaremos el correspondiente value en <datos> y si el dato es valido o no en <datosValidos
Ademas, añadimos un listener a cada elemento input del formulario
*/
for(let i=0; i<inputs.length; i++){
    //Rellenamos los mapas
    datos.set(inputs[i].name,inputs[i].value);
    datosValidos.set(inputs[i].name, false);

    //Añadimos los listener
    inputs[i].addEventListener('change', actualizarDatos);
    dropDown.addEventListener('change', actualizarDatos);

}
datos.set("Categoria",categoria.text)

//Mostramos los mapas por pantalla
//¡OJO! los mapas no tienen la misma cantidad de pares key-value
console.log("Valores iniciales",
            "\n\n Datos",datos, 
            "\n\n Validacion de datos",datosValidos,
            "\n\n Descuentos por Categorias", categorias
);


//----------//
//FUNCIONES///
//----------//

function actualizarDatos(event) {
    let elemento = event.target;
    let newCategoria = document.querySelector("#myDropdown.form-control option:checked");
    
    datos.set(`${elemento.name}`,`${elemento.value}`);
    datosValidos.set(elemento.name,validar(elemento));
    datos.set("Categoria",newCategoria.text);

    //Mostramos por consola
    console.log("Nuevos valores",
            "\n\n Datos",datos, 
            "\n\n Validacion de datos",datosValidos
    );

}

function validar(elemento){
    
    let valido = false;
    let type = elemento.getAttribute("type");
    let dato = `${elemento.value}`;

    switch (type) {
        case "text":{
            let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;
            valido = patron.test(dato);
            break;
        }     
        case "number":{
            dato = Number(dato);
            valido = dato >= 1 && dato <= maxTickets;
            break;
        }  
        case "email":{
            let patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            valido = patron.test(dato);
            break;
        }  
        default:{
            console.log("ERROR. Tipo de input no admitido para validar dato del formulario: ", type)
            return false;
        }
    }

    if (valido) {
        // Mostrar mensaje exitoso
        elemento.classList.add("is-valid");
        elemento.classList.remove("is-invalid");
      } else {
        // Mostrar mensaje de error
        elemento.classList.add("is-invalid");
        elemento.classList.remove("is-valid");
      }

    return valido;
}

  
