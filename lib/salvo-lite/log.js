import {utils} from '@eastsideco/escshopify'

const TAG = 'LogBootstrap'

const log = new utils.Log()

log.setLogPrefix('Theme')

const logger = new utils.Log.loggers.ConsoleLogger()
if (process.env.NODE_ENV === 'production') {
    logger.setLogLevel(log.WARN)
}

log.addLogger(logger)
log.send(log.DEBUG, TAG, 'Initialized logging.')

export default log
