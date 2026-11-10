// Le « messager » Web3Forms : il m'envoie un e-mail sur mon Gmail (donc une notification
// sur mon téléphone) à chaque nouvel avis en attente, avec un lien direct vers l'avis.
//
// La clé vient de web3forms.com : on tape son adresse e-mail, la clé (Access Key) arrive
// par e-mail. Comme celle de Firebase, cette clé est faite pour être visible dans le site :
// elle dit seulement « envoie à l'e-mail de Samuel ». Elle ne donne accès à rien d'autre.
//
// Tant que « cle » est vide, rien n'est envoyé : les avis attendent quand même dans Firebase.

export const web3forms = {
  cle: '6911bd42-66d6-4736-bef4-d95aadcc4501', // l'Access Key reçue de web3forms.com
};
