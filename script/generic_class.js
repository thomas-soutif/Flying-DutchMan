/**
 * File: generic_class.js
 *
 * This file contain all the generic class use in the website.
 *
 * Version 1.0
 * Author: Thomas SOUTIF
 */



// Give the generic class to create a list, should be use everytime we want to create a new list to ensure the genericity
class ListAjax{
    list = [{}]; // final list content
    state = { // Contain the state of element , use by the undo redo
        past : [{}],
        present: [{}],
        future: [{}]
    };
    constructor(ajax) {
        if(ajax === undefined)
            this.list = [{}];
        this.list = ajax
    }
    add(){}; // should be override by the children
    remove(){}; // should be override by the children
    undo(){}; // should be override by the children
    redo(){}; // should be override by the children

    // Give the generic function to make an undo redo, so the developer don't have to implement it
    undoable(action){
        switch (action) {
            case 'UNDO':
                if(this.state.past.length === 1)
                {
                    return null;
                }
                let previous = this.state.past[this.state.past.length - 1];
                this.state.past.pop();
                this.state.future.push(previous);

                return previous;

            case 'REDO':
                if(this.state.future.length === 1)
                {
                    return null;
                }
                const next = this.state.future[this.state.future.length - 1];
                this.state.past.push(next);
                this.state.future.pop();
                return next;
            default:
                return this.state;
        }

    }

    //Return the current list
    getList(){
        return this.list;
    }

}


//************
// END of file generic_class.js
//************