var app = {
    inicio: function () {
        this.iniciaFastClick();
        this.iniciaBotones();
    },
    iniciaFastClick: function () {
        FastClick.attach(document.body);
    },
    iniciaBotones: function () {
        var boton = document.querySelector("#tomar-foto");
        boton.addEventListener('click', function () {
            app.tomarFoto(Camera.PictureSourceType.CAMERA);
        });
        var filterButtons = document.querySelectorAll('.button-filter');
        filterButtons[0].addEventListener('click', function () {
            app.aplicaFiltro('gray');
        });
        filterButtons[1].addEventListener('click', function () {
            app.aplicaFiltro('negative');
        });
        filterButtons[2].addEventListener('click', function () {
            app.aplicaFiltro('sepia');
        });
        var buttonGallery = document.querySelector('#galeria');
        buttonGallery.addEventListener('click', function () {
            app.tomarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
        });
    },
    tomarFoto: function (sourceType) {
        var opciones = {
            quality: 50,
            sourceType: sourceType,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 300,
            targetHeight: 400,
            correctOrientation: true
        };
        navigator.camera.getPicture(app.fotoTomada, app.errorTomarFoto, opciones);
    },
    fotoTomada: function (imagenURI) {
        var imagen = document.createElement("img");
        imagen.onload = function () {
            app.pintarFoto(imagen);
        }
        imagen.src = imagenURI;
    },
    errorTomarFoto: function (mensaje) {
        console.log("Error al tomar foto " + mensaje);
    },
    pintarFoto: function (imagen) {
        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        canvas.width = imagen.width;
        canvas.height = imagen.height;
        context.drawImage(imagen, 0, 0, imagen.width, imagen.height);
    },
    aplicaFiltro: function (filterName) {

        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        effects[filterName](imageData.data);
        context.putImageData(imageData, 0, 0);
    }

}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        app.inicio();
    }, false);
}