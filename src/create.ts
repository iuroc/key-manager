import { Route, routeTo } from 'vanjs-router'
import van from 'vanjs-core'
import { createKey } from './util'
import Clipboard from 'clipboard'

new Clipboard('.copybtn')

const { button, div, input, textarea } = van.tags

export default () => {
    const password = van.state(localStorage.getItem('password') || '')
    const text = van.state('')

    return Route({ name: 'create', class: 'px-4 py-5 mx-auto', style: 'max-width: 600px;' },
        div({ class: 'fs-2 fw-bold mb-4 hstack' },
            div('生成卡密'),
            button({ class: 'btn btn-danger ms-auto', onclick: () => routeTo('remove') }, '核销卡密'),
        ),
        input({ class: 'form-control mb-3', type: 'password', placeholder: '管理员密码', value: password, oninput: event => password.val = event.target.value }),
        textarea({ class: 'form-control mb-4 key-text', rows: 6, placeholder: '卡密', value: text, oninput: event => text.val = event.target.value }),
        button({
            class: 'btn btn-success', onclick() {
                if (password.val.match(/^\s*$/)) return alert('管理员密码不能为空')
                localStorage.setItem('password', password.val)
                createKey().then(keyVal => {
                    text.val = `===============\n卡密：${keyVal}\n网址：http://getgpt.iuroc.com/\n===============\n注意：卡密只能使用一次，请妥善保管。`
                })
            }
        }, '生成卡密'),
        button({ class: 'btn btn-secondary ms-3 copybtn', 'data-clipboard-target': '.key-text' }, '复制')
    )
}