import log from 'salvo-lite/log'
import Choices from 'choices.js'

class Select {
    constructor (theme, elem) {
        this._theme = theme
        this._elem = elem
        this._choices = null
        this._options = {
            searchEnabled: false,
            removeItems: false,
            paste: false,
            itemSelectText: '',
            shouldSort: false,
            ...JSON.parse(elem.getAttribute('data-select') || '{}')
        }
        this._selectElem = this._options.elem || elem
        log.debug(this.constructor.name, 'Constructed', this)
    }

    onInit () {
        this._choices = new Choices(this._selectElem, this._options)
    }
}

export default Select
