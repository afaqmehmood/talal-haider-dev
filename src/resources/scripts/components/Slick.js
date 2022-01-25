import 'slick-carousel'
import $ from 'jquery'

class Slick {
    constructor (theme, elem) {
        this._theme = theme
        this._name = this.constructor.name
        this._elem = elem
        this._options = {
            arrows: false,
            dots: false,
            autoplay: false,
            infinite: true,
            draggable: false,
            slidesToShow: 1,
            mobileOnly: false,
            swipe: true,
            dontInit: false,
            showAbove: null,
            showBelow: null,
            ...JSON.parse(this._elem.getAttribute('data-slick') || '{}')
        }
        if (this._options.mobileOnly) this._options.showBelow = 769
    }

    onInit () {
        if (!this._options.dontInit) {
            if (this._options.showAbove && window.innerWidth <= this._options.showAbove) return false
            if (this._options.showBelow && window.innerWidth >= this._options.showBelow) return false
            this._slick()
        }
    }

    _slick () {
        $(this._elem).not('.slick-initialized').slick(this._options)
        this._elem.querySelector('video') && this._handleVideo()
    }

    _handleVideo () {
        $(this._elem).on('init', (e, slick) => {
            const vid = slick.$slides.length ? slick.$slides[0].querySelector('video') : false
            if (vid) {
                vid.play()
                vid.removeAttribute('poster')
            }
        })

        $(this._elem).on('beforeChange', (e, slick, curSlide, nextSlide) => {
            const vid = slick.$slides[curSlide] ? slick.$slides[curSlide].querySelector('video') : null
            if (vid) vid.pause()
        })

        $(this._elem).on('afterChange', (e, slick, curSlide) => {
            const vid = slick.$slides[curSlide] ? slick.$slides[curSlide].querySelector('video') : null
            if (vid) {
                vid.play()
                vid.removeAttribute('poster')
            }
        })
    }
}

export default Slick
