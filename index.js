console.log("js loaded!");

function showMakeSentence()
{
    const makeSentence=document.getElementById('makeSentence');
    makeSentence.style.display="block";
}

function hideMakeSentence()
{
    const makeSentence=document.getElementById('makeSentence');
    makeSentence.style.display="none";
}
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
        ProcessData(data);
        
    })
    .catch(error => {
            console.error("Fetch error:", error);
        });
}


function ProcessData(data)
{
    var definitionDiv=document.querySelector('.definitions');
    var word=null,phonetic=null;
    if(data && data[0])
    {
        if(data[0].word)
        {
            word=data[0].word;
            const wordElement = document.createElement("p");
            wordElement.textContent=word;
            console.log("wordElement.textContent:",wordElement.textContent);
            definitionDiv.appendChild(wordElement);
        }

        if(data[0].phonetic)
        {
            phonetic=data[0].phonetic;
            const phoneticElement = document.createElement("p");
            phoneticElement.textContent=phonetic;
            console.log("phoneticElement.textContent:",phoneticElement.textContent);
            definitionDiv.appendChild(phoneticElement);
        }
        
        if(data[0].meanings)
        {
            let meanings=data[0].meanings;
            meanings.forEach(meaning => {
                if(meaning.partOfSpeech)
                {
                    const partsofspeechElement = document.createElement("p");
                    partsofspeechElement.textContent=meaning.partOfSpeech;
                    console.log("partsofspeechElement.textContent:",partsofspeechElement.textContent);
                    definitionDiv.appendChild(partsofspeechElement);
                }
                if(meaning.definitions)
                {
                    console.log("meaning.definitions",meaning.definitions);
                    let definitions=meaning.definitions;
                    definitions.forEach((definition,index)=>{
                        const definitionElement = document.createElement("p");
                        definitionElement.textContent=`${index+1}. ${definition.definition} `;
                        console.log("definitionElement.textContent:",definitionElement.textContent);
                        definitionDiv.appendChild(definitionElement);
                    });
                }
            });
        }
    }
    if(word)
    {
        showMakeSentence();
    }
}

function handleSearch()
{
    getDictionaryWord();
}

document.getElementById("search-click").addEventListener("click",()=>{
    handleSearch();
});


