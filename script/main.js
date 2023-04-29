document.getElementById("canvasWrapper").scrollLeft = 600
document.getElementById("canvasWrapper").scrollTop = 350


const equation = (event) => {
    src = event.srcElement

    if (src.type == "checkbox") {
        // do stuff
    }
}

const addEqSlot = () => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("equationWrapper")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = true
    checkbox.classList.add("activate")
    checkbox.onchange = "equation(event)"

    const text = document.createElement("input")
    text.type = "text"
    text.classList.add("equation")
    text.onchange = "equation(event)"

    wrapper.appendChild(checkbox)
    wrapper.appendChild(text)

    document.getElementById("sidePanel").insertBefore(wrapper, document.querySelector("div#addNewEq"))

    document.querySelectorAll(".equation")[document.querySelectorAll(".equation").length - 1].focus()
}

class plane {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        this.canvas.width = this.canvas.offsetWidth * 1
        this.canvas.height = this.canvas.offsetHeight * 1

        this.width = this.canvas.width
        this.height = this.canvas.height

        this.xCenter = this.width / 2
        this.yCenter = this.height / 2

        this.xGridSpacing = 50
        this.yGridSpacing = 50


        document.addEventListener("click", event => {
            const xScroll = document.getElementById("canvasWrapper").scrollLeft
            console.log(xScroll);

            if (xScroll < 10 || xScroll > this.canvas.width - 100) {
                canvas.width += 500
            }
        })
    }

    drawAxes = () => {
        this.ctx.strokeStyle = "black"
        this.ctx.lineWidth = 1

        this.ctx.beginPath()
        this.ctx.moveTo(0, this.yCenter)
        this.ctx.lineTo(this.width, this.yCenter)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.moveTo(this.xCenter, 0)
        this.ctx.lineTo(this.xCenter, this.height)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawNum = () => {
        this.ctx.fillStyle = "black"
        this.ctx.textAlign = "center"
        this.ctx.font = "15px Arial"

        for (let index = this.xCenter - this.xGridSpacing * Math.floor(this.xCenter / this.xGridSpacing); index < this.width; index += this.xGridSpacing) {
            const x = index
            const y = this.yCenter - 10

            this.ctx.fillText(((index - this.xCenter) / this.xGridSpacing).toFixed(0), x, y)
        }

        for (let index = this.yCenter - this.yGridSpacing * Math.floor(this.yCenter / this.yGridSpacing); index < this.height; index += this.yGridSpacing) {
            const x = this.xCenter + 10
            const y = index

            this.ctx.fillText(((this.yCenter - index) / this.yGridSpacing).toFixed(0), x, y)
        }
    }

    drawGrid = () => {
        this.ctx.strokeStyle = "grey"
        this.ctx.lineWidth = .5

        for (let index = this.yCenter - this.yGridSpacing * Math.floor(this.yCenter / this.yGridSpacing); index < this.height; index += this.yGridSpacing) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, index)
            this.ctx.lineTo(this.width, index)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        for (let index = this.xCenter - this.xGridSpacing * Math.floor(this.xCenter / this.xGridSpacing); index < this.width; index += this.xGridSpacing) {
            this.ctx.beginPath()
            this.ctx.moveTo(index, 0)
            this.ctx.lineTo(index, this.height)
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    drawFunc = () => {
        this.ctx.strokeStyle = "red"
        this.ctx.lineWidth = 3

        const y = (x) => {
            let c = this.xGridSpacing
            return -Math.sin(x / c) * this.yGridSpacing
            return -((x ** 2) / c - 4 * c)
            return -(0.0002 * x ** 4 - .4 * x ** 2 + 3 * this.yGridSpacing)
        }

        this.ctx.beginPath()
        for (let index = 0; index < this.width; index++) {
            const x = index - this.xCenter
            this.ctx.lineTo(index, this.yCenter + y(x))
        }
        this.ctx.stroke()
        this.ctx.closePath()
    }
}

const canvas = new plane()

canvas.drawGrid()
canvas.drawAxes()
canvas.drawNum()
canvas.drawFunc()
