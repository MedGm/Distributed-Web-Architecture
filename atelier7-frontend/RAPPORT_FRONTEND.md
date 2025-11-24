# Rapport de Développement - Frontend Angular

## Partie 2 : Frontend Angular - Application de Gestion des Employés

### 1. Contexte et Objectifs

Développement d'une interface utilisateur moderne et professionnelle pour la gestion des employés, connectée à une API REST Spring Boot sécurisée par JWT. L'application permet d'effectuer toutes les opérations CRUD sur les employés avec une expérience utilisateur optimale.

### 2. Architecture et Structure du Projet

#### 2.1 Organisation des Modules

L'application Angular suit une architecture modulaire et organisée :

```
src/app/
├── models/              # Interfaces TypeScript
│   ├── employee.model.ts
│   └── auth.model.ts
├── services/            # Services métier
│   ├── employee.service.ts
│   └── auth.service.ts
├── guards/             # Protection des routes
│   └── auth.guard.ts
├── interceptors/        # Intercepteurs HTTP
│   └── jwt.interceptor.ts
└── pages/               # Composants de pages
    ├── login/
    └── employees/
        ├── list/
        ├── add/
        ├── edit/
        └── details/
```

#### 2.2 Technologies Utilisées

- **Angular 21** : Framework frontend moderne
- **TypeScript** : Typage statique pour la robustesse du code
- **RxJS** : Gestion des observables et programmation réactive
- **Angular Router** : Navigation et routing avec lazy loading
- **Angular HttpClient** : Communication HTTP avec le backend
- **CSS Variables** : Système de design cohérent

### 3. Intégration avec le Backend Spring Boot

#### 3.1 Configuration de l'API

L'application se connecte au backend Spring Boot via :

- **URL Base** : `http://localhost:8080`
- **Endpoints Employees** : `/api/employees`
- **Endpoints Auth** : `/auth/login`, `/auth/register`

#### 3.2 Service EmployeeService

Le service `EmployeeService` encapsule toutes les opérations CRUD :

```typescript
- getAll() : Observable<Employee[]>      // GET /api/employees
- getOne(id) : Observable<Employee>      // GET /api/employees/{id}
- create(emp) : Observable<Employee>     // POST /api/employees
- update(id, emp) : Observable<Employee> // PUT /api/employees/{id}
- delete(id) : Observable<void>          // DELETE /api/employees/{id}
```

#### 3.3 Authentification JWT

**Flux d'authentification** :

1. **Login** : L'utilisateur saisit ses identifiants
2. **Requête** : `POST /auth/login` avec `username` et `password`
3. **Réponse** : Le backend retourne un token JWT
4. **Stockage** : Le token est sauvegardé dans `localStorage`
5. **Utilisation** : Le `JwtInterceptor` ajoute automatiquement le header `Authorization: Bearer <token>` à toutes les requêtes

**JwtInterceptor** :
```typescript
- Intercepte toutes les requêtes HTTP
- Récupère le token depuis localStorage
- Ajoute le header Authorization si le token existe
- Transmet la requête au backend
```

#### 3.4 Protection des Routes

L'`AuthGuard` protège toutes les routes nécessitant une authentification :

- Vérifie la présence du token dans `localStorage`
- Redirige vers `/login` si non authentifié
- Autorise l'accès si authentifié

### 4. Fonctionnalités Implémentées

#### 4.1 Authentification

- ✅ Page de connexion avec validation
- ✅ Gestion du token JWT
- ✅ Déconnexion avec nettoyage du token
- ✅ Redirection automatique si non authentifié

#### 4.2 Gestion des Employés (CRUD)

- ✅ **Liste** : Affichage de tous les employés dans un tableau
- ✅ **Détails** : Visualisation complète d'un employé
- ✅ **Ajout** : Formulaire de création avec validation
- ✅ **Modification** : Formulaire d'édition pré-rempli
- ✅ **Suppression** : Suppression avec confirmation

#### 4.3 Validation et Gestion d'Erreurs

- ✅ Validation côté client (salaire > 0)
- ✅ Validation des formulaires Angular
- ✅ Gestion des erreurs HTTP (403, 400, etc.)
- ✅ Messages d'erreur utilisateur-friendly

#### 4.4 Interface Utilisateur

- ✅ Design moderne et professionnel
- ✅ Responsive (mobile et desktop)
- ✅ États de chargement avec spinners
- ✅ Animations et transitions fluides
- ✅ Système de design cohérent avec variables CSS

### 5. Pages de l'Application

#### 5.1 Page de Connexion (`/login`)

**Fonctionnalités** :
- Formulaire de connexion (username/password)
- Validation des champs
- Gestion des erreurs d'authentification
- Redirection automatique après connexion réussie

