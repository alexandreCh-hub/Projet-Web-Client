const form = document.querySelector("form");
const button = document.getElementById("submit");

//recupere le pseudo et mdp
var user = document.getElementById("username");
var password = document.getElementById("userpwd");

//l'espace dans lequel la reponse ca etre affiche
var answer = document.getElementById("answer");

//regexp pour vérifier que les informations sont exactes
user.regExp = /^[a-zA-Z0-9_-]{6,}$/;
password.regExp = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}/;

//ajout des evenements pour verifier le changement d'informations
user.addEventListener("change", verif);
password.addEventListener("change", verif);

//affiche une couleur en fonction de l'exactitude des informations
function verif() {
    if (!this.regExp.test(this.value)) {
        this.style.border = "3px solid red";
    } else {
        this.style.border = "3px solid green";
    }
}

//creer les variables pour gerer l'envoi de données au serveur
const XHR = new XMLHttpRequest();
let formdata = new FormData();

//rend le bouton d'envoi cliquable ou pas
form.addEventListener('input', () => {
    if (form.checkValidity() && verifForm()) {
        button.disabled = false;
        button.style.cursor = "pointer";
    } else {
        button.disabled = true;
        button.style.cursor = "default"
    }
});

//verifie la validité du formulaire
function verifForm() {
    return user.regExp.test(user.value) && password.regExp.test(password.value);
}

//Gere l'envoie des informations au serveur
form.addEventListener("submit", function (event) {
    //annule l'action du bouton
    if (verifForm()) {
        //ouvre la connexion
        XHR.open("POST", "../htbin/login.py", true);
        //met en forme les données
        formdata.append('username', user.value);
        formdata.append('userpwd', password.value);
        //envoie les données
        XHR.send(formdata);
        event.preventDefault();
    }
});

//recupere la reponse du serveur
XHR.onreadystatechange = function () {
    if (XHR.readyState == 4) {
        if (XHR.status == 200) {
            answer.innerHTML = XHR.responseText;
        } else {
            answer.innerHTML = "ERROR CODE : " + XHR.status;
        }
        answer.style.display = "block";
    }
}