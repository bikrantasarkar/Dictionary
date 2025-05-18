console.log("js loaded!");
function getDictionaryWord()
{
    const query=document.getElementById("search-term").value;
    console.log("search term:",query);

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
        ProcessData(data)
        
    })
    .catch(error => {
            console.error("Fetch error:", error);
        });
}


function WriteDefinition()
{
        var proper_meaning=`Meaning:${meaning}`
        document.getElementById("def").innerText=proper_meaning;
}

function ProcessData(data)
{
    meaning=data[0].meanings[0].definitions[0].definition;
    console.log("meaning:",meaning);
    if(meaning)
    WriteDefinition()
}

function handleSearch()
{
    getDictionaryWord();
}

document.getElementById("search-click").addEventListener("click",()=>{
    andleSearch();

});


