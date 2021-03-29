 const getRandomText = async(whitespaceChar) =>{
  const wordsN = 1000
   //eh o primeiro
  const isUndefined =  localStorage.randomText == undefined || localStorage.randomTextP == undefined || localStorage.wordlist == undefined
  // update e gera
  // ta no final
  const isTextEnding = isUndefined || localStorage.randomText.length - parseInt(localStorage.randomTextP) < 300
  // gera
  // a lingua mudo
  const settingsLang = localStorage.language ?? 'en'
  const WWLang = localStorage.wordlistlang ?? 'en'
  const TXTLang = localStorage.textlang ?? 'en'
  const isWLLanguageDifferent = WWLang !== settingsLang
  const isTXTLanguageDifferent = TXTLang !== settingsLang

  // -----------------------------------------------------------------
  // console.log('isundefined',isUndefined)
  // console.log('isTextEnding:',isTextEnding)
  // console.log('isWLLanguageDifferent:',isWLLanguageDifferent)
  // console.log('isTXTLanguageDifferent:',isTXTLanguageDifferent)
  // -----------------------------------------------------------------

     

   
  //  pegar uma lista nova na api
  if(isUndefined||isWLLanguageDifferent){
    console.log('list is stale')
    // se o update falhar
    if(!await updateList()){
      console.log('update returned 404 fail signal')
      return
    }
  }

  // gerar novo texto
  if(isTextEnding || isUndefined || isTXTLanguageDifferent)return generateNewText(wordsN,whitespaceChar)
  
  // se tiver tudo ok
  console.log('no changes in the cached text')
  return localStorage.randomText
}


const updateList = async ()=>{
  console.log('updating word list...')
  // pega lista certa na api
  const language = localStorage.language ?? 'en'
  const response = await fetch(`/word-lists/${language}.json`)
  if(response.status>400){
    console.error('erro fetching word list')
    return false
}   
  // salva no cache
  const list = await response.json()
  localStorage.wordlist = JSON.stringify(list)
  localStorage.wordlistlang = list.lang
  
  console.log('word list updated!')
  return(true)
}

const generateNewText = (wordsN,whitespaceChar)=>{
  console.log('generating new random text string...')

  // pega lista
  let {list} = JSON.parse(localStorage.wordlist)
  
  // filtra
  const totalLen = list.length
  console.log('filtering wordlist...')
  list = list.filter(isValid)
  const nWordsRemoved = totalLen - list.length
  console.log(nWordsRemoved, ' words removed.')
  console.log('word list length: ', list.length)

  // gera o texto
  const entrys = list.reduce((a, c) => a + parseInt(c[1]), 0)
  const words = [...new Array(wordsN)]
  .map(()=>getRandonWord(list,Math.floor(Math.random()*entrys)))
  const text = words.join(whitespaceChar)
  
  // salva texto no cache
  localStorage.randomText = text
  localStorage.randomTextP = '0'
  localStorage.textlang = localStorage.wordlistlang

  console.log('new text created and cached"')
  return text
}


const getRandonWord = (list,entry)=>{
  // subtrai a entry atual e se chegar a 0 retorna a palavra atual
  let i = 0
  while(entry>0){
      entry -= list[i][1]
      i++
  }
  return list[i][0]
}

const isValid = (w)=>{
  const defaultFilters = JSON.stringify({
    minLength : 4,
    onlyAplphanumerical:true
  })

  const {minLength,onlyAplphanumerical} = JSON.parse(localStorage.filters ?? defaultFilters) 

  const word = w[0]
  const temAcento = /[^a-zA-Z\d\s:]/.test(word)
  
  if(word.length < minLength) return false
  if (onlyAplphanumerical && temAcento) return false

  return true
  
}

export default getRandomText