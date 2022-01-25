import log from 'salvo-lite/log'

class ChangeClass {
    constructor (theme, elem) {
        this._theme = theme
        this._elem = elem
        this._instances = JSON.parse(elem.getAttribute('data-change-class') || '{}')
        this._instanceDefaults = {
            action: 'toggle',
            class: 'active',
            delay: 0,
            elem: 'self',
            maxWidth: 9999999,
            minWidth: 0,
            targetOnly: false,
            preventDefault: false,
            event: 'click'
        }
        log.debug(this.constructor.name, 'Constructed', this)
    }

    onInit () {
        if (this._instances.length > 0) {
            this._instances.forEach((instance) => {
                instance = { ...this._instanceDefaults, ...instance }
                this._elem.addEventListener(instance.event, e => {
                    if (window.innerWidth > instance.maxWidth || window.innerWidth < instance.minWidth) return
                    if (instance.targetOnly && (e.target !== this._elem)) return
                    if (instance.preventDefault) e.preventDefault()
                    const elemToChange = this._getElement(instance.elem)
                    if (elemToChange) {
                        setTimeout(() => {
                            this._changeClass(elemToChange, instance.class, instance.action)
                            if (instance.removeFromSiblings) {
                                this._removeClassFromSiblings(elemToChange, instance.class, instance.removeFromSiblings)
                            }
                        }, instance.delay)
                    }
                })
            })
        }
    }

    _getElement (elemToChange) {
        switch (elemToChange) {
        case 'self':
            return this._elem
        case 'parent':
            return this._elem.parentNode
        case 'child':
            return this._elem.childElementSibling
        case 'next':
            return this._elem.nextElementSibling
        case 'prev':
            return this._elem.previousElementSibling
        default:
            return document.querySelector(elemToChange)
        }
    }

    _changeClass (elemToChange, className, action) {
        if (elemToChange.classList.contains(className)) {
            if (action !== 'add') elemToChange.classList.remove(className)
        } else {
            if (action !== 'remove') elemToChange.classList.add(className)
        }
    }

    _removeClassFromSiblings (elemToChange, className, data) {
        const parent = data.parentSiblings ? elemToChange.parentNode.parentNode : elemToChange.parentNode
        const siblings = data.selector ? parent.querySelectorAll(data.selector) : [...parent.children]
        siblings.forEach(sibling => sibling !== elemToChange && sibling.classList.remove(className))
    }
}

export default ChangeClass
