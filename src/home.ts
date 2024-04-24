import { Route, routeTo } from 'vanjs-router'
import van from 'vanjs-core'
import { checkKey } from './util'
import { checkRight, rightKey } from './result'

const { button, div, input } = van.tags

export default () => {
    const key = van.state('')
    const inputEle = input({
        class: 'form-control mb-4',
        placeholder: '请粘贴卡密到此处',
        autofocus: true,
        value: key,
        oninput: event => key.val = event.target.value
    })

    return Route({
        name: 'home', class: 'px-4 py-5 mx-auto', onLoad() {
            checkRight.val = false
        }, style: 'max-width: 600px;'
    },
        div({ class: 'fs-2 mb-4 fw-bold' }, '校验卡密'),
        div({ class: 'mb-2 text-primary fs-5 fw-bold' }, '请输入卡密，然后点击校验按钮。'),
        div({ class: 'mb-4 text-danger fs-5 fw-bold' }, '卡密只能使用一次，请妥善保管。'),
        inputEle,
        button({
            class: 'btn btn-success me-3', onclick() {
                const keyVal = key.val
                if (keyVal.match(/^\s*$/)) {
                    alert('卡密不能为空')
                    key.val = ''
                    inputEle.focus()
                    return
                }
                checkKey(keyVal).then(result => {
                    if (result) {
                        checkRight.val = true
                        rightKey.val = keyVal
                        routeTo('result')
                    }
                    else {
                        alert('您的卡密错误，如有疑问，请联系客服微信 iuroc_com')
                        inputEle.focus()
                    }
                })
                key.val = ''
            }
        }, '点击校验'),
        button({
            class: 'btn btn-danger', onclick: () => {
                key.val = ''
                inputEle.focus()
            }
        }, '清空'),
    )
}