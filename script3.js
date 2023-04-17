function wikiAPI(){
var searchTerm = document.getElementById('searchTerm').Value;
var connect= new XMLHttpRequest();
var url="https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch="+ searchTerm;
connect.open('GET', url);
connect.onload=function(){
    var wikiobject=JSON.parse(this.resonse);
    var pages=wikiobject.query.pages;
    for (var i in pages){
    }
}
connect.send();
