class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config == null){
            throw new Error;
        }else{
            this._config = config;
            this._state = this._config.initial;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this._config.states[state]){
            this._state = state;
        }else{
            throw new Error;
        }
    }


    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this._config.states[this._state].transitions[event]){
            this._state = this._config.states[this._state].transitions[event];
        }else{
            throw new Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this._config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == undefined){
            return Object.keys(this._config.states)
        }
        if(this._config.states.transitions[event]){

        }else{
            var A = [];
            return A;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
