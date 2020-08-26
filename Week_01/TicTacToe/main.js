'use strict'
let current = 2
// 1:X  2:O  0:blank
const patterns = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]

const show = () => {
    const wrapper = document.getElementById('wrapper')
    wrapper.innerHTML = ''
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const div = document.createElement('div')
            div.classList.add('item')
            div.addEventListener('click', () => {
                userMove(i, j)
            })
            div.innerText =
                patterns[i * 3 + j] === 2 ? 'O' :
                    patterns[i * 3 + j] === 1 ? 'X' : ''
            wrapper.appendChild(div)
        }
    }
}

const computerMove = () => {
    const res = bestChoice(patterns, current)
    console.log(res)
    if (res.point)
        patterns[res.point[0] * 3 + res.point[1]] = current
    if (check(patterns, current))
        alert(`${current === 1 ? 'X' : 'O'} win`)
    current = 3 - current
    show()
}

const userMove = (x, y) => {
    patterns[x * 3 + y] = current
    if (check(patterns, current)) {
        alert(`${current === 1 ? 'X' : 'O'} win`)
    }
    current = 3 - current
    show()
    if (willWin(patterns, current)) {
        console.log(current === 2 ? 'O will win' : 'X will win')
    }
    computerMove()
}
//寻找最优策略
const bestChoice = (patterns, current) => {
    let p
    if (p = willWin(patterns, current)) {
        return {
            point: p,
            result: 1
        }
    }

    let point = null
    let result = -2

    outer:for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patterns[i * 3 + j] !==0)
                continue;
            const tmp = clone(patterns)
            tmp[i * 3 + j] = current
            let r = bestChoice(tmp, 3 - current)
            if (-r.result >= result) {  // 对方对差的情况就是我们最好的情况
                result = -r.result
                point = [i, j]
            }

            if (Number(result) === 1)
                break outer

        }
    }
    // console.log(point, result)
    return {
        point,
        result: point ? result : 0
    }
}

// const clone = (data) => JSON.parse(JSON.stringify(data))
const clone = (data) => Object.create(data)
//判断是否将要赢
const willWin = (patterns, current) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patterns[i * 3 + j])
                continue
            const tmp = clone(patterns)
            tmp[i * 3 + j] = current
            if (check(tmp, current)) {
                return [i , j]
            }
        }
    }
    return null
}
//判断是否赢
const check = (patterns, current) => {
    for (let i = 0; i < 3; i++) { //判断行
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[i * 3 + j] !== current) {
                win = false
            }
        }
        if (win)
            return true
    }
    {
        for (let i = 0; i < 3; i++) { //判断行
            let win = true
            for (let j = 0; j < 3; j++) {
                if (patterns[j * 3 + i] !== current) {
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
            if (patterns[j * 3 + j] !== current)
                win = false
        }
        if (win)
            return true
    }
    {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[j * 2 + 2] !== current)
                win = false
        }
        if (win)
            return true
    }
    return false
}

show()
