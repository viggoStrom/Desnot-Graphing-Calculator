document.getElementById("canvasWrapper").scrollLeft = 600
document.getElementById("canvasWrapper").scrollTop = 350

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

        this.equations = {}

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.width, this.height)

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
            return (num * this.factorial(num - 1))
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
        this.ctx.strokeStyle = "grey"
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
        this.ctx.textAlign = "center"

        for (let index = this.xCenter - this.xGridSpacing * Math.floor(this.xCenter / this.xGridSpacing); index < this.width; index += this.xGridSpacing) {
            const x = index
            const y = this.yCenter + 20
            const num = ((index - this.xCenter) / this.xGridSpacing).toFixed(0)

            if (num != 0) {
                this.ctx.font = "17px Arial"
                this.ctx.fillStyle = "black"
                this.ctx.fillText(num, x, y + 1)

                this.ctx.font = "15px Arial"
                this.ctx.fillStyle = "white"
                this.ctx.fillText(num, x, y)
            }
        }

        this.ctx.textAlign = "right"

        for (let index = this.yCenter - this.yGridSpacing * Math.floor(this.yCenter / this.yGridSpacing); index < this.height; index += this.yGridSpacing) {
            const x = this.xCenter - 7
            const y = index + 4
            const num = ((this.yCenter - index) / this.yGridSpacing).toFixed(0)

            if (num != 0) {
                this.ctx.font = "17px Arial"
                this.ctx.fillStyle = "black"
                this.ctx.fillText(num, x, y + 1)

                this.ctx.font = "15px Arial"
                this.ctx.fillStyle = "white"
                this.ctx.fillText(num, x, y)
            }
        }
        this.ctx.font = "17px Arial"
        this.ctx.fillStyle = "black"
        this.ctx.fillText("0", this.xCenter - 7, this.yCenter + 21)

        this.ctx.font = "15px Arial"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("0", this.xCenter - 7, this.yCenter + 20)
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

    drawFunc = (eq) => {
        // eq.func = eq.func.replace(/[^xX0-9+\-|*/^.!()%]|sin|cos|tan|asin|acos|atan|log|lg|ln|([+\-*/^.%]+$)/g, "") // add = and equation type later
        // eq.func = eq.func.replace("-", "-1*")
        // eq.func = eq.func.replace("^", "**")
        // eq.func = eq.func.replace(/\b(\d+)([xX])\b|\b([xX])(\d+)\b/g, "$1*$2")
        // eq.func = eq.func.replace(/(\b\d+|\b[0-9xX])(?=\s*!)/g, match => {
        //     return `this.factorial(${match})`
        // }).replace("!", "")

        const y = (x) => {
            let c = this.xGridSpacing
            x = x / c

            try {
                -eval(eq.func) * c
            } catch (error) {
                return console.log("Invalid function");
            }

            return -eval(eq.func) * c
        }

        this.ctx.strokeStyle = eq.color
        this.ctx.lineWidth = 3

        this.ctx.beginPath()
        for (let index = 0; index < this.width; index++) {
            const x = index - this.xCenter
            this.ctx.lineTo(index, this.yCenter + y(x))
        }
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawAll = () => {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.width, this.height)

        this.drawGrid()
        this.drawAxes()
        this.drawNum()

        Object.values(this.equations).forEach(eq => {
            this.drawFunc(eq)
        });
    }
}

class equationClass {
    constructor(canvas, id) {
        this.canvas = canvas
        this.id = id
        this.func = ""
        this.color = this.canvas.pickRandomColor()

        this.createEqElement()
    }

    createEqElement = () => {
        this.mainWrapper = document.createElement("div")
        this.mainWrapper.classList.add("equationWrapper")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = true
        checkbox.classList.add("activate")
        checkbox.id = this.id
        checkbox.setAttribute("onchange", "equation(event)")

        const text = document.createElement("input")
        text.type = "text"
        text.classList.add("equation")
        text.id = this.id
        text.setAttribute("onchange", "equation(event)")

        const del = document.createElement("img")
        del.classList.add("delete")
        del.id = this.id
        del.setAttribute("onclick", "equation(event)")
        del.src = "assets/delete_FILL0_wght400_GRAD0_opsz48.svg"
        del.alt = "Del"

        const confirm = document.createElement("img")
        del.classList.add("confirm")
        del.id = this.id
        del.setAttribute("onclick", "equation(event)")
        del.src = "assets/delete_FILL0_wght400_GRAD0_opsz48.svg"
        del.alt = "confirm"

        const cancel = document.createElement("img")
        del.classList.add("cancel")
        del.id = this.id
        del.setAttribute("onclick", "equation(event)")
        del.src = "assets/delete_FILL0_wght400_GRAD0_opsz48.svg"
        del.alt = "cancel"

        const iconWrapper = document.createElement("div")
        iconWrapper.classList.add("iconWrapper")
        iconWrapper.appendChild(del)

        this.mainWrapper.appendChild(checkbox)
        this.mainWrapper.appendChild(text)
        this.mainWrapper.appendChild(iconWrapper)

        document.getElementById("sidePanel").insertBefore(this.mainWrapper, document.querySelector("div#addNewEq"))

        document.querySelectorAll(".equation")[document.querySelectorAll(".equation").length - 1].focus()
    }

    delete = () => {
        this.mainWrapper.remove()
    }
}

// the function that gets called onchange by the html elements
const equation = (event) => {
    src = event.srcElement

    if (src.type == "checkbox") {
        // do stuff
    }
    else if (event.type == "click") {
        canvas.equations.equations[src.id].delete()
    }
    else if (src.type == "text") {
        let func = src.value
        func = func.replace(/[^xX0-9+\-|*/^.!()%]|sin|cos|tan|asin|acos|atan|log|lg|ln|([+\-*/^.%]+$)/g, "") // add = and equation type later
        func = func.replace("-", "-1*")
        func = func.replace("^", "**")
        func = func.replace(/\b(\d+)([xX])\b|\b([xX])(\d+)\b/g, "$1*$2")
        func = func.replace(/(\b\d+|\b[0-9xX])(?=\s*!)/g, match => {
            return `this.factorial(${match})`
        }).replace("!", "")

        canvas.equations[src.id].func = func
        canvas.drawAll()
    }
}

// called by the plus button
const newEq = () => {
    const id = Date.now()
    canvas.equations[id] = new equationClass(canvas, id)
}

// window.onbeforeunload = function (event) {
//     return "string"
// }


const canvas = new plane()

newEq()
newEq()
document.getElementsByClassName("equation")[0].focus()

canvas.drawAll()