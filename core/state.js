// State Management Module
class State {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = new Set();
    }

    // Get state
    getState() {
        return this.state;
    }

    // Set state
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    // Notify listeners
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

export default State; 