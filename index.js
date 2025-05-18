console.log("js loaded!");

var search_term="";
var definition="";
var meaning="";

document.getElementById("search-click").addEventListener("click",()=>{
    const query=document.getElementById("search-term").value;
    console.log("search term:",query);
    search_term=query;

    if (!query.trim()) {
            alert("Please enter a word");
            return;
        }
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then(res=>{
        if(!res.ok) throw new Error("Network response Not OK");
        return res.json();
    })
    .then(data=>{
        console.log("data:",data);
        // console.log(data.)
        meaning=data[0].meanings[0].definitions[0].definition;
        console.log("meaning:",meaning);
        WriteDefinition()
    })
    .catch(error => {
            console.error("Fetch error:", error);
        });

});

function WriteDefinition()
{
    if(search_term && meaning)
    {
        var proper_meaning=`Meaning:${meaning}`
        document.getElementById("def").innerText=proper_meaning;
    }
}


