"use strict";

const tableau = require("./tableaux.js");

console.log(tableau.tabVille);
console.log(tableau.tabDomaine);

const maxVille = tableau.tabVille.length
const maxDomaine = tableau.tabDomaine.length
const peupler = () => {
	console.log('ok')
	let position = Math.floor(Math.random()*maxVille)
	let ville = tableau.tabVille[position]
	position = Math.floor(Math.random()*maxDomaine)
	let domaine = tableau.tabDomaine[position]

	return {
			domaine : domaine,
			ville : ville
			}
}


module.exports = peupler