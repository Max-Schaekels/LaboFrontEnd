# LaboFrontEnd

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Serveur de développement

Pour démarrer un serveur local de développement, exécutez :

```bash
ng serve
```

Une fois lancé, ouvrez votre navigateur et allez à l’adresse `http://localhost:4200/`. L’application se rechargera automatiquement à chaque modification des fichiers sources.

## Génération de code (Scaffolding)

Angular CLI propose des outils puissants pour générer du code. Pour générer un nouveau composant :

```bash
ng generate component component-name
```

Pour une liste complète des schémas disponibles  (`components`, `directives`, `pipes`, etc.) :

```bash
ng generate --help
```

## Construction du projet

Pour compiler le projet :

```bash
ng build
```

Les fichiers de sortie seront placés dans le dossier `dist/` . Par défaut, le mode production optimise l’application pour de meilleures performances

## Tests unitaires

Pour exécuter les tests unitaires avec [Karma](https://karma-runner.github.io) 

```bash
ng test
```

## Tests end-to-end

Pour exécuter les tests end-to-end (E2E) :

```bash
ng e2e
```

Note : Angular CLI ne fournit pas de framework E2E par défaut, vous pouvez en installer un selon vos besoins.

## Ressources supplémentaires

Pour plus d’informations sur Angular CLI : [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

## ✅ Détails spécifiques du projet — LaboFrontEnd

Ce projet constitue la partie **frontend Angular** d'une application e-commerce développée en TypeScript. Il interagit avec une API REST sécurisée en ASP.NET Core et suit une architecture modulaire claire.

---

### 🎯 Fonctionnalités principales

- 🛍️ **Catalogue produit** :
  - Affichage des produits avec image par défaut.
  - Filtrage dynamique par catégorie.
  - Accès à une **fiche produit détaillée** via `/produit/:id`.

- 🛒 **Panier d’achat** :
  - Gestion locale des articles (ajout, suppression, quantité).
  - Calcul du total HTVA/TVAC.

- 📦 **Commandes** :
  - Formulaire de commande avec résumé.
  - Suivi des commandes pour l'utilisateur connecté.
  - Statuts de commande : *en attente*, *traitée*, *annulée*.

- 👤 **Compte utilisateur** :
  - Connexion, inscription avec formulaire sécurisé.
  - Affichage et édition du profil.
  - Changement de mot de passe → déconnexion automatique.
  - **Historique de commandes** intégré à la page profil.

- 🔐 **Authentification et rôles** :
  - JWT stocké localement avec gestion automatique.
  - Utilisateurs `user` et `admin` différenciés.
  - Protection des routes sensibles avec Guards.

- ⚙️ **Espace Admin** :
  - Gestion des produits (CRUD complet).
  - Consultation et mise à jour des commandes.

- 🌐 **Expérience utilisateur (UI/UX)** :
  - Utilisation de SCSS moderne et responsive.
  - Composant toast pour les notifications.
  - Structure claire et composants réutilisables.

---

### 📁 Structure du projet

```
src/
├── app/
│   ├── auth/                # Connexion / inscription
│   ├── core/                # Services, Guards, Interceptors, Navbar
│   ├── models/              # Interfaces & DTOs
│   ├── pages/               # Pages principales (home, catalogue, admin, etc.)
│   ├── shared/              # Composants partagés (toasts, pipes...)
│   └── app.routes.ts        # Définition des routes
├── assets/                  # Images, icônes
├── styles.scss              # Styles globaux
└── index.html               # Entrée principale
```

---

### 🔧 Dépendances principales

- `@angular/core` (v19+)
- `@angular/router` (navigation)
- `rxjs` (programmation réactive)
- `@angular/forms` (formulaires réactifs)
- `jwt-decode` (décodage JWT)
- `bootstrap` (style de base, optionnel)

---

### 📌 Bonnes pratiques suivies

- Architecture modulaire et scalable.
- Séparation claire des responsabilités (services, modèles, vues).
- Appels API typés avec `HttpClient`.
- Gestion des erreurs centralisée.
- Expérience utilisateur fluide avec feedback visuel.
