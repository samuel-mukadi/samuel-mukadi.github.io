// Les avis en direct : ils sont rangés dans la base Firestore du projet Firebase de Samuel.
// Les deux valeurs viennent de la console Firebase :
//   Paramètres du projet (roue dentée) > Général > Vos applications > application Web.
//
// La « clé » (apiKey) de Firebase n'est PAS un mot de passe : elle est faite pour être
// visible dans le site, elle sert seulement à dire « c'est le projet de Samuel ».
// La protection vient des règles : firebase/firestore.rules.
//
// Tant que « projet » est vide, la section Avis marche comme avant (avis par WhatsApp).

export const firebase = {
  projet: 'samuel-avis-feefd', // l'ID du projet (projectId)
  cle: 'AIzaSyCbpISZxQO6oAUH1x-s03CTF4vVnnr-bU8', // la clé de l'application web « portfolio » (apiKey)
};
