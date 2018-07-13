const WEBSOCKET_PORT = 9000;

export class CallbackWebSocket {
    constructor(callback) {
        this.callback = callback;
        this.createWebsocket();
    }

    createWebsocket() {
        this.websocket = new WebSocket(`ws://${location.hostname}:${WEBSOCKET_PORT}`);
        this.websocket.onmessage = this.onmessage.bind(this);
        this.websocket.onclose = () => {
            setTimeout(this.createWebsocket.bind(this), 3000);
        }
    }

    onmessage(event) {
        this.callback(JSON.parse(event.data));
    }
}