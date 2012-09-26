function FloatingList(type) {
    this.type = type;
    this.chkBoxListName = type;
    this.chkBoxListTriggerName = type + "Trigger";
    this.chkBoxListTriggerMouseOver = false;
    this.chkBoxListMouseOver = false;
    this.chkBoxListPosition = "left";
    
    this.SetChkList = function () {
        $("#" + this.chkBoxListName).mouseenter(this,this.ChkListOnMouseEnter).mouseleave(this,this.ChkListOnMouseLeave);
        $("#" + this.chkBoxListTriggerName).mouseenter(this,this.ChkListTriggerOnMouseEnter).mouseleave(this,this.ChkListTriggerOnMouseLeave);
    };

    this.ChkListOnMouseEnter = function (evt) {
        evt.data.chkBoxListMouseOver = true;
        evt.data.DisplayChkList();
    }

    this.ChkListOnMouseLeave = function (evt) {
        evt.data.chkBoxListMouseOver = false;
        setTimeout(function () { evt.data.HideChkList(); }, 50);
    }

    this.ChkListTriggerOnMouseEnter = function (evt) {
        evt.data.chkBoxListTriggerMouseOver = true;
        evt.data.DisplayChkList();
    }

    this.ChkListTriggerOnMouseLeave = function (evt) {
        evt.data.chkBoxListTriggerMouseOver = false;
        setTimeout(function () { evt.data.HideChkList(); }, 50);
    }


    this.DisplayChkList = function () {

        chkBoxListMouseOver = false;
        var chkBoxList = $("#" + this.chkBoxListName);
        var chkBoxListTrigger = $("#" + this.chkBoxListTriggerName)


        var pos = chkBoxListTrigger.position()
        var width = chkBoxListTrigger.outerWidth();
        var height = chkBoxListTrigger.outerHeight();
        if (this.chkBoxListPosition == "left") {
            chkBoxList.css({
                position: "absolute",
                top: pos.top + "px",
                left: (pos.left + width) + "px"
            }).show();
        }
        if (this.chkBoxListPosition == "bottom") {
            chkBoxList.css({
                position: "absolute",
                top: (pos.top + height) + "px",
                left: (pos.left) + "px"
            }).show();
        }
    }

    this.HideChkList=function() {
        var chkBoxList = $("#" + this.chkBoxListName);
        if (!((this.chkBoxListTriggerMouseOver) || (this.chkBoxListMouseOver))) {
            chkBoxList.hide();
        }
    }



}

