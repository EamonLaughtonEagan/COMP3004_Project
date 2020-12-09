import React from "react";

/**
 * A component that requires loading. Requirements:
 *      - props.loadCallback must return a Promise
 *      - render() in child component must handle "loaded" and "error" states
 */
export class LoadableComponent extends React.Component {
    // useState can't be used while the component is mounting, so these variables are used instead
    loaded = false;
    error = false;

    load = (force) => {
        throw new Error("load() must be implemented in subclass");
    };

    reload = (force = false) => {
        if (force || (!this.loaded && !this.error)) {
            try {
                this.load();
                this.loaded = true;
                this.error = false;

                this.forceUpdate();
                return true;
            } catch (err) {
                this.error = true;
                this.loaded = false;
                return false;
            }
        }
    };

    async componentDidMount() {
        return this.reload();
    }

}
