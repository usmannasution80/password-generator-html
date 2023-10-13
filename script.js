document.getElementsByTagName('body')[0].onload = e => {

  const passwordInput = document.getElementById('password');
  const length = document.getElementById('length');
  const generateButton = document.getElementById('generateButton');
  const copyButton = document.getElementById('copyButton');
  const checkBoxNoNumeric = document.getElementById('checkBoxNoNumeric');
  const checkBoxBasicSymbols = document.getElementById('checkBoxBasicSymbols');
  const copiedAlert = document.getElementById('copiedAlert');
  const checkBoxHiragana = document.getElementById('checkBoxHiragana');

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
    let max = 128;
    const include = [[47, 58], [64, 91], [96, 123]];

    if(checkBoxNoNumeric.checked)
      include.shift();

    if(checkBoxBasicSymbols.checked){
      include.push(
        [32, 48],
        [57, 65],
        [90, 97],
        [122, 127]
      );
    }
    if(checkBoxHiragana.checked){
      include.push(
        [12352, 12439]
      );
      max = 12438;
    }

    for(let i=0;i<length.value;i++){
      let char;
      do {
        char = Math.floor(Math.random() * (max + 1));
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