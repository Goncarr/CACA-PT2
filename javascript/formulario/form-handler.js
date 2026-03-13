const nomeEl = document.getElementById("nome");
const mensagemEl = document.getElementById("mensagem");
const emailEl = document.getElementById("email");
const falhaEL = document.querySelector(".envio-erro");
const sucessoEL = document.querySelector(".envio-sucesso");

/**
 * 
 * @param {*} ms 
 * @returns 
 */
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Verifica se o email está num formato valido
 * @param {email a ser validado} email 
 * @returns None
 */
function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

/**
 *Verifica se os parametros do nome, email e mensagem correspondem ao o que pedem
 */
async function sendEmail(){
    if (nomeEl.value == ""){
        falhaEL.textContent = "Erro: Nome inválido";
        falhaEL.style.display= "flex";
        await sleep(3000)
        falhaEL.style.display= "none";
    }
    else if (emailEl.value == "" || !validateEmail(emailEl.value)){
        falhaEL.textContent = "Erro: Email vazio ou inválido";
        falhaEL.style.display= "flex";
        await sleep(3000)
        falhaEL.style.display= "none";
    }
    else if (mensagemEl.value == ""){
        falhaEL.textContent = "Erro: Mensagem vazia";
        falhaEL.style.display= "flex";
        await sleep(3000)
        falhaEL.style.display= "none";
    }
    else{
        sucessoEL.style.display= "flex";
        await sleep(3000)
        sucessoEL.style.display= "none";
    }
}