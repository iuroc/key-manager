/// <reference types="vite/client" />
import van from 'vanjs-core'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './home'
import Result from './result'
import Remove from './remove'
import Create from './create'

van.add(document.body, Home(), Result(), Remove(), Create())