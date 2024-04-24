import { Route, routeTo } from 'vanjs-router'
import van from 'vanjs-core'

const { a, div, li, span, ul } = van.tags

export const checkRight = van.state(false)
export const rightKey = van.state('')

export default () => Route({
    name: 'result', class: 'px-4 py-5 mx-auto', onLoad() {
        if (!checkRight.val) routeTo('home')
    }, style: 'max-width: 600px;'
},
    div({ class: 'fs-3 fw-bold mb-4 text-primary' }, '卡密校验成功，等待客服核销'),
    div({ class: 'card card-body mb-4' },
        div({ class: 'fw-bold mb-2' }, '请长按复制您的卡密：'), div({ class: 'text-success fw-bold' }, rightKey)
    ),
    div({ class: 'fw-bold mb-2 fs-5 text-secondary' }, '1. 点击下面的按钮联系客服'),
    div({ class: 'fw-bold mb-3 fs-5 text-secondary' }, '2. 将上面的卡密发送给客服'),
    a({ class: 'btn btn-primary mb-3', href: 'https://work.weixin.qq.com/kfid/kfc7cd05a807e100093', target: '_blank' }, '点击将卡密发给客服'),
    div({ class: 'text-secondary' }, '如客服未及时响应，请添加微信 iuroc_com'),
)