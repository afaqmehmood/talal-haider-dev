import log from 'salvo-lite/log'
// import {AddressForm} from '@shopify/theme-addresses'

class Addresses {
    constructor (components) {
        this._name = this.constructor.name
        this._components = components
    }

    onInit () {
        log.debug(this._name, 'Initializing', this)
        this._addEvents()
        this._slate()
        log.debug(this._name, 'Initiated', this)
    }

    _addEvents () {
        log.debug(this._name, 'Adding Events')
    }

    _slate () {
        const selectors = {
            addressContainer: '[data-address]',
            addressFields: '[data-address-fields]',
            addressToggle: '[data-address-toggle]',
            addressForm: '[data-address-form]',
            addressDeleteForm: '[data-address-delete-form]'
        }
        const hideClass = 'visually-hidden'

        function initializeAddressForm (container) {
            // const addressFields = container.querySelector(selectors.addressFields)
            const addressForm = container.querySelector(selectors.addressForm)
            const deleteForm = container.querySelector(selectors.addressDeleteForm)

            container.querySelectorAll(selectors.addressToggle).forEach((button) => {
                button.addEventListener('click', () => {
                    addressForm.classList.toggle(hideClass)
                })
            })

            // AddressForm(addressFields, 'en')

            if (deleteForm) {
                deleteForm.addEventListener('submit', (event) => {
                    const confirmMessage = deleteForm.getAttribute('data-confirm-message')

                    if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
                        event.preventDefault()
                    }
                })
            }
        }

        const addressForms = document.querySelectorAll(selectors.addressContainer)

        if (addressForms.length) {
            addressForms.forEach((addressContainer) => {
                initializeAddressForm(addressContainer)
            })
        }
    }
}

export default Addresses
