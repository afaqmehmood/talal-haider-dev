import './resources/styles/theme.scss'

import log from 'salvo-lite/log'
import context from 'salvo-lite/context'
import Theme from './resources/scripts/Theme'

import 'dom4'

context.setTemplate(window.SALVO_BINDINGS.template)

var theme = new Theme()

theme.registerComponents()
theme.registerPages()

document.addEventListener('shopify:section:load', e => {
    theme = new Theme()
    theme.registerComponents()
    theme.registerPages()
})

log.debug('Main', 'Ready!')
