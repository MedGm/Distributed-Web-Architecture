# Application de Gestion des Employés - Frontend Angular

Application Full-Stack de gestion des employés développée avec **Angular** et **Spring Boot**.

## Description

Cette application permet de gérer efficacement les employés avec un système complet de CRUD (Create, Read, Update, Delete), sécurisé par authentification JWT.

## Technologies Utilisées

- **Angular 21** - Framework frontend
- **TypeScript** - Langage de programmation
- **RxJS** - Programmation réactive
- **Angular Router** - Navigation et routing
- **Angular HttpClient** - Communication avec l'API REST
- **JWT** - Authentification sécurisée

## Architecture

```
src/app/
├── models/              # Modèles de données (Employee, Auth)
├── services/            # Services (EmployeeService, AuthService)
├── guards/              # Guards de route (AuthGuard)
├── interceptors/        # Intercepteurs HTTP (JwtInterceptor)
├── pages/
│   ├── login/          # Page de connexion
│   └── employees/      # Pages CRUD des employés
│       ├── list/        # Liste des employés
│       ├── add/         # Ajout d'un employé
│       ├── edit/        # Modification d'un employé
│       └── details/     # Détails d'un employé
└── app.config.ts        # Configuration de l'application
```

## Authentification

- **Login** : Connexion avec username/password
- **JWT Storage** : Token stocké dans localStorage
- **AuthGuard** : Protection des routes nécessitant une authentification
- **JwtInterceptor** : Ajout automatique du token JWT dans les headers HTTP

## Installation

### Prérequis

- Node.js (v18+)
- npm ou yarn
- Backend Spring Boot en cours d'exécution sur `http://localhost:8080`

### Installation des dépendances

```bash
npm install
```

### Démarrage de l'application

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`

### Build de production

```bash
ng build
```

Les fichiers de production seront générés dans le dossier `dist/`

## Configuration Backend

L'application se connecte au backend Spring Boot sur :
- **URL Base** : `http://localhost:8080`
- **Endpoints API** : `/api/employees`
- **Endpoints Auth** : `/auth/login`, `/auth/register`

Assurez-vous que le backend est démarré avant de lancer le frontend.

## Fonctionnalités

### Gestion des Employés (CRUD)

- **Liste** : Affichage de tous les employés dans un tableau
- **Détails** : Visualisation complète des informations d'un employé
- **Ajout** : Création d'un nouvel employé avec validation
- **Modification** : Mise à jour des informations d'un employé
- **Suppression** : Suppression avec confirmation

### Sécurité

- Authentification JWT
- Protection des routes avec AuthGuard
- Intercepteur HTTP pour l'ajout automatique du token
- Gestion de la déconnexion

## Comptes par défaut

- **Username** : `admin`
- **Password** : `admin123`

## Structure des Modèles

### Employee
```typescript
interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
}
```

### LoginRequest
```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

## Commandes Utiles

```bash
# Démarrer le serveur de développement
ng serve

# Build pour la production
ng build

# Exécuter les tests
ng test

# Linter
ng lint
```

## Licence

Ce projet a été développé dans le cadre d'un atelier académique.

## Auteur

Développé pour l'atelier **Spring Boot + MySQL + JPA + Lombok + REST API + Spring Security + Angular**
