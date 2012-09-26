var DataGrid = {
    ID: "",
    SetRowCount: function () { },
    gridParameters: function (val, name) {
        if (typeof val != "undefined" && val != null) {
            var tmp1 = getCookie(DataGrid.ID);
            if (typeof name != "undefined") {
                if (name == "List") {
                    tmp = jQuery.parseJSON(tmp1);
                    if (tmp == "") {
                        tmp = jQuery.parseJSON(DataGrid.GetJSONData());
                    }
                    tmp.List = JSON.stringify(val);
                    setCookie(DataGrid.ID, JSON.stringify(tmp), 1);
                }
            }
            else {
                tmp1 = val;
                setCookie(DataGrid.ID, JSON.stringify(tmp1), 1);
            }
        }
        var result = getCookie(DataGrid.ID)
        return result;
    },
    gridParametersFormExternal: function (id, val) {
        if (typeof val != "undefined") {
            setCookie(id, JSON.stringify(val), 1);
        }
    },
    gridCallURL: function (id, val) {
        if (typeof val != "undefined") {
            setCookie("gridCallURL" + id, val, 1);
        }
        return getCookie("gridCallURL" + id);
    },
    gridHtml: "",
    gridHolder: "",
    Init: function () {

        DataGrid.gridParameters(jQuery.parseJSON(DataGrid.gridParameters()));

        $('[cmd="Prev"]').hide();
        $('[cmd="Next"]').hide();

        $('[cmd="Sort"]').unbind('click');
        $('[cmd="Prev"]').unbind('click');
        $('[cmd="Next"]').unbind('click');
        $('[cmd="RowNumber"]').unbind('click');


        $('[cmd="Sort"]').click(DataGrid.OnSort);
        $('[cmd="Prev"]').click(DataGrid.OnPrev);
        $('[cmd="Next"]').click(DataGrid.OnNext);
        $('[cmd="RowNumber"]').change(DataGrid.OnRowNumberChange);

        val = jQuery.parseJSON(DataGrid.GetJSONData());
        $('[cmd="RowNumber"] option[value="' + val.RowPerPage + '"]').attr('selected', 'selected');
        $('tr[name="dataGridRow' + DataGrid.ID + '"]').remove();
        DataGrid.gridHolder = $('#gridHolder');
        DataGrid.gridHtml = DataGrid.gridHolder.html();
        DataGrid.FetchData();
    },
    OnSort: function (s) {
        s.preventDefault();
        var currentSortName = $(s.target).attr("expr");
        val = jQuery.parseJSON(DataGrid.gridParameters());
        var prevSortName = val.SortName;
        var sortDirection = val.SortDirection;
        if (prevSortName == currentSortName) {
            sortDirection = sortDirection == 0 ? 1 : 0;
        }
        else {
            val.SortName = currentSortName;
        }
        val.SortDirection = sortDirection;
        DataGrid.gridParameters(val);
        DataGrid.FetchData();
    },
    OnPrev: function (s) {
        s.preventDefault();
        val = jQuery.parseJSON(DataGrid.gridParameters());
        var currentPageIndex = val.CurrentPageIndex;
        if (currentPageIndex != 1) {
            currentPageIndex -= 1;
            val.CurrentPageIndex = currentPageIndex;
            DataGrid.gridParameters(val);
            DataGrid.FetchData();
        }
    },
    OnNext: function (s) {
        s.preventDefault();
        val = jQuery.parseJSON(DataGrid.gridParameters());
        var currentPageIndex = val.CurrentPageIndex;
        var maxPageIndex = val.RowCount / val.RowPerPage;
        if (currentPageIndex < maxPageIndex) {
            currentPageIndex += 1;
            val.CurrentPageIndex = currentPageIndex;
            DataGrid.gridParameters(val);
            DataGrid.FetchData();
        }
    },
    OnRowNumberChange: function (s) {
        s.preventDefault();
        var el = s.target || s.srcElement;
        val = jQuery.parseJSON(DataGrid.gridParameters());
        var RowPerPage = $(el).find(":selected").text();

        val.RowPerPage = RowPerPage;
        DataGrid.gridParameters(val);
        DataGrid.FetchData();

    },
    GetJSONData: function () {
        return $('#hiddJSONData').val();
    },
    RenderGrid: function () {
        var templateText = "";
        if ($('#rowTmp').length == 0) {
            templateText = getCookie("rowTmp" + DataGrid.ID);
        }
        else {
            templateText = $('#rowTmp').html();
            setCookie("rowTmp" + DataGrid.ID, $('#rowTmp').html(), 1);
            $('#rowTmp').remove();
        }

        val = jQuery.parseJSON(DataGrid.gridParameters());
        var currentPageIndex = val.CurrentPageIndex;
        if (currentPageIndex != 1) {
            $('[cmd="Prev"]').show();
        }
        else {
            $('[cmd="Prev"]').hide();
        }

        var maxPageIndex = val.RowCount / val.RowPerPage;

        if (currentPageIndex < maxPageIndex) {
            $('[cmd="Next"]').show();
        }
        else {
            $('[cmd="Next"]').hide();
        }


        var rowHtml = "";
        tmp = (jQuery.parseJSON(DataGrid.gridParameters()).List);
        tmp = jQuery.parseJSON(tmp);
        tmp = (jQuery.parseJSON(tmp));
        $('tr[name="dataGridRow' + DataGrid.ID + '"]').remove();
        for (var listCount = 0; listCount < tmp.length; listCount++) {
            var templateTextTemp = templateText;
            var className = "odd";
            if ((listCount % 2) == 0) {
                className = "even";
            }
            for (var name in tmp[listCount]) {
                templateTextTemp = templateTextTemp.replace("@" + name, tmp[listCount][name]);

                if (templateTextTemp.indexOf("@" + name, tmp[listCount][name]) != -1) {
                    templateTextTemp = templateTextTemp.replace("@" + name, tmp[listCount][name]);
                }

                if (templateTextTemp.indexOf("@" + name, tmp[listCount][name]) != -1) {
                    templateTextTemp = templateTextTemp.replace("@" + name, tmp[listCount][name]);
                }
            }
            rowHtml = "<tr name='dataGridRow" + DataGrid.ID + "' class='" + className + "'>" + templateTextTemp + "</tr>";
            rowHtml = rowHtml.replace("null", "").replace("null", "").replace("null", "").replace("null", "");
            DataGrid.gridHolder.find("tr:last").after(rowHtml);
        }
        //DataGrid.gridHolder.find("tr:last").after(rowHtml);
        //DataGrid.gridHolder.html(DataGrid.gridHtmlreplace("</table>", rowHtml + "</table>"));
        $('#rowTmp').remove()
        //--------------------------Will be removed from here[subhadip]---------------------//
        $('[name="gmapDir"]').click(function () {
            $("#gmapIfream").attr("src", 'direction.htm' + $(this).attr("param"));
            $("#gmap").dialog("open");
        });
        //----------------------------------------------------------//

        //$('[cmd="Sort"]').click(DataGrid.OnSort);

    },
    FetchData: function () {
        //DataGrid.gridParameters("", 'List');
        var tmp = jQuery.parseJSON(DataGrid.gridParameters());

        if (tmp != null)
            delete tmp.List;
        var gridParametersContainer = {
            data: JSON.stringify(tmp)
        }
        $.ajax("/SusainLogisticsWeb/Services/UserProfileService.svc/" + DataGrid.gridCallURL(this.ID), {

            beforeSend: function (xhr) { Common.AjaxCallBegin() },
            complete: function () { Common.AjaxCallEnd() },
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(gridParametersContainer),
            type: 'POST',
            error: function (jqXHR, textStatus, errorThrown) {
                //document.location.href = "MobileError.htm";
                alert(textStatus);
            },
            success: function (data) {

                var ret = data[DataGrid.gridCallURL(DataGrid.ID) + "Result"];
                if (ret.indexOf("ServerError:") != -1) {
                    alert(ret);
                    return;
                }

                var tmp = data[DataGrid.gridCallURL(DataGrid.ID) + "Result"];
                DataGrid.gridParameters(tmp, 'List');

                //  DataGrid.gridParameters(jQuery.parseJSON(eval("data." + DataGrid.gridCallURL(DataGrid.ID) + "Result")), "List");
                DataGrid.SetRowCount();
                DataGrid.RenderGrid();


            }
        });
    }


};

function setCookie(c_name, value, exdays) {
   
    if (document.getElementById(c_name) == null) {
        
        var hdn = document.createElement('input');
        hdn.id = c_name;
        hdn.setAttribute("type", "hidden");
        hdn.value = value;
        document.body.appendChild(hdn);
    }
    else {

        var hdn = document.getElementById(c_name);
        hdn.id = c_name;
//        hdn.setAttribute("type", "hidden");
        hdn.value = value;
        
    }
//    var exdate = new Date();
//    exdate.setDate(exdate.getDate() + exdays);
//    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
//    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var hdn = document.getElementById(c_name);
    return hdn.value;
//    var i, x, y, ARRcookies = document.cookie.split(";");
//    for (i = 0; i < ARRcookies.length; i++) {
//        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
//        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
//        x = x.replace(/^\s+|\s+$/g, "");
//        if (x == c_name) {
//            return unescape(y);
//        }
//    }
}
