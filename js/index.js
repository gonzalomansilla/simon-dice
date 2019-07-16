class Color {
    constructor(_color, _numColor, _elemHTML) {
        this.color = _color
        this.numColor = _numColor
        this.elemHtml = _elemHTML
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
}

class Juego {
    constructor() {
        this.nivelMax = 10
        this.nivelActual = 1
        this.resultadoPartidaJr = 0
        this.colores = new Array(
            new Color('celeste', 0, celeste),
            new Color('violeta', 1, violeta),
            new Color('naranja', 2, naranja),
            new Color('verde', 3, verde)
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
            .map(color => this.dameColorAleatorio(0, this.colores.length))
    }

    dameColorAleatorio(min, max) {
        const numColor = Math.floor(Math.random() * (max - min) + min)
        return this.colores[numColor]
    }

    jugar() {
        this.nivelActualJr = 1
        this.iluminarSecuencia()
        this.agregarEventClickColores()
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivelActual; i++) {
            const colorParaIluminar = this.secuencia[i]

            // Retardo de iluminacion entre cada color 
            setTimeout(() => this.iluminarColor(colorParaIluminar), 1000 * i)
        }
    }

    iluminarColor(color) {
        let htmlColor = color.getElemHTML()
        htmlColor.classList.add('light')

        // Rapidez del parpadeo
        setTimeout(() => htmlColor.classList.remove('light'), 350)
    }

    comprobarColorElegido(ev) {
        let nombreColor = ev.target.dataset.color;
        let color = this.colores
            .find(color => color.getColor() === nombreColor)

        this.iluminarColor(color)

        if (color.getNumColor() === (this.secuencia[this.nivelActualJr - 1]).getNumColor()) {
            this.nivelActualJr++;

            if (this.nivelActualJr > this.nivelActual) {
                this.comprobarSiguienteNivel()
            }
        } else {
            this.iluminarColor(color)
            this.resultadoPartidaJr = -1;

            // Retardo en la finalizacion del juego
            setTimeout(() => {
                this.finDeJuego()
            }, 500)
        }
    }

    comprobarSiguienteNivel() {
        this.nivelActual += 1

        if (this.nivelActual > this.nivelMax) {
            this.resultadoPartidaJr = 1
            // Retardo en la finalizacion de juego
            setTimeout(() => {
                this.finDeJuego()
            }, 500)
        } else {
            this.nivelActualJr = 1
            // Retardo en el asaje a siguiente nivel
            setTimeout(() => {
                this.iluminarSecuencia()
            }, 1250)
        }

    }

    finDeJuego() {
        if (this.resultadoPartidaJr === 1) {
            swal('Ganaste!! Excelente.', 'Puedes jugar nuevamente :)', 'success')
                .then(this.reiniciarJuego)

        } else if (this.resultadoPartidaJr === -1) {
            swal('Perdiste. Lo siento', 'Puedes intentalo nuevamente :)', 'error')
                .then(this.reiniciarJuego)
        }
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
        btnEmpezar.classList.toggle('hide')
    }

}

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')


function empezarJuego() {
    // Verificar variable a modo de prueba
    window.juego = new Juego()

}