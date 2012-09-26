$(document).ready(PageOnLoad);

function PageOnLoad() {
    SetNavigatorVisibility();
    //Event binding
}
//Set Navigator visibility
function SetNavigatorVisibility() {

    var tabIndex = tabRegistration.GetActiveTabIndex();
    var tabCount = tabRegistration.tabCount;
    btnPrev.SetVisible(true);
    btnNext.SetVisible(true);
    btnFinish.SetVisible(false);
    if (tabIndex == 0) {
        btnPrev.SetVisible(false);
    }
    if (tabIndex == tabCount - 1) {
        btnNext.SetVisible(false);
        btnFinish.SetVisible(true);
    }
}
//Move to previous tab
function MovePrev(s, e) {
    var tabName = tabRegistration.GetActiveTab().name;
    var areEditorsValid = ASPxClientEdit.ValidateEditorsInContainerById(tabName);
    if (areEditorsValid) {
        var nextTab = tabRegistration.GetTab(tabRegistration.GetActiveTabIndex() - 1);
        nextTab.SetEnabled(true);
        tabRegistration.SetActiveTab(nextTab);
    }
    SetNavigatorVisibility()
}
//Move to next tab
function MoveNext(s, e) {
    var tabName = tabRegistration.GetActiveTab().name;
    var areEditorsValid = ASPxClientEdit.ValidateEditorsInContainerById(tabName);
    if (areEditorsValid) {
        var nextTab = tabRegistration.GetTab(tabRegistration.GetActiveTabIndex() + 1);
        nextTab.SetEnabled(true);
        tabRegistration.SetActiveTab(nextTab);
    }
    SetNavigatorVisibility()
}

//Get field text generic
function GetFieldText(sender, e) {    
    var fldName = GetFieldName(sender.name);
    sender.SetText(GetJSONField(fldName));

}
//Set field text generic
function SetFieldText(sender, e) {
    var fldName = GetFieldName(sender.name);
    SetJSONField(fldName, sender.GetText());
}

//Get field value from JSON and set to the field
function GetFieldValue(sender, e) {    
    var fldName = GetFieldName(sender.name);
    sender.SetValue(GetJSONField(fldName));

}

//Set field value--generic
function SetFieldValue(sender, e) {
    var fldName = GetFieldName(sender.name);
    SetJSONField(fldName, sender.GetValue());
}


//Get field value for radio
function GetRadioFieldValue(sender, e) {    
    var fldGroupName = GetFieldName(sender.groupName);
    var fldName = GetFieldName(sender.name);
    var fldVal = GetJSONField(fldGroupName);

    if (fldVal == fldName) {
        sender.SetValue(true)
    }
    else {
        sender.SetValue(false)
    }
}
//Set Radio field value
function SetRadioFieldValue(sender, e) {
    
    var fldGroupName = GetFieldName(sender.groupName);
    var fldName = GetFieldName(sender.name);
    var fldVal = GetJSONField(fldGroupName);

    if (sender.GetValue() == true) {
        SetJSONField(fldGroupName, fldName)
    }   
}

//Get field name from html field name
function GetFieldName(ctrlName) {
    var prefix = "ctrl";
    var htmName = ctrlName;
    var from = htmName.indexOf(prefix) + prefix.length;
    //var to = htmName.length - from;
    var fldName = htmName.substring(from);
    return fldName;
}

//Set JSON Field Value
function SetJSONField(fldName, value) {
    var dataString = GetJSONData();
    var data = jQuery.parseJSON(dataString);
    data[fldName] = value;
    hiddJSONData.Set('JsonData', JSON.stringify(data));
}
//Get JSON Field
function GetJSONField(fldName) {
    return jQuery.parseJSON(GetJSONData())[fldName];
}
//Get JSON Data
function GetJSONData() {
    return hiddJSONData.Get("JsonData");
}

function Finish(s, e) {
    
    //ajax call will be fired 
    var userProfileContainer = {
        data: GetJSONData()
    }
    $.ajax("/SusainLogisticsWeb/Services/UserProfileService.svc/SaveUserProfile", {

        beforeSend: function (xhr) { Common.AjaxCallBegin() },
        complete: function () { Common.AjaxCallEnd() },
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(userProfileContainer),
        type: 'POST',
        error: function (jqXHR, textStatus, errorThrown) {
            //document.location.href = "MobileError.htm";
            alert(textStatus);
        },
        success: function (data) {
            alert("Completed succesfuly");
            /*selectedSurvey = jQuery.parseJSON(data.GetSurveyResult)[0];
            $('[id$=txtName]').val(selectedSurvey.Name)
            $('[id$=txtDescription]').val(selectedSurvey.Description)*/

        }
    });
}
