function renovationXML() 
{
    var renXml = new XMLHttpRequest();
  
    console.log(renXml.readyState);
  
    renXml.onreadystatechange = function () 
    {
      console.log(renXml.readyState);
      if (this.readyState == 4 && this.status == 200) 
      {
        // document.getElementById('customer_info').innerHTML = this.responseText;
        cusinfo(this);
        // console.log(renXml.readyState);
      }
    };
  
    renXml.open("GET", "NewFile.xml", "TRUE");
  
    renXml.send();
}
  
var xmlDoc;
var table;
var x;

function cusinfo(info)
{
  var i;
  xmlDoc = info.responseXML;
  // console.log(xmlDoc);
  displayTable(xmlDoc);
}
function displayTable(xmlDoc) 
{
  table = `<thead>
    <tr bgcolor="red" align="center" cellpadding="5px">
      <th>Question ID</th>
      <th>Question Text</th>
      <th>Upvotes</th>
      <th>Downvotes</th>
    </tr>
</thead>`;

  x = xmlDoc.getElementsByTagName("Questions");

  for (i = 0; i < x.length; i++) 
  {
    table +=
      "<tr><td>" +
      x[i].getElementsByTagName("qid")[0].childNodes[0].nodeValue +
      "</td><td data-label='Date'>" +
      x[i].getElementsByTagName("qtext")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("qupvote")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("qdownvote")[0].childNodes[0].nodeValue +
      "</td><td>" +
      "<button onclick='removecus()'> remove </button></td></tr>";
  }
  document.getElementById("Leave_info").innerHTML = table;
}

function removeNodeElement() 
{
  var i;

  for (i = 0; i < x.length; i++) 
  {
    a = xmlDoc.getElementsByTagName("Questions")[i].getElementsByTagName("qid")[0];
    b = a.childNodes[0];
    a.removeChild(b);
  }
  console.log(xmlDoc);
  table = `<thead>
  <tr>
    <th>Question Text</th>
    <th>Upvotes</th>
    <th>Downvotes</th>
  </tr>
  </thead>`;
  var some = xmlDoc;
  x = xmlDoc.getElementsByTagName("Questions");

  for (i = 0; i < x.length; i++) 
  {
    table +=
    "<tr><td>" +
    x[i].getElementsByTagName("qtext")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("qupvote")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("qdownvote")[0].childNodes[0].nodeValue +
    "</td><td>" +
    "<button onclick='removecus()'> remove </button></td></tr>";
  }
  document.getElementById("Leave_info").innerHTML = table;
  alert('The node element  "Question ID" has been removed!');

  
}

function changeNodeValue() 
{
  var j;
  for (j = 0; j < x.length; j++) 
  {
    xmlDoc
      .getElementsByTagName("Questions")
      [j].getElementsByTagName("qdownvote")[0].childNodes[0].nodeValue="00";
  }
  console.log(xmlDoc);
  alert("The Dislike Count will be reset to 0!");
  displayTable(xmlDoc);
}

function addNewElement() 
{
  var i;
  newEle = xmlDoc.createElement("New_Info");
  newText = xmlDoc.createTextNode("Pending");
  newEle.appendChild(newText);
  xmlDoc.getElementsByTagName("Questions")[0].appendChild(newEle);
  console.log(xmlDoc);
  alert('The new node element "other info" has been added to the second node!');
  var table = `<thead>
    <tr>
      <th>Question ID</th>
      <th>Question Text</th>
      <th>Upvotes</th>
      <th>Downvotes</th>
      <th>NEW ELEMENT</th>
    </tr>
    </thead>`;

  x = xmlDoc.getElementsByTagName("Questions");

  for (i = 0; i < x.length; i++) 
  {
    table +=
      "<tr><td>" +x[i].getElementsByTagName("qid")[0].childNodes[0].nodeValue +
      x[i].getElementsByTagName("qtext")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("qupvote")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("qdownvote")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[0].getElementsByTagName("New_Info")[0].childNodes[0].nodeValue +
      "<button onclick='removecus()'> remove </button></td></tr>";
  }
  document.getElementById("Leave_info").innerHTML = table;
}

function removecus() 
{
  // console.log(xmlDoc.getElementsByTagName('customer')[0]);
  // var x = xmlDoc.getElementsByTagName("customer")[0];

  var index,
    table = document.getElementById("Leave_info");

  for (var i = 0; i < table.rows.length; i++) 
  {
    table.rows[i].onclick = function () 
    {
      index = this.rowIndex;
      x = xmlDoc.getElementsByTagName("Questions")[index - 1];
      xmlDoc.documentElement.removeChild(x);
      console.log(xmlDoc);
      displayTable(xmlDoc);
    };
  }
  alert("Question has been removed!");
}