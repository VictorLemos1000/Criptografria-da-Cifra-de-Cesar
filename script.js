function cifraDeCesar(texto, chaves, cifrar) {
    let resultado = '';
    let chavesArray = chaves.split(',').map(Number); // Converte a string de chaves em um array de números
  
    // Função para cifrar ou descriptografar um único caractere
    function cifrarCaractere(caractere, chave, cifrar) {
      let codigo = caractere.charCodeAt(0);
      let maiuscula = (codigo >= 65 && codigo <= 90);
      let limite = maiuscula ? 65 : 97;
      let novaPosicao;
  
      if (cifrar) {
        novaPosicao = (codigo - limite + chave) % 26;
        if (novaPosicao < 0) novaPosicao += 26;
      } else {
        novaPosicao = (codigo - limite - chave + 26) % 26;
      }
  
      return String.fromCharCode(novaPosicao + limite);
    }
  
    let chaveIndex = 0; // Índice para iterar sobre o array de chaves
  
    for (let i = 0; i < texto.length; i++) {
      let char = texto[i];
  
      if (char.match(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/)) {
        // Cifra ou descriptografa o caractere atual usando a chave correspondente
        resultado += cifrarCaractere(char, chavesArray[chaveIndex], cifrar);
        
        // Incrementa o índice da chave e reseta para 0 se ultrapassar o comprimento do array
        chaveIndex = (chaveIndex + 1) % chavesArray.length;
      } else {
        resultado += char;
        // Se o caractere não for uma letra, reseta o índice da chave
        chaveIndex = 0;
      }
  
      // Se o caractere atual for um espaço, reseta o índice da chave
      if (char === ' ') {
        chaveIndex = 0;
      }
    }
  
    return resultado;
  }
  
  function criptografar() {
    let textoOriginal = document.getElementById("textoOriginal").value;
    let chaves = document.getElementById("chaves").value;
    let textoCifrado = cifraDeCesar(textoOriginal, chaves, true);
    document.getElementById("textoCifrado").value = textoCifrado;
  }
  
  /*
  function descriptografar() {
    let textoCifrado = document.getElementById("textoCifrado").value;
    let chaves = document.getElementById("chaves").value;
    let textoOriginal = cifraDeCesar(textoCifrado, chaves, false);
    document.getElementById("textoOriginal").value = textoOriginal;
  }
  */