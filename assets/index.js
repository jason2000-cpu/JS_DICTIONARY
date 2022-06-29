const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list span"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
  phonetic = wrapper.querySelector(".details span");
  searchWord = wrapper.querySelector(".details p");

let exampleEl = document.querySelector(".example span");
let meaningEl = document.querySelector(".meaning span");
let audio;
let data;

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
   fetch(url)
    .then((res) => res.json())
    .then((jsonData) =>{
      //all definitions fetched are saved to this meanings variable
       let meanings = jsonData[0].meanings[0].definitions
        searchWord.innerText = jsonData[0].word;
        phonetic.innerText = jsonData[0].phonetics[0].text;
         
      //the first definition fetched is saved to this variable "output"
         let output = meanings[0].definition;
         meaningEl.innerText = output;

      //the audio url is take from the fetched data and saved to a variable "audio"
        audio = new Audio(jsonData[0].phonetics[0].audio)

      //when the  speaker icon is clicked the audio plays
        volume.addEventListener('click', ()=>{audio.play()})

      //to get synonyms
       let synonymArr = jsonData[0].meanings[0].definitions[0].synonyms;

      console.log(synonymArr)
       if(synonymArr.length === 0){
        // spanNode = document.createElement("span")
        // synonyms.appendChild(spanNode)
         synonyms.innerHTML = `<p>Oops!! No synonym for the word ${jsonData[0].word}</p>` 
       }else{
        synonymArr.forEach(element => {
          synonyms.innerHTML = `<li>${element}</li>`
          console.log(synonyms)
        });
       }
      let fetchedExample = jsonData[0].meanings[0].definitions[0].example;
      console.log(fetchedExample)
      if(fetchedExample !== undefined){
        exampleEl.innerText = fetchedExample;
        console.log(fetchedExample)

      }else{
        exampleEl.innerText = `Oops!! No example for the word ${jsonData[0].word}`;
      
      }
       
      console.log()
    
    })
}

//To initiate the search process
searchInput.addEventListener('keydown', (e)=>{
  if(e.keyCode === 13){
    console.log(searchInput.value)
    fetchApi(searchInput.value);
    wrapper.classList.add('active')
  }
})
