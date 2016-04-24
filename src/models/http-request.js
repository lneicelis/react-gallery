
export default class HttpRequest {
    constructor(URL, method) {
        this.URL = URL;
        this.method = method;
        this.params = null;
        this.data = null;
    }

    withParams(params) {
        this.params = params;

        return this;
    }

    withData(data) {
        this.data = data;

        return this;
    }
}