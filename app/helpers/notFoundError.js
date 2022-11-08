export default class NotFoundError extends Error {
    
    constructor(message){
        // Constructeur de la classe mère, ici Error
        // On est obligé de le faire quand on étend une autre classe
        super(message);
        // Je surcharge (écrase) la propriété name de l'erreur de base 'Error'
        this.name = 'NotFoundError'
        // J'ajoute une propréété personnalisée qui définit les status qui servira de réponse pour l'utilisateur 
        this.status = 404
    }
};