# HiddenShop 🛍️

HiddenShop est une plateforme e-commerce moderne offrant une expérience d'achat en ligne intuitive et sécurisée.

## Fonctionnalités

### Gestion des utilisateurs
- Inscription avec validation des champs
- Connexion 
- Profil utilisateur personnalisable
- Historique des commandes
- Gestion des adresses de livraison

### Panier et commandes
- Ajout/Suppression de produits
- Modification des quantités
- Calcul automatique des totaux
- Processus de commande en plusieurs étapes
- Confirmation de commande par email

### Recherche et filtrage
- Barre de recherche en temps réel
- Filtrage par catégories
- Filtrage par prix
- Tri par popularité, prix, nouveauté
- Affichage des produits en vedette

### Interface responsive
- Design adaptatif pour mobile et desktop
- Navigation intuitive
- Animations fluides
- Thème sombre/clair

## Technologies utilisées

### Frontend
- HTML5
- CSS3 (avec animations et transitions)
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome pour les icônes

### Stockage
- LocalStorage pour la persistance des données
- SessionStorage pour les données temporaires

##  Limitations actuelles

### Backend
- Le projet est actuellement sans backend
- Les données sont stockées localement dans le navigateur
- Pas de base de données persistante
- Pas d'API REST

### Authentification
- Système d'authentification simulé
- Pas de vraie vérification des identifiants
- Pas de hachage des mots de passe

### Paiement
- Simulation du processus de paiement
- Pas d'intégration avec des passerelles de paiement réelles
- Pas de traitement sécurisé des transactions

## Installation

1. Clonez le dépôt :```bash
git clone https://github.com/Y-black/HiddenShop.git```

2. Ouvrez le projet dans votre éditeur de code préféré

3. Lancez le projet avec un serveur local (par exemple avec Live Server sur VS Code)

##  Structure du projet

```
HiddenShop/
├── css/
│   └── style.css
├── js/
│   ├── auth.js
│   └── products.js
├── images/
│   └── [images du projet]
├── index.html
├── inscription.html
├── connexion.html
├── produits.html
├── categories.html
├── profil.html
├── historique-commandes.html
└── README.md
```

##  Sécurité

### Points à améliorer
- Implémentation d'un backend sécurisé
- Intégration d'une vraie base de données
- Mise en place d'une authentification robuste
- Sécurisation des paiements
- Protection contre les attaques XSS et CSRF

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Auteur

- **Younouss Koly KANTE**
  - Email: younousskoly01@gmail.com
  - GitHub: [Y-black](https://github.com/Y-black)

## Remerciements

- Bootstrap pour le framework CSS
- Font Awesome pour les icônes
- La communauté open source pour les ressources et l'inspiration 

