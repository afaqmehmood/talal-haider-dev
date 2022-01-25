import ImagePreloader from 'image-preloader'

import log from 'salvo-lite/log'

class Preloader {
    constructor (theme, elem) {
        this._name = this.constructor.name
        this._elem = elem
        this._elems = elem.querySelectorAll('[data-preload]:not([data-preload="loaded"])')
        this._preloader = new ImagePreloader()
        this._preloads = []
        this._widths = [
            769,
            768,
            480
        ]
        this._evt = new Event('preload-complete')
    }

    onInit () {
        this._theLogic()
        this._preloadLoop()
        log.debug(this._name, 'Initiated', this)
    }

    _preloadLoop () {
        this._preloads.forEach(obj => this._preload(obj))
    }

    _preload (obj, width) {
        let imgSrc = obj.json && obj.json[width] ? obj.json[width] : obj.data

        this._preloader.preload(imgSrc).then(data => this._onComplete(data, obj))
    }

    _getRelWidth () {
        let relWidth = false
        let sWidth = screen.width

        if (sWidth >= this._widths[0]) {
            relWidth = this._widths[0]
        } else {
            for (let [index, width] of this._widths.entries()) {
                let nWidth = this._widths[index + 1] || 0

                if (sWidth <= width && sWidth > nWidth) {
                    relWidth = width
                    break
                }
            }
        }

        return `${relWidth}`
    }

    _theLogic () {
        this._elems.forEach(elem => {
            let data = elem.getAttribute('data-preload')

            let obj = {
                'elem': elem,
                'data': data,
                'json': data.includes('{') ? JSON.parse(data) : null
            }

            if (obj.json) {
                obj.resize = {}

                for (let key in obj.json) {
                    obj.resize[key] = {}
                    obj.resize[key].src = obj.json[key]
                    obj.resize[key].loaded = false
                }
            }

            this._preloads.push(obj)
        })
    }

    _onComplete (data, obj) {
        let imgSrc = data[0].value.src

        if (obj.elem.nodeName === 'SOURCE') {
            obj.elem.setAttribute('srcset', imgSrc)
        } else if (obj.elem.nodeName === 'IMG') {
            obj.elem.src = imgSrc
        } else {
            obj.elem.style.backgroundImage = `url(${data[0].value.src})`
        }

        obj.elem.setAttribute('data-preload', 'loaded')
        obj.elem.dispatchEvent(this._evt)
    }
}

export default Preloader
