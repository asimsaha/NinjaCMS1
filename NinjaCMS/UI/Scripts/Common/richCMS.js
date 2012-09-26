var cms = function(){
            this.Config= "";
            this.isDesignMode= true;
            this.init= function () {
                $("#tool").hide();
                var pageName = "";
                var a = document.createElement('a');
                a.href = window.location;
                var pageName = a.pathname.split('/').pop();
                if (pageName == this.Config.Page) {
				if($("#" + this.Config.Id).html()=="")
                    $("#" + this.Config.Id).html(this.Config.Value);
                    if (this.Config.HtmlEdit == true) {
					
                        $("#" + this.Config.Id).click(function (e) {
                            var tm= new cms().set();
                            $("#tool").show();
							$("#tool").attr('elId',this.id);
                            $("#tool").offset({ left: e.pageX, top: e.pageY });
                            val = this.innerHTML;
                            setTimeout(function () { var tm= new cms().getIFrameDocument("textEditor").body.innerHTML =val;  var tm= new cms().getIFrameDocument('textEditor').designMode = "On"; }, 1000);
						
                        });
                    }
                    else {
                        $("#" + this.Config.Id).click(function () { $(this).attr('contentEditable', 'true'); });
                        
                        $("#" + this.Config.Id).blur(function () { var tm= new cms().closeEditor(this.id); });
                    }

                }
            };
            this.closeEditor= function (id) {
			    var pageName = "";
                var a = document.createElement('a');
                a.href = window.location;
                var pageName = a.pathname.split('/').pop();
				
				if($("#tool").is(":hidden"))
				{
					$("#" + id).attr('contentEditable', 'false');
				}
				else
				{
					$("#tool").hide();
					var tm= new cms();
					id=$("#tool").attr('elId');
					$("#" + id).html(tm.getIFrameDocument("textEditor").body.innerHTML);
				}
				if(typeof window.saveCMS == 'function') {
					saveCMS(pageName,id,$("#" + id).html());
				}
            };
            this.set= function () {
                var tool = '    <div>' +
                '<div style="background-color:#CCCCCC;width:500px;">' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'bold\')"> ' +
                    '<img id="bold" src="images/bold.gif" alt="Bold" title="B" style="height: 20px; width: 21px;border:none;"/> ' +
                '</a>' +
                        '<a onclick="javascript:var tm=new cms().fontEdit(\'italic\')">' +
                    '<img id="italic" src="images/italic.gif" alt="" title="I" style="height: 20px; width: 21px;border:none;"/>   ' +
                '</a>' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'underline\')">' +
                    '<img id="underline" src="images/underline.gif" alt="" title="U" style="height: 20px; width: 21px;border:none;"/> ' +
                 '</a>' +
                 '<img id="sep1" src="images/sep.gif" alt="" style="height: 16px; width: 1px;border:none;" />' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'justifyleft\')">' +
                    '<img id="justifyleft" src="images/justifyleft.gif" alt="" title="Justify Left" style="height: 20px; width: 21px;border:none;" /> ' +
                '</a>' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'justifycenter\')">' +
                 '   <img id="justifycenter" src="images/justifycenter.gif" alt="" title="Justify Center" style="height: 20px; width: 21px;border:none;"/> ' +
                '</a>' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'justifyright\')">' +
                    '<img id="justifyright" src="images/justifyright.gif" alt="" title="Justify Right" style="height: 20px; width: 21px;border:none;" />' +
                '</a>' +
                '<img id="sep2" src="images/sep.gif" alt="" style="height: 16px; width: 1px;border:none;" /> ' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'insertorderedlist\')">' +
                    '<img id="insertorderedlist" src="images/numberedlist.gif" alt="" title="Order List" style="height: 20px; width: 21px;border:none;" />' +
                '</a>' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'insertunorderedlist\')">' +
                    '<img id="insertunorderedlist" src="images/bulletedlist.gif" alt="" title="Bullets List" style="height: 20px; width: 21px;border:none;" />' +
                '</a>' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'outdent\')">' +
                    '<img id="outdent" src="images/outdent.gif" alt="" title="Outdent" style="height: 20px; width: 21px;border:none;" />' +
                '</a>' +
                '<a onclick="javascript:var tm=new cms().fontEdit(\'indent\')">' +
                    '<img id="indent" src="images/indent.gif" alt="" title="Indent" style="height: 20px; width: 21px;border:none;" />' +
                '</a>' +
                '<a onclick="ChangeMode()">' +
                    '<img id="mode" src="images/mode.design.gif" alt="" title="Design View" style="height: 20px; width: 21px;border:none;" />' +
                '</a> ' +
                 '<a onclick="javascript:new cms().closeEditor()">' +
                    'close' +
                '</a>' +
                '</div>' +
                '<div style="background-color:#CCCCCC;width:497px;padding-left:3px;"> ' +
                     '<select id="fonts" class="select" onchange="var tm=new cms().fontEdit(\'fontname\',this[this.selectedIndex].value)">' +
                    '<option value="Arial">Font</option>' +
                    '<option value="Arial">Arial</option>' +
                    '<option value="Courier New">Courier New</option>' +
                    '<option value="Monotype Corsiva">Monotype</option>' +
                    '<option value="Tahoma">Tahoma</option>' +
                    '<option value="Times">Times</option>' +
                '</select>' +
                     '<select id="size" class="select" onchange="var tm=new cms().fontEdit(\'fontsize\',this[this.selectedIndex].value)">' +
                    '<option value="0">Size</option>' +
                    '<option value="1">1</option>' +
                    '<option value="2">2</option>' +
                    '<option value="3">3</option>' +
                    '<option value="4">4</option>' +
                    '<option value="5">5</option>' +
                '</select>' +
                     '<select id="color" class="select" onchange="var tm=new cms().fontEdit(\'ForeColor\',this[this.selectedIndex].value)">' +
                    '<option value="color">Color</option>' +
                    '<option style="color: black;" value="black">Black</option>' +
                    '<option style="color: red;" value="red">Red</option>' +
                    '<option style="color: blue;" value="blue">Bblue</option>' +
                    '<option style="color: green;" value="green">Green</option>' +
                    '<option style="color: #3b3b3b;" value="pink">Pink</option>' +
                '</select>' +
                '</div>' +
                 '<iframe id="textEditor" style="border:1px solid;width: 500px; height: 170px;" scrolling="no">' +
                '</iframe>' +
            '</div>';
                $('#tool').html(tool);
                this.getIFrameDocument('textEditor').designMode = "On";
                // this.getIFrameDocument("textEditor").focus();
            };
            this.get= function () { };
            this.fontEdit= function (command, y) {
                switch (command) {
                    case 'bold':
                        if (document.getElementById('bold').src.toString().indexOf("over") != -1) {
                            document.getElementById('bold').src = "images/bold.gif";
                        }
                        else {
                            document.getElementById('bold').src = "images/bold.over.gif";
                        }
                        break;
                    case 'italic':
                        if (document.getElementById('italic').src.toString().indexOf('over') != -1)
                            document.getElementById('italic').src = 'images/italic.gif';
                        else
                            document.getElementById('italic').src = 'images/italic.over.gif';
                        break;
                    case 'underline':
                        if (document.getElementById('underline').src.toString().indexOf('over') != -1)
                            document.getElementById('underline').src = 'images/underline.gif';
                        else
                            document.getElementById('underline').src = 'images/underline.over.gif';
                        break;
                    case 'justifyleft':
                        if (document.getElementById('justifyleft').src.toString().indexOf('over') != -1)
                            document.getElementById('justifyleft').src = 'images/justifyleft.gif';
                        else
                            document.getElementById('justifyleft').src = 'images/justifyleft.over.gif';
                        break;
                    case 'justifycenter':
                        if (document.getElementById('justifycenter').src.toString().indexOf('over') != -1)
                            document.getElementById('justifycenter').src = 'images/justifycenter.gif';
                        else
                            document.getElementById('justifycenter').src = 'images/justifycenter.over.gif';
                        break;
                    case 'justifyright':
                        if (document.getElementById('justifyright').src.toString().indexOf('over') != -1)
                            document.getElementById('justifyright').src = 'images/justifyright.gif';
                        else
                            document.getElementById('justifyright').src = 'images/justifyright.over.gif';
                        break;
                    case 'insertorderedlist':
                        if (document.getElementById('insertorderedlist').src.toString().indexOf('over') != -1)
                            document.getElementById('insertorderedlist').src = 'images/numberedlist.gif';
                        else
                            document.getElementById('insertorderedlist').src = 'images/numberedlist.over.gif';
                        break;
                    case 'insertunorderedlist':
                        if (document.getElementById('insertunorderedlist').src.toString().indexOf('over') != -1)
                            document.getElementById('insertunorderedlist').src = 'images/bulletedlist.gif';
                        else
                            document.getElementById('insertunorderedlist').src = 'images/bulletedlist.over.gif';
                        break;
                    case 'outdent':
                        if (document.getElementById('outdent').src.toString().indexOf('over') != -1)
                            document.getElementById('outdent').src = 'images/outdent.gif';
                        else
                            document.getElementById('outdent').src = 'images/outdent.over.gif';
                        break;
                    case 'indent':
                        if (document.getElementById('indent').src.toString().indexOf('over') != -1)
                            document.getElementById('indent').src = 'images/indent.gif';
                        else
                            document.getElementById('indent').src = 'images/indent.over.gif';
                        break;
                    case 'default':
                        break;
                }
                this.getIFrameDocument('textEditor').execCommand(command, "", y);
                textEditor.focus();

            };
            this.getIFrameDocument= function (aID) {
                // if contentDocument exists, W3C compliant (Mozilla)

                if (document.getElementById(aID).contentDocument) {
                    return document.getElementById(aID).contentDocument;
                } else {
                    // IE

                    return document.frames[aID].document;
                }
            };
            this.ChangeMode= function () {
                if (this.isDesignMode == true) {
                    this.isDesignMode = false;
                    document.getElementById('mode').src = 'images/mode.html.gif';
                    document.getElementById('mode').title = 'HTML View';
                    Encoder.EncodeType = "entity";
                    var encoded = Encoder.htmlEncode(this.getIFrameDocument("textEditor").body.innerHTML);
                    this.getIFrameDocument("textEditor").body.innerHTML = encoded;
                }
                else {
                    this.isDesignMode = true;
                    document.getElementById('mode').src = 'images/mode.design.gif';
                    document.getElementById('mode').title = 'Design View';
                    var decoded = Encoder.htmlDecode(this.getIFrameDocument("textEditor").body.innerHTML);
                    this.getIFrameDocument("textEditor").body.innerHTML = decoded;
                }
            }

        };