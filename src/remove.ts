import { Route, routeTo } from 'vanjs-router'
import van from 'vanjs-core'
import { removeKey } from './util'

const { a, button, div, input } = van.tags

export default () => {
    const password = van.state(localStorage.getItem('password') || '')
    const key = van.state('')

    return Route({ name: 'remove', class: 'px-4 py-5 mx-auto', style: 'max-width: 600px;' },
        div({ class: 'fs-2 fw-bold mb-4 hstack' },
            div({ class: 'text-danger' }, '核销卡密'),
            button({ class: 'btn btn-success ms-auto', onclick: () => routeTo('create') }, '生成卡密'),
        ),
        input({ class: 'form-control mb-3', type: 'password', placeholder: '管理员密码', value: password, oninput: event => password.val = event.target.value }),
        input({ class: 'form-control mb-4', placeholder: '卡密', value: key, oninput: event => key.val = event.target.value }),
        button({
            class: 'btn btn-danger', onclick() {
                const keyVal = key.val
                key.val = ''
                if (password.val.match(/^\s*$/) || keyVal.match(/^\s*$/)) return alert('卡密和管理员密码不能为空')
                localStorage.setItem('password', password.val)
                removeKey(keyVal)
            }
        }, '核销卡密')
    )
}