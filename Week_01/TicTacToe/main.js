'use strict'
let current = 1
// 1:X  2:O  0:blank
const patterns = [
    [0, 2, 0],
    [0, 1, 0],
    [0, 0, 0],
]

const show = () => {
    const wrapper = document.getElementById('wrapper')
    wrapper.innerHTML = ''
    for (let i in patterns) {
        for (let j in patterns[i]) {
            const div = document.createElement('div')
            div.classList.add('item')
            div.onclick = function (e) {
                if (this.textContent) {
                    return false
                }
                move(i, j)
            }
            wrapper.appendChild(div)
            div.textContent =
                patterns[i][j] === 2 ? 'O' :
                    patterns[i][j] === 1 ? 'X' : ''
        }
    }
}
const move = (x, y) => {
    patterns[x][y] = current
    if (check(patterns, current)) {
        alert(`${current === 1 ? 'X' : 'O'} win`)
    }
    current = 3 - current
    show()
    if (willWin(patterns, current)) {
        console.log(current === 2 ? 'O will win' : 'X will win')
    }
}

const bestChoice = (patterns, current) => {
    let p
    if(p = willWin(patterns, current)){
        return {
            point: p,
            result: 1
        }
    }

    let point = null
    let result = -2

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patterns[i][j])
                continue;
            const tmp = clone(patterns)
            tmp[i][j] = current
            let r = bestChoice(tmp, 3 - current).result
            if (-r > result) {
                result = -r
                point = [i, j]
            }
        }
    }
    return {
        point,
        result: point ? result : 0
    }
}

const clone = (data) => JSON.parse(JSON.stringify(data))

const willWin = (patterns, current) => {
    for (let i in patterns) {
        for (let j in patterns[i]) {
            if (patterns[i][j])
                continue
            const tmp = clone(patterns)
            tmp[i][j] = current
            if (check(tmp, current)) {
                return [i, j]
            }
        }
    }
    return null
}

const check = (patterns, current) => {
    for (let i in patterns) { //判断行
        let win = true
        for (let j in patterns[i]) {
            if (patterns[i][j] !== current) {
                win = false
            }
        }
        if (win)
            return true
    }
    {
        for (let i in patterns) { //判断行
            let win = true
            for (let j in patterns[i]) {
                if (patterns[j][i] !== current) {
                    win = false
                }
            }
            if (win)
                return true
        }
    }
    {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[j][j] !== current)
                win = false
        }
        if (win)
            return true
    }
    {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[j][2 - j] !== current)
                win = false
        }
        if (win)
            return true
    }
    return false
}

show()
console.log(bestChoice(patterns,current))
