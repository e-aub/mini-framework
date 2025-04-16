// Event Handling Module
class EventManager {
    constructor() {
        this.events = new Map();
    }

    // Add event listener
    on(element, event, handler) {
        if (!this.events.has(element)) {
            this.events.set(element, new Map());
        }
        this.events.get(element).set(event, handler);
        element.addEventListener(event, handler);
    }

    // Remove event listener
    off(element, event) {
        if (this.events.has(element)) {
            const handler = this.events.get(element).get(event);
            if (handler) {
                element.removeEventListener(event, handler);
                this.events.get(element).delete(event);
            }
        }
    }

    // Trigger event
    trigger(element, event, data) {
        if (this.events.has(element)) {
            const handler = this.events.get(element).get(event);
            if (handler) {
                handler(data);
            }
        }
    }
}

export default EventManager; 