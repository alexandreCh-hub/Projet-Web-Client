const form = document.querySelector("form");

var nom = document.getElementById("lastname");
var prenom = document.getElementById("firstname");
var date = document.getElementById("birthdate");
var user = document.getElementById("username");
var password = document.getElementById("userpwd");
var mail = document.getElementById("useremail");

nom.regExp = /^[a-zA-Z-]+$/;
prenom.regExp = /^[a-zA-Z-]+$/;
user.regExp = /^[a-zA-Z0-9_-]{6,}$/;
mail.regExp = /^[A-Za-z0-9-_.]{1,64}@[A-Za-z.]{2,}\.[a-z]{2,6}$/;
password.regExp = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}/;
date.regExp = /^\d{2}\/\d{2}\/\d{4}$/;

nom.addEventListener("change", verif);
prenom.addEventListener("change", verif);
date.addEventListener("change", verifDate);
user.addEventListener("change", verif);
password.addEventListener("change", verif);
mail.addEventListener("change", verif);

const button = document.getElementById("submit");

//rend le bouton cliquable ou non
form.addEventListener('input', () => {
	if (form.checkValidity() && verifForm()) {
		button.disabled = false;
		button.style.cursor = "pointer";
	} else {
		button.disabled = true;
	}
});

//fonction pour verifier toutes les informations sauf la date
function verif() {
	if (!this.regExp.test(this.value)) {
		this.style.border = "3px solid red";
		return false;
	} else {
		this.style.border = "3px solid green";
		return true;
	}
}

//fonction speciale pour la date (gestion d'annee bissextile, mois à 30 jours)
function verifDate() {
	var valid = true;
	if (!this.regExp.test(this.value)) {
		valid = false;
	} else {
		var result = /[0-9]+/g[Symbol.match](this.value);
		var jour = result[0];
		var mois = result[1];
		var ans = result[2]
		var date = new Date(ans, mois, jour);

		//jour ou mois invalide
		if (jour > 31 || mois > 12) {
			valid = false;
		}

		//Mois à 30 jours
		if ((mois == 4 || mois == 6 || mois == 9 || date.getMonth() == 11) && jour > 30) {
			valid = false;
		}

		//fevrier année non-bissextile
		if (mois == 2 && jour > 28 && ans % 4 != 0) {
			valid = false;
		}

		//fevrier année bissextile
		if (mois == 2 && jour > 29 && ans % 4 == 0) {
			valid = false;
		}

		//Date postérieure à la date actuelle
		if (Date.now() - date < 0) {
			valid = false;
		}
	}
	if (valid == true) {
		this.style.border = "3px solid green";
	} else {
		this.style.border = "3px solid red";
	}
}

//verifie si toutes les données sont valides pour etre envoyées
function verifForm() {
	return nom.regExp.test(nom.value) && prenom.regExp.test(prenom.value) && user.regExp.test(user.value) && (date.regExp.test(date.value) || date.value.trim() == "") && mail.regExp.test(mail.value) && password.regExp.test(password.value);
}

//creer les variables pour gerer l'envoi de données au serveur
const XHR = new XMLHttpRequest();

//Gere l'envoie des informations au serveur
form.addEventListener("submit", function (event) {
	//envoie les données si le formulaire est valide
	if (verifForm()) {
		event.preventDefault();
		let formdata = new FormData();
		//ouvre la connexion
		XHR.open("POST", "../htbin/register.py", true);
		//met en forme les données
		formdata.append("lastname", nom.value);
		formdata.append("firstname", prenom.value);
		formdata.append("username", user.value);
		formdata.append("birthdate", date.value);
		formdata.append("userpwd", password.value);
		formdata.append("useremail", mail.value);
		//envoie les données
		XHR.send(formdata);
		setTimeout(function () {
			window.location.href = "../index.html";
		}, 1500);
	}
});
