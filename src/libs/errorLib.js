import * as Sentry from '@sentry/browser';

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
    if(isLocal){
        return;
    }

    Sentry.init({dsn: "https://c8943e3731e44b7580b3943ffb3c92ac@o425389.ingest.sentry.io/5360602"});
}

export function onError(error) {
    let message = error.toString();
    let errorInfo = {};

    if(!(error instanceof Error) && error.message) {
        errorInfo = error;
        message = error.message;
        error = new Error(message);
    } else if (error.config && error.config.url) {
        errorInfo.url = error.config.url;
    }

    logError(error, errorInfo);

    alert(message);
}

export function logError(error, errorInfo = null) {
    if (isLocal){
        return;
    }

    Sentry.withScope((scope) => {
        errorInfo && scope.setExtras(errorInfo);
        Sentry.captureException(error);
    });
}