**Screenshot** : *[À ajouter : capture d'écran de la page de connexion]*

---

#### 5.2 Liste des Employés (`/employees`)

**Fonctionnalités** :
- Tableau affichant tous les employés
- Colonnes : ID, Prénom, Nom, Email, Salaire
- Actions : Voir détails, Modifier, Supprimer
- Bouton "Ajouter un employé"
- Bouton de déconnexion dans le header
- États : Chargement, Vide, Erreur

**Screenshot** : *[À ajouter : capture d'écran de la liste des employés]*

---

#### 5.3 Ajout d'un Employé (`/employees/add`)

**Fonctionnalités** :
- Formulaire avec champs : Prénom, Nom, Email, Salaire
- Validation en temps réel
- Validation du salaire (doit être > 0)
- Boutons : Créer, Annuler
- Redirection vers la liste après création

**Screenshot** : *[À ajouter : capture d'écran du formulaire d'ajout]*

---

#### 5.4 Modification d'un Employé (`/employees/edit/:id`)

**Fonctionnalités** :
- Chargement des données de l'employé
- Formulaire pré-rempli avec les données existantes
- Validation identique au formulaire d'ajout
- Boutons : Mettre à jour, Annuler
- Redirection vers la liste après mise à jour

**Screenshot** : *[À ajouter : capture d'écran du formulaire d'édition]*

---

#### 5.5 Détails d'un Employé (`/employees/details/:id`)

**Fonctionnalités** :
- Affichage complet des informations de l'employé
- Sections organisées : Informations personnelles, Contact, Rémunération
- Mise en évidence du salaire
- Boutons : Modifier, Retour à la liste
- Design avec carte et header en dégradé

**Screenshot** : *[À ajouter : capture d'écran de la page de détails]*

---

### 6. Système de Design

#### 6.1 Palette de Couleurs

- **Primary** : Bleu professionnel (#3b82f6 à #1e3a8a)
- **Neutral** : Gris (#f9fafb à #111827)
- **Semantic** : Success (#10b981), Error (#ef4444), Warning (#f59e0b)

#### 6.2 Typographie

- **Police** : Inter (Google Fonts)
- **Hiérarchie** : H1 (2.25rem), H2 (1.875rem), H3 (1.5rem)
- **Poids** : 300, 400, 500, 600, 700

#### 6.3 Composants UI

- **Boutons** : Dégradés avec effets hover
- **Formulaires** : Inputs avec focus states
- **Tableaux** : Header en dégradé, lignes avec hover
- **Cartes** : Ombres et bordures arrondies
- **Alertes** : Messages d'erreur avec icônes

### 7. Gestion des États

#### 7.1 États de Chargement

- Spinners animés pendant les requêtes HTTP
- Messages de chargement contextuels
- Désactivation des boutons pendant le chargement

#### 7.2 Gestion des Erreurs

- Messages d'erreur clairs et actionnables
- Gestion des erreurs HTTP (403, 400, 500)
- Affichage des erreurs de validation

#### 7.3 États Vides

- Messages informatifs quand aucune donnée
- Boutons d'action pour créer du contenu

### 8. Sécurité

#### 8.1 Authentification

- Token JWT stocké dans `localStorage`
- Vérification de l'authentification avant accès aux routes
- Déconnexion avec nettoyage du token

#### 8.2 Protection des Routes

- `AuthGuard` sur toutes les routes protégées
- Redirection automatique vers `/login` si non authentifié
- Protection contre l'accès direct aux URLs

#### 8.3 Intercepteur HTTP

- Ajout automatique du token JWT dans les headers
- Gestion des erreurs 401 (non autorisé)
- Pas d'interception des requêtes vers `/auth/**`

### 9. Responsive Design

L'application est entièrement responsive :

- **Desktop** : Layout en colonnes, tableaux complets
- **Tablet** : Adaptation des grilles
- **Mobile** : Stack vertical, tableaux scrollables, formulaires optimisés

### 10. Tests et Validation

#### 10.1 Validation des Formulaires

- Validation HTML5 native
- Validation Angular (required, email, min, etc.)
- Validation métier (salaire > 0)

#### 10.2 Gestion des Erreurs Backend

- Interception des erreurs HTTP
- Affichage des messages d'erreur du backend
- Messages par défaut si erreur non spécifiée

### 11. Conclusion

L'application frontend Angular offre une interface moderne, intuitive et sécurisée pour la gestion des employés. L'intégration avec le backend Spring Boot est transparente grâce à l'utilisation de services, d'intercepteurs et de guards. Le système de design cohérent assure une expérience utilisateur professionnelle sur tous les appareils.

**Points Forts** :
- ✅ Architecture modulaire et maintenable
- ✅ Sécurité JWT complète
- ✅ Interface utilisateur moderne et responsive
- ✅ Gestion d'erreurs robuste
- ✅ Code TypeScript typé et documenté

---

**Développé dans le cadre de l'atelier : Spring Boot + MySQL + JPA + Lombok + REST API + Spring Security + Angular**

