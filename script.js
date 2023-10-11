document.getElementsByTagName('body')[0].onload = e => {

  const passwordInput = document.getElementById('password');
  const length = document.getElementById('length');
  const generateButton = document.getElementById('generateButton');
  const copyButton = document.getElementById('copyButton');
  const checkBoxAlphabetOnly = document.getElementById('checkBoxAlphabetOnly');
  const checkBoxInsertBasicSymbol = document.getElementById('checkBoxInsertBasicSymbol');
  const copiedAlert = document.getElementById('copiedAlert');

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
    const include = [[47, 58], [64, 91], [96, 123]];

    if(checkBoxAlphabetOnly.checked)
      include.shift();

    if(checkBoxInsertBasicSymbol.checked){
      include.push(
        [32, 48],
        [57, 65],
        [90, 97],
        [122, 127]
      );
    }

    for(let i=0;i<length.value;i++){
      let char;
      do {
        char = Math.floor(Math.random() * 128);
      }while(!char.between(include));
      password += String.fromCharCode(char);
    }
    passwordInput.value = password;
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

};