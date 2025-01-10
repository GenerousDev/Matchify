import { setWorldConstructor } from '@cucumber/cucumber';
import * as Sentry from "@sentry/node";

class CustomWorld {
    constructor() {
        this.sentry = Sentry;
    }

    logError(error, context = {}) {
        this.sentry.captureException(error, {
            extra: context
        });
    }
}

setWorldConstructor(CustomWorld);