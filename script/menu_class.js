class ListMenuAjax extends ListAjax{
    list = [{}];

    constructor(ajax) {
        super();
        if(ajax === undefined){
            this.list = [];
            return
        }
        this.list = ajax
    }

    add(beverageId, bool_updateState = 1){
        let response = ajaxCall("ajax_get_beverage_byId", {beverageId : beverageId});
        let alreadyInMenu = false;
        if(response.error)
        {
            return 1;
        }
        let beverage = response.data;

        for (let i =0; i < this.list.length ; ++i) {
            if(beverage.id ===  this.list[i].allInfo.id)
            {
                alreadyInMenu = true;
            }
        }
        if(alreadyInMenu)
        {
            return 1;
        }
        let json = {};
        json.article_id = beverage.id;
        json.price = beverage.price;
        json.stock = "";
        json.last_modification_date = "";
        json.last_modification_userId = checkUserLogin();
        json.temporary_remove = false;
        json.allInfo = beverage;
        this.list.push(json);
        if(bool_updateState){
            this.state.past.push({index : beverage.id,action : "add"});
            this.state.future = this.state.future.slice(0,1);
        }

        let menuListHTML =
            $("<div/>").attr("data-beverageId", json.article_id).attr("class","itemMenuList").append($("<span>").attr("class", "menuListNameItem").append(json.allInfo.name)).append("<br/>").
            append($("<span>").attr("class", "menuListPriceItem").append(json.price +" SEK")).
            append($("<span/>").attr("class", "menuListButton").append($("<button>").attr("class", "deleteItemMenuList").append("Delete")));

        $("#menuList").append(menuListHTML);

        setTimeout(() => {
            addListenerForMenuList();
        }, 100);
        return 0;
    }

    remove(beverageId,bool_updateState = 1)
    {
        let inMenu = false;
        let index;
        for (let i =0; i < this.list.length ; ++i) {
            if(String(beverageId) === this.list[i].allInfo.id)
            {
                inMenu = true;
                index = i;
            }
        }
        if(inMenu){
            this.list.splice(index,1);
            if(bool_updateState) {
                this.state.past.push({index : String(beverageId),action : "remove"});
                this.state.future = this.state.future.slice(0,1);
            }
            $('*[data-beverageId='+ beverageId + ']').remove();
            return 0;
        }
        return 1;
    }

    undo() {

        let previous = this.undoable("UNDO");
        if(previous != null)
        {
            switch (previous.action) {
                case 'add':
                    this.remove(previous.index,0);
                    console.log(this.state);
                    return 0;
                case 'remove':
                    this.add(previous.index,0);
                    console.log(this.state);
                    return 0;
            }
        }

        return 1;
    }
    redo() {
        let next = this.undoable("REDO");
        if(next != null)
        {
            switch (next.action) {
                case 'add':
                    this.add(next.index,0);
                    console.log(this.state);
                    return 0;
                case 'remove':
                    this.remove(next.index,0);
                    console.log(this.state);
                    return 0;
            }
        }
        return 1;
    }

    undoable(action) {
        return super.undoable(action);
    }
    getList() {
        return super.getList();
    }
}

