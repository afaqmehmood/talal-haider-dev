import pageContext from 'salvo-lite/context'
import ChangeClass from './components/ChangeClass'
import Select from './components/Select'
import Slick from './components/Slick'
import Preload from './components/Preload'

import Addresses from './pages/Addresses'
import Login from './pages/Login'

const components = {
    'change-class': ChangeClass,
    'select': Select,
    'slick': Slick,
    'preloader': Preload
}

const pages = {
    'customers/addresses': Addresses,
    'customers/login': Login
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach
}

class Theme {
    constructor () {
        this._components = []
        this._componentsById = {}
    }

    registerComponents (container = document) {
        for (let key in components) {
            var ComponentConstructor = components[key]
            var elements = container.querySelectorAll(`.js-component__${key}, [data-${key}]`)
            for (let elem of elements) {
                var instance = new ComponentConstructor(this, elem)
                this._components.push(instance)
                var id = elem.dataset.componentId
                if (id) {
                    this._componentsById[id] = instance
                }
                instance.onInit()
            }
        }
        window.ThemeComponents = this._components
        window.ThemeComponentsId = this._componentsById
        window.__Theme = this
    }

    registerPages () {
        var context = pageContext.getTemplate()
        for (let page in pages) {
            if (page === context) {
                var instance = new pages[page](this)
                instance.onInit()
            }
        }
    }

    getComponents () {
        return this._components
    }

    getComponentsById (id) {
        return this._componentsById[id]
    }

    getComponentsByType (componentConst, includeSubclasses = true) {
        var r = []
        for (let c of this._components) {
            if (includeSubclasses && c instanceof componentConst) {
                r.push(c)
            } else if (c.constructor === componentConst) {
                r.push(c)
            }
        }
        return r
    }
}

export default Theme
