function afficherResultat (score, nbreMotsProposes) {
  //on affiche le score de l'utilisateur
  let spanScore = document.querySelector(".zoneScore span")
  let resultat = `${score}/${nbreMotsProposes}`
  spanScore.innerText = resultat
}

function afficherProposition(motAAfficher) {
  let zoneProposition = document.querySelector(".zoneProposition")
  zoneProposition.innerText = motAAfficher
}

function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=partage du score Azertype&body=Salut, je suis ${nom} et
  je viens de réaliser le score ${score} sur le site d'Azertype !`
  location.href = mailto
}

function validerNom(nom) {
  if(nom.length >=2){
    return true
  }
  return false
}

function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9]")
  if(emailRegExp.test(email)) {
    return true
  }
  return false
}

function lancerJeu() {
  let score = 0
  let btnValider = document.getElementById("btnValiderMot")
  let texteJoueur = document.getElementById("inputEcriture")
  let i=0
  let listeProposition = listeMots
  afficherProposition(listeMots[i])

  let listeBtnRadio = document.querySelectorAll(".optionSource input")
  for (let index=0; index<listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      console.log(event.target.value)
      if (event.target.value === "1") {
        listeProposition = listeMots
      } else {
        listeProposition = listePhrases
      }
      i=0
      afficherProposition(listeProposition[i])
    })
  }
  btnValider.addEventListener("click", ()=>{
    console.log(texteJoueur.value)
    if (texteJoueur.value === listeProposition[i]) {
      score++
    } 
    i++
    afficherResultat(score, i)
    texteJoueur.value=""
    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini")
      btnValider.disabled=true
    } else {
      afficherProposition(listeProposition[i])
    }
  })

  let form = document.querySelector("form")
  form.addEventListener("submit", (event) =>{
    event.preventDefault()
    let baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value

    if (validerNom(nom) && validerEmail(email)) {
      let scoreEmail = `${score} / ${i}`
      afficherEmail(nom, email, scoreEmail)
    } else {
      console.log("erreur")
    }
  })

}