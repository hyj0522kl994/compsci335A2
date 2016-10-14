
//dropdown functionS
function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		    var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
	    }
	}
}

function homepage() {
    var content = "<img src=robot.jpg></img><a onclick=homepage()>Home</a><p>Department of Computer Science main page</p>"+
                            "<a onclick=getcourse()>Courses</a><p>This page lists course offerings for the current academic year</p>"+
                            "<a onclick=getPeople()> People</a>"+
							"<p>This is a list of staff at the Department</p>"+
							"<a onclick=getnews()>News</a>"+
							"<p>This is the current news feed</p>"+
							"<a onclick=getnotice()>Notices</a>"+
							"<p>This is the current notices feed</p>"+
							"<a onclick=getGuestbook()>Guest Book</a>"+
							"<p>This is where guest comments can be entered into</p>";
     document.getElementById("home").innerHTML=content;
}
//calling course page
function showcourse(courses){
    var con = "<h1>Our Courses</h1><a style = font-style:italic>This page lists course offerings for the current academic year.</a>";
    for (var i = 0; i < courses.length; ++i) {
         var record = courses[i]; 
         con += "<h2>"+record.subject.courseA+"</h2><h>"+record.subject.points+"</h><p>"+record.title+"</p>";
         console.log(record.description);
         if (typeof(record.description) !="undefined"){
             con += "<p>"+record.description+"</p>";
         }if (typeof(record.prerequisite) !="undefined"){
             con +="<p>"+record.prerequisite+"</p>";
         }if (typeof(record.restriction) !="undefined"){
             con +="<p>"+record.restriction+"</p>";
         }
         document.getElementById("home").innerHTML = con;
    } 
}

function getcourse(){
    var xhr = new XMLHttpRequest();
    var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses"; 
    xhr.open("GET", url, true); 
    xhr.onload = function () { 
        var result2 = JSON.parse(xhr.responseText);
             showcourse(result2.courses.coursePaperSection);
        } 
        xhr.send(null); 
}

//calling people
function showpeople(dest) {
    var tableContent = "<h1 style = font-family:sans-serif;> Computer Science Staff</h1>\n<p style=font-style:italic;>Durs is a large and diverse department. Most staff members have their offices in Science Centre Building 303, but there is also a branch of the department in Building 810, Short Street.</p><table border=0><tr class='stafflist'>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i]; 
        if (i & 1 == 1) { // odd row 
            tableContent += "<tr class='orderOdd'>"; 
        } else { // even row 
            tableContent += "<tr class='orderEven'>"; 
        } 
        var nametitle= record.names+"<br>"+record.jobtitles;
        //image address
        if (typeof(record.imageId) != "undefined"){
            imageaddr="https://unidirectory.auckland.ac.nz/people/imageraw/"+record.profileUrl[1]+"/"+record.imageId+"/small";
        }else{
            imageaddr="https://unidirectory.auckland.ac.nz/people/imageraw/"+record.profileUrl[1]+"/0000000/small";
        } 
        var vcardaddr="https://unidirectory.auckland.ac.nz/people/vcard/"+record.profileUrl[1];
        var emailaddr= record.emailAddresses;  
        var Pnumber= getStaff(record.profileUrl[1]);
        tableContent += "<tr class='list'><td><img src ="+imageaddr+" width = 100%></img></td><td ><h style=color:white;>"+nametitle+"</h></td><td ><a href="+vcardaddr+"> &#x1F464 </a><a href= mailto:"+emailaddr+">&#128231</a> <a id=phone href=tel:"+Pnumber+">&#128241</a></td></tr>";
        if (i == (dest.length-1)){
            tableContent += "</table>";
        }
    }
        document.getElementById("home").innerHTML = tableContent;
    
}

function getPeople() { 

    var xhr = new XMLHttpRequest();
    var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people"; 
    xhr.open("GET", url, true); 
    xhr.onload = function () { 
        var result2 = JSON.parse(xhr.responseText);
             showpeople(result2.list);
        } 
        xhr.send(null); 
}
    
function getStaff(upi){
    var xhrr = new XMLHttpRequest();
    var url2 = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/person?u="+upi;

    xhrr.open("GET",url2,true);
    xhrr.onload = function () {
        var Result1 = JSON.parse(xhrr.responseText);
          return Result1.phoneNumbers[0].phone;

    }   
    xhrr.send();  

}

 //calling news page
function shownews(news){
    var con ="<br><a style =font-style:italic;>Our News  </br>Keep up to date with the latest news at the Department of Computer Science.</a>";
    var n = news.getElementsByTagName("RSSItem");
    for (var i = 0; i < n.length; ++i) {
         var record = n[i]; 
         con += "<h2>"+record.getElementsByTagName("titleField")[0].childNodes[0].nodeValue+"</h2>"
         con += "<p>"+record.getElementsByTagName("pubDateField")[0].childNodes[0].nodeValue+"</p>";
         con += "<p>"+record.getElementsByTagName("descriptionField")[0].childNodes[0].nodeValue+"</p>";
         document.getElementById("home").innerHTML = con;
    }   
}

function getnews(){
    var xhr = new XMLHttpRequest();
    var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/news"; 
    xhr.open("GET", url, true); 
    xhr.onload = function () { 
             shownews(xhr.responseXML);
        } 
        xhr.send(null); 
}


 //calling notice page
function shownotice(notice){
    var con ="<br><a style =font-style:italic;>Our Notices</br>Keep up to date with class changes.</a>";
    var n = notice.getElementsByTagName("RSSItem");
    for (var i = 0; i < n.length; ++i) {
         var record = n[i]; 
         con += "<h2>"+record.getElementsByTagName("titleField")[0].childNodes[0].nodeValue+"</h2>"
         con += "<p>"+record.getElementsByTagName("pubDateField")[0].childNodes[0].nodeValue+"</p>";
         con += "<p>"+record.getElementsByTagName("descriptionField")[0].childNodes[0].nodeValue+"</p>";
         document.getElementById("home").innerHTML = con;
    }   
}

function getnotice(){
    var xhr = new XMLHttpRequest();
    var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/notices"; 
    xhr.open("GET", url, true); 
    xhr.onload = function () { 
             shownotice(xhr.responseXML);
        } 
        xhr.send(null); 
}


function getGuestbook(){
           var con ="<h1 style=color:white;>Guest Book</h1><div class=guest><form id=comform ><label for=usrcom>Comment</label><input type=text id=usrcom name=com></form>"+
                "<label for =name>Name </label><input type=text id=usrname name=uname>"+
                "<input type=submit value=Submit onclick=getcomments()></form></div>";
           con +="<h2 style=color:white;>Comments</h2><div class = commentbox>";
          var xhr = new XMLHttpRequest();
          var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments"; 
          xhr.open("GET", url, true); 
          xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
          xhr.onload = function () { 
              var com=document.getElementById("home");
              con += xhr.responseText;
              com.innerHTML = con;
          } 
          xhr.send(null);

}

function getcomments(){
        var xhr = new XMLHttpRequest();
        var usr = document.getElementById("usrname").value;
        var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name="+usr; 
        xhr.open("POST", url, true); 
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        var com = document.getElementById("usrcom").value;
        xhr.send(JSON.stringify(com));

        window.setInterval(guestbook(),4000);
}

function guestbook(){
    document.getElementById("home").innerHTML=getGuestbook();
}