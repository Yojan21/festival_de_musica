document.addEventListener('DOMContentLoaded', function() {
    navegacion_fija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
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
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;

        //Event.handler
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i){

    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;

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

function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion_principal a');
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                actual = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('active');
            }
        });
    });
}

function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion_principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', e =>{
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}