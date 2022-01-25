import log from 'salvo-lite/log'

class Login {
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
            recoverPasswordFormTriggers: '[data-recover-toggle]',
            recoverPasswordForm: '[data-recover-form]',
            loginForm: '[data-login-form]',
            formState: '[data-form-state]',
            resetSuccess: '[data-reset-success]'
        }

        function onShowHidePasswordForm (evt) {
            evt.preventDefault()
            toggleRecoverPasswordForm()
        }

        function checkUrlHash () {
            const hash = window.location.hash

            // Allow deep linking to recover password form
            if (hash === '#recover') {
                toggleRecoverPasswordForm()
            }
        }

        /**
         *  Show/Hide recover password form
         */
        function toggleRecoverPasswordForm () {
            document.querySelector(selectors.recoverPasswordForm).classList.toggle('visually-hidden')
            document.querySelector(selectors.loginForm).classList.toggle('visually-hidden')
        }

        /**
         *  Show reset password success message
         */
        function resetPasswordSuccess () {
            // check if reset password form was
            // successfully submitted and show success message.

            if (document.querySelector(selectors.formState)) {
                document.querySelector(selectors.resetSuccess).classList.remove('visually-hidden')
            }
        }

        if (document.querySelector(selectors.recoverPasswordForm)) {
            checkUrlHash()
            resetPasswordSuccess()

            document.querySelectorAll(selectors.recoverPasswordFormTriggers).forEach((trigger) => {
                trigger.addEventListener('click', onShowHidePasswordForm)
            })
        }
    }
}

export default Login
