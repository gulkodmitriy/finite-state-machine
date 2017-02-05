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
            this._history = new Array(this._state);
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
            this._history.push(this._state);
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
            this._history.push(this._state);
        }else{
            throw new Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this._config.initial;
        this._history.push(this._state);
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
        var S = [];
        S = Object.keys(this._config.states);
        var X = [];
        for(var i=0;i<S.length;i++) {
            var Y = [];
            Y = Object.keys(this._config.states[S[i]].transitions);
            for(var j=0; j<Y.length;j++) {
                if (Y[j] == event) {
                    X.push(S[i]);
                }
            }
        }
        return X;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._state == this._config.initial){
            return false;
        }else{
            this._state = this._history[this._history.length - 2];
            this._history.push(this._state);
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this._state == this._config.initial){
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._history.splice(0,this._history.length-1);
        this._state = this._config.initial;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
