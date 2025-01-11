document.addEventListener('DOMContentLoaded', function() {
    navegacion_fija();
    crearGaleria();
});

function navegacion_fija(){
    const header = document.querySelector('.header');
    const sobre_festival = document.querySelector('.informacion');

    window.addEventListener('scroll', function(){
        if(sobre_festival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria_imagenes');
    const cantidad_imagenes = 16;
    for (let i = 1; i <= cantidad_imagenes; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen galeria';

        //Event.handler
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i){

    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen galeria';

    //Generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.appendChild(imagen);

    //Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn_cerrar');
    cerrarModalBtn.onclick = cerrarModal;
    modal.appendChild(cerrarModalBtn);

    //Eliminar modal
    modal.onclick = cerrarModal

    //Agregar el HTML
    const body = document.querySelector('body');
    body.appendChild(modal);
    body.classList.add('overflow-hidden');
}

function cerrarModal(){
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');
    modal.classList.add('fadeOut');
    body.classList.remove('overflow-hidden');

    setTimeout(() => {
        modal?.remove();
    }, 500);
}