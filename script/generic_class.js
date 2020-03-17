class ListAjax{
    list = [{}];
    state = {
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

    getList(){
        return this.list;
    }

}
