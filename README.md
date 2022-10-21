*Texte en italique*
_Texte en italique_
**Texte en gras**
__Texte en gras__
***Texte en italique et en gras***
___Texte en italique et en gras___

# Projet application monolithique e-commerce

## Le projet

### Le commencement

Ce projet est une application d'e-commerce réalisée depuis une base qui contenait le style (CSS) ainsi que la page d'accueil et les partials. C'est un projet que j'ai décidé de continuer seule en parallèle de la formation que je suis. 
L'objectif a été de consolider mes connaissances sur les langages et frameworks utilisés, avant de commencer à travailler sur le concept d'API qui sépare distinctement le back du front. L'accent n'a pas été mis sur la partie visuelle du site, mais sur la partie technique.

### Uilité 

Cette application permet de vendre des produits de tous types sur internet. 
Elle met a disposition un script permettant la création des tables nécessaires à la base de donnée ansi qu'un script comprenant des données tests.
Concernant l'utilisation client, depuis le site, vous pourrez créer des comptes, ajouter/modifier des informations sur votre profil, créer un panier et y ajouter des produits, et passer une commande, qui sera enregistrée automatiquement dans le base de donnée, et ainsi, accéder à l'historique des commandes.
Concernant l'utilisation admnistrateur, le site leur permet d'ajouter, modifier et supprimer des produits, des catégories et des taux TVA. 
Ce qui n'est pas mis en place: le systeme de paiement,

### Utilisation

Pour utiliser cette source, après l'avoir cloné sur votre machine, nous devrez télécharger et installer `NodeJS` et `SQL`. 
La connaissance des langages `javascript` et `sql` est nécessaire.
Pour commencer, initier l'application avec `npm init`
Les frameworks et packages utilisés, et qu'il vous faudra installer sont les suivants: `npm i` + nom du package:
        - `express`
        - `express-session`
        - `ejs`
        - `dotenv`
        - `bcrypt`
        - `sequelize`
        - `email-validator`
        - `pg`
Vous pouvez également utiliser le racourcis `npm i` qui installera toutes les dépendances.
Vous trouverez dans le script `IMPORT-TABLES` un paragraphe vous permettant la création de votre BDD.
Il vous faudra créer ensuite un fichier .env qui comprendra le port utilisé, le phrase secrete des sessions ainsi que l'URL permettant la connexion à votre base de donnée. Pour cela, le fichier .env.example vous servira d'exemple. 




### Les limites


- description de l'application
- Quels langages et frameworks
- Prérequis
- but de l'exercice progresser css & nodeJS
- apres avoir cloner le projet ou télécharger les sources, télécharger & installer nodejs & postgres sur la machine.
- Créez la base de donnée en utilisant du script fournis. Donnez la notice sur cmt inserer les données
- TODO >> mettre en commentaire dans script sql comment creer une BDD 
- prérequis de la machine >> nodejs postgres
- >> séparer les scripts table & datas

Aller plus loin >>>