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


function WriteDefinition(updated_text)
{
    document.getElementById("definition").innerText=updated_text;
}

function ProcessData(data)
{
    var all_meanings="";
    var word=null,phonetic=null;
    if(data && data[0])
    {
        if(data[0].word)
        {
             word=data[0].word;
        }
        if(data[0].phonetic)
        {
            phonetic=data[0].phonetic;
        }
        
        if(data[0].meanings)
        {
            let meanings=data[0].meanings;
            meanings.forEach(meaning => {
                if(meaning.partOfSpeech)
                {
                    all_meanings=all_meanings+`${meaning.partOfSpeech} \n`;
                }
                if(meaning.definitions)
                {
                    console.log(meaning.definitions);
                    let definitions=meaning.definitions;
                    definitions.forEach((definition,index)=>{
                        all_meanings=all_meanings+`${index}. ${definition.definition} \n`;
                    });
                }
                   

            });
        }
    }
    
    var final_text=`Word:${word}\n Phonetic:${phonetic} \n`+all_meanings;
    WriteDefinition(final_text);

}

function handleSearch()
{
    getDictionaryWord();
}

document.getElementById("search-click").addEventListener("click",()=>{
    handleSearch();
});


