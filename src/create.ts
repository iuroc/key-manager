import { Route, routeTo } from 'vanjs-router'
import van from 'vanjs-core'
import { createKey, removeKey } from './util'

const { button, div, input } = van.tags

export default () => {
    const password = van.state(localStorage.getItem('password') || '')
    const key = van.state('')

    return Route({ name: 'create', class: 'px-4 py-5 mx-auto', style: 'max-width: 600px;' },
        div({ class: 'fs-2 fw-bold mb-4 hstack' },
            div('生成卡密'),
            button({ class: 'btn btn-danger ms-auto', onclick: () => routeTo('remove') }, '核销卡密'),
        ),
        input({ class: 'form-control mb-3', type: 'password', placeholder: '管理员密码', value: password, oninput: event => password.val = event.target.value }),
        input({ class: 'form-control mb-4', placeholder: '卡密', value: key, oninput: event => key.val = event.target.value }),
        button({
            class: 'btn btn-success', onclick() {
                if (password.val.match(/^\s*$/)) return alert('管理员密码不能为空')
                localStorage.setItem('password', password.val)
                createKey().then(keyVal => {
                    key.val = keyVal
                })
            }
        }, '生成卡密')
    )
}