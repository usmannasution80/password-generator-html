document.getElementsByTagName('body')[0].onload = e => {

  const baseWordContainer = document.getElementById('baseWordContainer');
  const baseWordInput = document.getElementById('baseWord');
  const passwordInput = document.getElementById('password');
  const length = document.getElementById('length');
  const generateButton = document.getElementById('generateButton');
  const copyButton = document.getElementById('copyButton');
  const checkBoxNoNumeric = document.getElementById('checkBoxNoNumeric');
  const checkBoxBasicSymbols = document.getElementById('checkBoxBasicSymbols');
  const copiedAlert = document.getElementById('copiedAlert');
  const checkBoxHiragana = document.getElementById('checkBoxHiragana');
  const checkBoxKatakana = document.getElementById('checkBoxKatakana');
  const checkBoxWordWithInvisibleCharacters = document.getElementById('checkBoxWordWithInvisibleCharacters');
  const notWordWithInvisibleCharacters = document.getElementById('notWordWithInvisibleCharacters');

  Number.prototype.between = function(min, max){
    if(Array.isArray(min)){
      const list = min;
      for(let i=0;i<list.length;i++){
        let [min, max] = list[i];
        if(this.between(min, max))
          return true;
      }
      return false;
    }
    return this.valueOf() > min && this.valueOf() < max;
  };

  generateButton.onclick = e => {

    let password = '';

    if(!checkBoxWordWithInvisibleCharacters.checked){

      let max = 128;
      const chars = [[47, 58], [64, 91], [96, 123]];

      if(checkBoxNoNumeric.checked)
        chars.shift();

      if(checkBoxBasicSymbols.checked){
        chars.push(
          [32, 48],
          [57, 65],
          [90, 97],
          [122, 127]
        );
      }
      if(checkBoxHiragana.checked){
        chars.push(
          [12352, 12439]
        );
        max = 12438;
      }
      if(checkBoxKatakana.checked){
        chars.push(
          [12448, 12539]
        );
        max = 12539;
      }

      for(let i=0;i<length.value;i++){
        let char;
        do {
          char = Math.floor(Math.random() * (max + 1));
        }while(!char.between(chars));
        password += String.fromCharCode(char);
      }
      passwordInput.value = password;
      return;
    }

    for(let i = 1; i <= baseWordInput.value.length; i++){
      let max = length.value - i - password.length;
      if(i !== baseWordInput.length)
        max = Math.floor(Math.random() * max) + 1;
      password += baseWordInput.value.charAt(i-1);
      for(let j = 1; j <= max; j++)
        password += '‎';
    }
    passwordInput.value = password;
    console.log(password);
  };

  length.onblur = e => {
    if(e.target.value < 8)
      e.target.value = 8;
  };

  copyButton.onclick = e => {
    copiedAlert.style.display = 'none';
    setTimeout(() => copiedAlert.style.display = 'inline', 300);
    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordInput.value);
  }

  checkBoxWordWithInvisibleCharacters.onchange = e => {
    notWordWithInvisibleCharacters.style.display = e.target.checked ? 'none' : 'block';
    baseWordContainer.style.display = e.target.checked ? 'block' : 'none';
  };

};