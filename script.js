const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') setRandomColor()
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent)
    } else if (type === 'copy-link') {
        copyToClickBoard(document.URL)
    }

})

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function generateColor() {
    const hexLetter = '0123456789ABCDEF'
    let randomColorHex = '#'
    for (let i = 0; i < 6; i++) {
        randomColorHex += hexLetter[Math.floor(Math.random() * hexLetter.length)]
    }

    return randomColorHex
}

function setRandomColor(isInit) {
    const colors = isInit ? getColorFromURL() : []


    columns.forEach((colunm, index) => {
        const isLocked = colunm.querySelector('i').classList.contains('fa-lock')
        const text = colunm.querySelector('h2')
        const button = colunm.querySelector('button')


        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInit
            ? colors[index]
                ? colors[index] : generateColor()
            : generateColor()

        if (!isInit) colors.push(color)

        colunm.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = (luminance > 0.5) ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}

function getColorFromURL() {
    return document.location.hash.length > 1 ? document.location.hash.substring(1).split('-').map(color => '#' + color) : []
}

setRandomColor(true)