document.getElementById("canvasWrapper").scrollLeft = 600
document.getElementById("canvasWrapper").scrollTop = 350


const addEqSlot = () => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("equationWrapper")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = true
    checkbox.classList.add("activate")
    checkbox.setAttribute("onchange", "equation(event)")

    const text = document.createElement("input")
    text.type = "text"
    text.classList.add("equation")
    text.setAttribute("onchange", "equation(event)")

    wrapper.appendChild(checkbox)
    wrapper.appendChild(text)

    document.getElementById("sidePanel").insertBefore(wrapper, document.querySelector("div#addNewEq"))

    document.querySelectorAll(".equation")[document.querySelectorAll(".equation").length - 1].focus()
}

addEqSlot()
addEqSlot()
document.querySelectorAll(".equation")[0].focus()

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

        this.availableColors = ["red", "green", "blue"]
        this.usedColors = []

        this.equations = []


        document.addEventListener("click", event => {
            const xScroll = document.getElementById("canvasWrapper").scrollLeft
            const yScroll = document.getElementById("canvasWrapper").scrollTop
            console.log(xScroll, yScroll);
        })
    }

    factorial = (num) => {
        if (num < 0)
            return -1
        else if (num == 0)
            return 1
        else {
            return (num * f(num - 1))
        }
    }

    pickRandomColor = () => {
        let color = this.availableColors[Math.floor(Math.random() * this.availableColors.length)];
        let i = 0

        while (this.usedColors.includes(color)) {
            color = this.availableColors[Math.floor(Math.random() * this.availableColors.length)];
            i++
            if (i > this.availableColors.length * 4) { break }
        }

        this.usedColors.push(color)
        return color
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
        this.ctx.textAlign = "left"
        this.ctx.font = "15px Arial"

        for (let index = this.xCenter - this.xGridSpacing * Math.floor(this.xCenter / this.xGridSpacing); index < this.width; index += this.xGridSpacing) {
            const x = index
            const y = this.yCenter - 8

            this.ctx.fillText(((index - this.xCenter) / this.xGridSpacing).toFixed(0), x, y)
        }

        for (let index = this.yCenter - this.yGridSpacing * Math.floor(this.yCenter / this.yGridSpacing); index < this.height; index += this.yGridSpacing) {
            const x = this.xCenter + 8
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

    drawFunc = (func) => {
        // func = func.replace(/^[^0-9xX]*([0-9]+|xX)[^0-9xX]*|[^\d()+\-*\/%!^xX]/g, "") // add = and equation type later
        func = func.replace(/[^xX0-9+\-*/^.!()%]|([+\-*/^.%]+$)/g, "") // add = and equation type later
        // func = func.replace(/^[^xX0-9+\-*/^.!%()]*(-?(?<![\-+*/(^])xX|\d+\.?\d*)(?![\d(])[^xX0-9+\-*/^.!()%]*|[^\d()+\-*\/%!^xX]/g, "") // add = and equation type later


        this.ctx.strokeStyle = this.pickRandomColor()
        this.ctx.lineWidth = 3

        const y = (x) => {
            let c = this.xGridSpacing
            x = x / c

            try {
                -eval(func) * c
            } catch (error) {
                console.log(func);
                return console.log("Invalid function");
            }

            this.equations.push(func)
            return -eval(func) * c
        }

        this.ctx.beginPath()
        for (let index = 0; index < this.width; index++) {
            const x = index - this.xCenter
            this.ctx.lineTo(index, this.yCenter + y(x))
        }
        this.ctx.stroke()
        this.ctx.closePath()
    }

    getFieldData = (index) => {
        return document.getElementsByClassName("equation")[index].value
    }
}

const equation = (event) => {
    src = event.srcElement
    console.log("object");

    if (src.type == "checkbox") {
        // do stuff
    }
    else if (src.type == "text") {
        canvas.drawFunc(src.value)
    }
}

// window.onbeforeunload = function (event) {
//     return "string"
// }


const canvas = new plane()

canvas.drawGrid()
canvas.drawAxes()
canvas.drawNum()

// canvas.drawFunc("x**2-2")
// canvas.drawFunc("x-1")