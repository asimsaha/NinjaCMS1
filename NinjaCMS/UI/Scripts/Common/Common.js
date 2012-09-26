var Common = {
    canClearCascaded: true,
    autoCompleteChanged: false,
    stateData: null,
    //Set field value to controls
    SetMenu: function () {
        /*var menu1 = new FloatingList("AccountMenu");
        menu1.SetChkList();
        menu1.chkBoxListPosition = "bottom";

        var menu2 = new FloatingList("TruckerMenu");
        menu2.SetChkList();
        menu2.chkBoxListPosition = "bottom";

        var menu3 = new FloatingList("TransporterMenu");
        menu3.SetChkList();
        menu3.chkBoxListPosition = "bottom";

        var menu4 = new FloatingList("CommunityMenu");
        menu4.SetChkList();
        menu4.chkBoxListPosition = "bottom";

        var menu5 = new FloatingList("HelpMenu");
        menu5.SetChkList();
        menu5.chkBoxListPosition = "bottom";*/

        //$('#' + $("#hdnRightMenu").val() + "RightMenu").show();
        $('#' + $("#hdnRightMenu").val() + "MenuTrigger").parent().attr("class", "selected");

        var businessType = $.trim($("#hdnBusinessType").val());

    },
    SetValueToControls: function () {
        try {
            Common.SetMenu();
        } catch (e) {

        }
        if ($('#hiddJSONStateData').length != 0) {
            Common.stateData = $.parseJSON($('#hiddJSONStateData').val());
        }
        this.isDevMachine = $("#isDevMachine").val();

        var selectedItems = $.find('[bindable="true"]')
        for (var count = 0; count < selectedItems.length; count++) {

            var type = null;
            var container = selectedItems[count];
            var ret = this.GetInternalHtmlControl(container, type);

            if (ret != null) {
                switch (ret.type) {
                    case "SELECT":
                        this.GetFieldValue(ret.ctrl, null);
                        this.PopulateDropDown(ret.ctrl);
                        var cascadeto = $(ret.ctrl).attr("cascadeto");
                        if (cascadeto != null) {
                            $('#' + cascadeto).change(this.OnCascadeChange);
                        }
                        break;
                    case "INPUT":
                        this.GetFieldValue(ret.ctrl, null);
                        var clearto = $(ret.ctrl).attr("clearto");
                        if (typeof clearto !== 'undefined' && clearto !== false) {
                            var cleartoArr = clearto.split(",");
                            for (var i1 = 0; i1 < cleartoArr.length; i1++) {

                                $('#' + cleartoArr[i1]).change(this.OnClearTo);

                            }
                        }
                        /*for (var count = 0; count < cleartoArr.count; count++) {
                        if (clearto != null) {
                        $('#' + cleartoArr[count]).change(this.OnClearTo);
                        }
                        }*/
                        break;
                    case "RADIO":
                        this.GetRadioFieldValue(ret.ctrl, null);
                        break;
                    case "CHECKBOX":
                        this.GetCheckFieldValue(ret.ctrl, null);
                        break;
                    case "TEXTAREA":
                        this.GetFieldValue(ret.ctrl, null);
                        break;
                }
            }

        }

    },
    OnClearTo: function (e) {
        var ctrlId = $(e.target).prop("id");
        $("[clearto*='" + ctrlId + "']").val("");
    },
    //Get check box field value
    GetCheckFieldValue: function (sender, e) {
        var fldName = this.GetFieldName($(sender).attr('name'));
        var isChecked = this.GetJSONField(fldName);
        $(sender).prop("checked", isChecked);
    },

    //Set check box field value
    SetCheckFieldValue: function (sender, e) {
        var fldName = this.GetFieldName($(sender).attr('name'));
        this.SetJSONField(fldName, $(sender).prop("checked"));
    },

    OnCascadeChange: function (e) {
        var cascadeTo = $(e.target).prop("id")
        var selectedItems = $("[cascadeto='" + cascadeTo + "']");
        for (var count = 0; count < selectedItems.length; count++) {

            Common.PopulateDropDown(selectedItems[count], "empty");
        }
    },

    PopulateDropDown: function (ddl, value, text) {
        if (ddl == null)
            return;
        var cascadeto = $(ddl).attr("cascadeto");
        var dataSource = $(ddl).attr("bindlistto");
        var cascadeto = $(ddl).attr("cascadeto");
        var param = "";
        var ctrlId = $(ddl).prop("id");
        var cascadetoIndex = 0;
        if (typeof cascadeto !== 'undefined' && cascadeto !== false) {
            var cascadetoItem = $('#' + cascadeto);
            param = cascadetoItem.val();
            if ((param == null) || (param == "0")) {
                param = Common.GetJSONField(cascadeto.replace("ctrl", ""));
            }
            if (value == "empty") {
                param = cascadetoItem.val();
                value = "0";
            }
            cascadetoIndex = cascadetoItem.prop("selectedIndex");
        }
        param = param == null ? "" : param;
        var dataContainer = {
            data: param
        }

        /*if (!Common.canClearCascaded) {

        Common.canClearCascaded = true;
        $("[cascadeto*='" + ctrlId + "']").val("");
        try {

        $("[cascadeto*='" + ctrlId + "']").prop("selectedIndex", 0);
        } catch (e) {

        }
        }*/
        if (ctrlId.indexOf("State") != -1) {
            $(ddl).append($("<option />").val("0").text("Select " + "State"));
            if (Common.stateData != null) {
                for (var i = 0; i < Common.stateData.length; i++) {
                    $(ddl).append($("<option />").val(Common.stateData[i].ID).text(Common.stateData[i].Name));
                }

                if (typeof value !== 'undefined' && value !== false) {

                    $(ddl).val(value);

                }
                else {
                    //Common.GetJSONData(
                    Common.GetFieldValue($(ddl)[0], null);
                }
                return;
            }
        }

        if ((cascadetoIndex == 0) || (typeof cascadeto !== 'undefined' && cascadeto !== false)) {
            if (typeof dataSource !== 'undefined' && dataSource !== false) {
                $.ajax("/SusainLogisticsWeb/Services/UserProfileService.svc/Fetch" + dataSource, {

                    beforeSend: function (xhr) { Common.AjaxCallBegin() },
                    complete: function () { Common.AjaxCallEnd() },
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(dataContainer),
                    type: 'POST',
                    error: function (jqXHR, textStatus, errorThrown) {
                        //document.location.href = "MobileError.htm";
                        if (errorThrown != "") {
                            alert(textStatus);
                        }
                    },
                    success: function (data) {

                        //alert("Completed succesfuly");
                        $(ddl).empty();
                        var firstItemText = "Select " + dataSource.substr(0, dataSource.length - 1);
                        if (dataSource.indexOf("Cities") != -1) {
                            firstItemText = "Select City";
                        }
                        if (dataSource.indexOf("BusinessType") != -1) {
                            firstItemText = "Select Business Type";
                        }
                        if (dataSource.indexOf("LayoutList") != -1) {
                            firstItemText = "New Web Page";
                        }
                        if (dataSource.indexOf("MasterList") != -1) {
                            firstItemText = "Select Design Page";
                        }
                        if (dataSource.indexOf("MenuList") != -1) {
                            firstItemText = "Select List of Link";
                        }
                        $(ddl).append($("<option />").val("0").text(firstItemText));
                        var result = jQuery.parseJSON(eval("data.Fetch" + dataSource + "Result"));
                        if (result != null) {
                            for (var i = 0; i < result.length; i++) {
                                $(ddl).append($("<option />").val(result[i].ID).text(result[i].Name));
                            }
                        }
                        if (typeof text !== 'undefined' && text !== false && text != "") {
                            //$("#" + ctrlId + " option:[text='" + text + "']").attr('selected', true);
                            $(ddl).children(":contains(" + text + ")").filter(function (index) {
                                return $(this).text() === text;
                            }
                            ).prop("selected", true);
                        }
                        else {
                            if (typeof value !== 'undefined' && value !== false && value != "") {

                                $(ddl).val(value);

                            }
                            else {
                                //Common.GetJSONData(
                                Common.GetFieldValue($(ddl)[0], null);
                            }
                        }
                        if (dataSource.indexOf("District") != -1) {
                            try {
                                if (Common.autoCompleteChanged) {
                                    setTimeout(SetDesZip, 100);
                                    setTimeout(SetSrcZip, 100);
                                    Common.autoCompleteChanged = false;
                                }
                            } catch (e) {

                            }
                        }
                    }
                });
            }

        }

    },

    GetValueFromControls: function () {
        var selectedItems = $.find('[bindable="true"]')
        for (var count = 0; count < selectedItems.length; count++) {

            var type = null;
            var container = selectedItems[count];
            var ret = this.GetInternalHtmlControl(container, type);


            switch (ret.type) {
                case "SELECT":
                    this.SetFieldValue(ret.ctrl, null);
                    break;
                case "INPUT":
                    this.SetFieldValue(ret.ctrl, null);
                    break;
                case "RADIO":
                    this.SetRadioFieldValue(ret.ctrl, null);
                    break;
                case "CHECKBOX":
                    this.SetCheckFieldValue(ret.ctrl, null);
                    break;
                case "TEXTAREA":
                    this.SetFieldValue(ret.ctrl, null);
                    break;
            }

        }
    },

    GetInternalHtmlControl: function (container, type) {
        var firstInput;
        //If text box or dropdown.
        if (($(container).children().length == 0) || (container.options)) {
            firstInput = $(container);
        }
        else {
            firstInput = $(container).find('input[type=text],input[type=password],input[type=hidden],input[type=radio],input[type=checkbox],textarea,select').filter(':first');
        }
        var ret = {
            type: null,
            ctrl: null
        };
        if (firstInput != null) {
            if (firstInput.length != 0) {

                if (firstInput.prop('tagName').toUpperCase() == "INPUT") {
                    type = firstInput.attr('type').toUpperCase();
                    if (((type != "RADIO") && (type != "CHECKBOX"))) {
                        type = "INPUT";
                    }
                }
                else {
                    type = firstInput.prop('tagName').toUpperCase();
                }
                ret.ctrl = firstInput;
                ret.type = type;
                return ret;
            }
        }
        return null;
    },

    //Get field text generic
    GetFieldText: function (sender, e) {
        var fldName = this.GetFieldName(sender.name);
        $(sender).text(this.GetJSONField(fldName));

    },
    //Set field text generic
    SetFieldText: function (sender, e) {
        var fldName = this.GetFieldName($(sender).attr("id"));
        this.SetJSONField(fldName, $(sender).text());
    },

    //Get field value from JSON and set to the field
    GetFieldValue: function (sender, e) {
        var fldName = this.GetFieldName($(sender).attr("id"));
        if (this.GetJSONField(fldName) != null) {
            $(sender).val(this.GetJSONField(fldName));
        }

    },

    //Set field value--generic
    SetFieldValue: function (sender, e) {
        var fldName = this.GetFieldName($(sender).attr("id"));
        this.SetJSONField(fldName, $(sender).val());
    },

    //Get field value for radio
    GetRadioFieldValue: function (sender, e) {
        var fldGroupName = this.GetFieldName($(sender).attr("name"));
        var fldName = this.GetFieldName($(sender).attr("id"));
        var fldVal = this.GetJSONField(fldGroupName);

        if (fldVal == fldName) {
            $(sender).attr("checked", "checked")
        }
        else {
            $(sender).removeAttr("checked")
        }
    },

    //Set Radio field value
    SetRadioFieldValue: function (sender, e) {

        var fldGroupName = this.GetFieldName($(sender).attr("name"));
        var fldName = this.GetFieldName($(sender).attr("id"));
        var fldVal = this.GetJSONField(fldGroupName);

        if ($(sender).attr("checked") == "checked") {
            this.SetJSONField(fldGroupName, fldName)
        }
    },

    //Get field name from html field name
    GetFieldName: function (ctrlName) {
        var prefix = "ctrl";
        var htmName = ctrlName;
        var from = htmName.indexOf(prefix) + prefix.length;
        //var to = htmName.length - from;
        var fldName = htmName.substring(from);
        return fldName;
    },

    //Set JSON Field Value
    SetJSONField: function (fldName, value) {
        var dataString = this.GetJSONData();
        var data = jQuery.parseJSON(dataString);
        data[fldName] = value;
        $('#hiddJSONData').val(JSON.stringify(data));
    },
    //Get JSON Field
    GetJSONField: function (fldName) {
        return jQuery.parseJSON(this.GetJSONData())[fldName];
    },
    //Get JSON Data
    GetJSONData: function () {
        return $('#hiddJSONData').val();
    },
    PopulateAutoComplete: function (id, stateCtrl, districtCtrl) {
        //        var userProfileContainer = {
        //            data: Common.GetJSONData()
        //        }
        /*$.ajax("/SusainLogisticsWeb/Services/UserProfileService.svc/GetZips", {

        beforeSend: function (xhr) { },
        complete: function () { },
        contentType: 'application/json',
        dataType: "json",
        // data: JSON.stringify(userProfileContainer),
        type: 'POST',
        error: function (jqXHR, textStatus, errorThrown) {
        //document.location.href = "MobileError.htm";
        alert(textStatus);
        },
        success: function (data) {
        var content =eval( data.GetZipsResult);
        $("#" + id).autocomplete({ source: content });
        $("#" + id).css('width', '150px');
        }
        });*/

        $("#" + id).autocomplete({

            change: function (e, ui) {

                if (ui.item != null) {
                    //$("#" + id).val(ui.item.label);
                    if (stateCtrl.prop("selectedIndex") + "" == '0') {
                        var stateId = ui.item.id.split(",")[2] + "";
                        stateCtrl.val(stateId);
                        var districtId = ui.item.id.split(",")[1];
                        Common.PopulateDropDown(districtCtrl, districtId);
                        //districtCtrl.val(districtId);
                        Common.canClearCascaded = false;
                        Common.StateValidator(stateCtrl);
                        Common.autoCompleteChanged = true;
                        return;
                    }

                    if (districtCtrl.prop("selectedIndex") + "" == '0') {
                        var districtId = ui.item.id.split(",")[1];
                        districtCtrl.val(districtId);
                        Common.canClearCascaded = true;
                    }

                }
                else {
                    stateCtrl.val("0");
                    districtCtrl.val("0");
                }
                Common.StateValidator(stateCtrl);
                //                if (typeof Page_Validators !== 'undefined' && clearto !== Page_Validators) {
                //                    for (var validatorCount = 0; validatorCount < Page_Validators.length; validatorCount++) {
                //                        if (Page_Validators[validatorCount].controltovalidate == stateCtrl.prop("id")) {
                //                            ValidatorValidate(Page_Validators[validatorCount]);
                //                            Page_IsValid = Page_IsValid ? Page_Validators[validatorCount].isvalid : Page_IsValid;
                //                        }
                //                    }
                //                }
            },
            source: function (request, response) {
                var dataContainer = {
                    state: stateCtrl.val(),
                    district: districtCtrl.val(),
                    text: request.term
                }
                $.ajax({
                    url: "Services/UserProfileService.svc/GetZips",
                    beforeSend: function (xhr) { Common.AjaxCallBegin() },
                    complete: function () { Common.AjaxCallEnd() },
                    data: JSON.stringify(dataContainer),
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataFilter: function (data) { return data; },
                    success: function (data) {
                        response($.map($.parseJSON(data.GetZipsResult), function (item) {
                            return {
                                id: item.StateZipId,
                                label: item.ZipCode

                            }
                        }))
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(textStatus);
                    }
                });
            },
            minLength: 2
        });
    },
    S4: function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid: function () {
        return (Common.S4() + Common.S4() + "-" + Common.S4() + "-" + Common.S4() + "-" + Common.S4() + "-" + Common.S4() + Common.S4() + Common.S4());
    },

    //23 - 8 2012

    replaceAll: function (dateList) {
        return dateList.replace(/\-/g, '/');
    },
    DateList: function (stringDates) {
        //var fldName = this.GetFieldName($(sender).attr("id"));
        //var datelist = Common.GetJSONField(fldName);
        if (stringDates == null || stringDates == "" || stringDates.length == 0)
            return "";
        var dateArr = new Array();
        stringDates = Common.replaceAll(stringDates);
        var stringDatesArr = stringDates.split(',');

        for (var eachDate = 0; eachDate < stringDatesArr.length; eachDate++) {
            //dateArr[eachDate] = new Date(stringDatesArr[eachDate]);
            //dateArr[eachDate] = dateformat(new Date(stringDatesArr[eachDate]), "dd/mm/yyyy");
            try {
                dateArr[eachDate] = $.datepicker.parseDate("dd/mm/yy", stringDatesArr[eachDate]);
            }
            catch (ex) {
            }
        }
        return dateArr;
    },
    StateValidator: function (stateCtrl) {
        if (typeof Page_Validators !== 'undefined' && Page_Validators !== false) {
            for (var validatorCount = 0; validatorCount < Page_Validators.length; validatorCount++) {
                if (Page_Validators[validatorCount].controltovalidate == stateCtrl.prop("id")) {
                    ValidatorValidate(Page_Validators[validatorCount]);
                    Page_IsValid = Page_IsValid ? Page_Validators[validatorCount].isvalid : Page_IsValid;
                }
            }
        }
    },
    IsEmpty: function (input) {
        if ((typeof input !== 'undefined') && (input !== false)) {
            return false;
        }
        else {
            return true;
        }
    },

    StringReverse: function (str) {
        return str.split("").reverse().join("");
    },

    GetZipFromMatch: function (str) {
        return Common.StringReverse(Common.StringReverse(str).substring(0, 6))
    },


    AjaxCallBegin: function () {
    },

    AjaxCallEnd: function () {
    },

    IsError: function (ret) {

        for (var key in ret) {
            if (ret[key].indexOf("ServerError:") != -1) {
                alert(ret[key]);
                return true;
            }
        }
        return false;
    }

}

