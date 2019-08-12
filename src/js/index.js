class Color {
    constructor(_color, _numColor, _elemHTML, _sound) {
        this.color = _color
        this.numColor = _numColor
        this.elemHtml = _elemHTML
        this.sound = _sound
        this.normalImgHtml = this.elemHtml.children[0]
        this.pressedImgHtml = this.elemHtml.children[1]
    }

    getColor() {
        return this.color
    }

    getNumColor() {
        return this.numColor
    }

    getElemHTML() {
        return this.elemHtml
    }

    getSound() {
        return this.sound
    }

    getNormalImgHtml() {
        return this.normalImgHtml
    }

    getPressedImgHtml() {
        return this.pressedImgHtml
    }
}

class Juego {
    constructor() {
        this.nivelMax = 3
        this.nivelActual = 1
        this.resultadoPartidaJr = 0
        this.colores = new Array(
            new Color('azul', 0, azul, new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')),
            new Color('rojo', 1, rojo, new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')),
            new Color('amarillo', 2, amarillo, new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')),
            new Color('verde', 3, verde, new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'))
        )

        this.inicializar()
    }

    inicializar() {
        this.comprobarColorElegido = this.comprobarColorElegido.bind(this)
        this.reiniciarJuego = this.reiniciarJuego.bind(this)
        this.comprobarBtnEmpezar()
        this.generarSecuenciaColores()

        // Retardo de inicio de juego
        setTimeout(() => {
            this.jugar()
        }, 1000)
    }

    generarSecuenciaColores() {
        this.secuencia = new Array(this.nivelMax)
            .fill(0)
            .map(color => this.getColorAleatorio(0, this.colores.length))
    }

    getColorAleatorio(min, max) {
        const numColor = Math.floor(Math.random() * (max - min) + min)
        return this.colores[numColor]
    }

    jugar() {
        this.nivelActualJr = 1
        this.iluminarSecuencia()
        this.agregarEventClickColores()
        nivelJr.textContent = `Nivel actual: ${this.nivelActualJr}`

    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivelActual; i++) {
            const colorParaIluminar = this.secuencia[i]

            // Retardo de iluminacion entre cada color 
            setTimeout(() => this.iluminarColor(colorParaIluminar), 700 * i)
        }
    }

    iluminarColor(color) {
        color.getNormalImgHtml().classList.add('hide')
        color.getPressedImgHtml().classList.remove('hide')

        color.getSound().play()

        // Rapidez del parpadeo
        setTimeout(() => {
            color.getNormalImgHtml().classList.remove('hide')
            color.getPressedImgHtml().classList.add('hide')
        }, 350)
    }

    comprobarColorElegido(ev) {
        let nombreColor = ev.target.parentNode.dataset.color;

        let color = this.colores.find(color => color.getColor() === nombreColor)

        this.iluminarColor(color)

        if (color.getNumColor() === (this.secuencia[this.nivelActualJr - 1]).getNumColor()) {
            this.nivelActualJr++;

            if (this.nivelActualJr > this.nivelActual) {
                this.comprobarSiguienteNivel()
            }
        } else {
            this.resultadoPartidaJr = -1;
            // Retardo en la finalizacion del juego
            setTimeout(() => this.finDeJuego(), 500)
        }

        if (this.nivelActual <= this.nivelMax) {
            nivelJr.textContent = `Nivel actual: ${this.nivelActual}`
        }
    }

    comprobarSiguienteNivel() {
        this.nivelActual += 1

        if (this.nivelActual > this.nivelMax) {
            this.resultadoPartidaJr = 1
            // Retardo en la finalizacion de juego
            setTimeout(() => this.finDeJuego(), 500)
        } else {
            this.nivelActualJr = 1
            // Retardo en el pasaje a siguiente nivel
            setTimeout(() => this.iluminarSecuencia(), 1000)
        }
    }

    finDeJuego() {
        if (this.resultadoPartidaJr === 1) {
            swal('Ganaste!! Excelente.', 'Puedes jugar nuevamente :)', 'success')
                .then(this.reiniciarJuego)

        } else if (this.resultadoPartidaJr === -1) {
            swal('Perdiste. Lo siento', 'Puedes intentarlo nuevamente :)', 'error')
                .then(this.reiniciarJuego)
        }
        nivelJr.textContent = 'Nivel actual: 1'
    }

    reiniciarJuego() {
        this.comprobarBtnEmpezar()
        this.eliminarEventClickColores()
    }

    eliminarEventClickColores() {
        this.colores.forEach(color => {
            color.getElemHTML().removeEventListener('click', this.comprobarColorElegido)
        })
    }

    agregarEventClickColores() {
        this.colores.forEach(color => {
            color.getElemHTML().addEventListener('click', this.comprobarColorElegido)
        })
    }

    comprobarBtnEmpezar() {
        btnEmpezar.classList.toggle('on')
        btnEmpezar.classList.toggle('off')

        if (btnEmpezar.classList.contains('on')) {
            btnEmpezar.removeEventListener('click', empezarJuego)
        } else {
            btnEmpezar.addEventListener('click', empezarJuego)
        }
    }

}

const azul = document.getElementById('azul')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const nivelJr = document.querySelector('.gameboard__nivelJr')
console.log(nivelJr)
btnEmpezar.addEventListener('click', empezarJuego)


function empezarJuego() {
    window.juego = new Juego()
}

/* 
    Agregar:
        Boton de reinicio
        
*/