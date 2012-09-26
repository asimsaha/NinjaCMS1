var CheckBoxList = {
    Config: "",
    Init: function (Configer) {
        this.Config = Configer;
        var index = 0;
        var str = "";

        while (this.Config.Data.length > index) {
            if ((index % this.Config.Col) == 0)
                str += "<br/>";
            str += "<input id='" + this.Config.ID + "_" + index + "' type='checkbox'" + ((typeof this.Config.Event) == "undefined" ? "" : ("onchange='" + this.Config.Event + "(\"" + this.Config.Data[index][this.Config.ValueField] + "\",this)'")) + " value='" + this.Config.Data[index][this.Config.ValueField] + "' name='" + this.Config.ID + "_" + index + "'/>";
            str += "<label > " + this.Config.Data[index][this.Config.TextField] + "</label>";
            index++;
        }
        this.Config.ParentEL.append(str);

    },
    InitInTable: function (Configer) {
        this.Config = Configer;
        var index = 0;
        var str = "<table>";

        if (this.Config.Data == null) {
            this.Config.ParentEL.empty();
            return;
        }
        else {
            if (this.Config.Title != null && this.Config.Data.length != 0) {
                str += "<tr><b>" + this.Config.Title + "</b></tr>";
            }
        }
        this.Config.ParentEL.empty();
        while (this.Config.Data.length > index) {
            if ((index % this.Config.Col) == 0) {
                if (str == "<table>") {
                    str += "<tr>";
                }
                else {
                    str += "<tr></tr>";
                }
            }
            str += "<td><input id='" + this.Config.ID + "_" + index + "' type='checkbox' " + ((typeof this.Config.Event) == "undefined" ? "" : ("onchange='" + this.Config.Event + "(\"" + this.Config.Data[index][this.Config.ValueField] + "\",this)'")) + " value='" + this.Config.Data[index][this.Config.ValueField] + "' name='" + this.Config.ID + "_" + index + "' title='" + this.Config.Data[index][this.Config.TextField] + "'/>";
            str += "<label > " + this.Config.Data[index][this.Config.TextField] + "</label></td>";
            index++;
        }
        str += "</tr>";
        str += "</table>"
        this.Config.ParentEL.append(str);

    },
    GetSelected: function (id) {
        var str = "";
        $('input[id^="' + id + '"]').each(function (i) {
            if ($(this).is(':checked'))
                str += $(this).val() + ',';
        });
        str = str.slice(0, -1);

        return str;
    },
    SetSelected: function (id, selection) {
        if (selection != null) {
            $('input[id^="' + id + '"]').each(function (i) {
                if (selection.indexOf("," + $(this).val() + ",") != -1) {
                    $(this).prop("checked", true);
                }
            }
        );
        }

    }
};