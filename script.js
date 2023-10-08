document.getElementsByTagName('body')[0].onload = e => {

  const passwordInput = document.getElementById('password');
  const length = document.getElementById('length');
  const generateButton = document.getElementById('generateButton');
  const copyButton = document.getElementById('copyButton');

  Number.prototype.between = function(min, max){
    if(Array.isArray(min)){
      for(let i=0;i<arguments.length;i++){
        let [min, max] = arguments[i];
        if(this.between(min, max))
          return true;
      }
      return false;
    }
    return this.valueOf() > min && this.valueOf() < max;
  };

  generateButton.onclick = e => {
    let password = '';
    for(let i=0;i<length.value;i++){
      let char;
      do {
        char = Math.floor(Math.random() * 128);
      }while(!char.between([47, 58], [64, 91], [96, 123]));
      password += String.fromCharCode(char);
    }
    passwordInput.value = password;
  };

  length.onblur = e => {
    if(e.target.value < 8)
      e.target.value = 8;
  };

  copyButton.onclick = e => {
    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText('test');
  }

};