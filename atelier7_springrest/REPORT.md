# Rapport Partie 1 — Backend Spring Boot

## 1. Contexte et objectifs
- Mise en place d’un backend Spring Boot sécurisé exposant une API REST CRUD pour la ressource `Employee`.
- Intégration MySQL (base `employees_db`), validation Jakarta Bean Validation, Lombok pour la réduction du boilerplate.
- Ajout d’une couche de sécurité JWT : authentification, génération de token, sécurisation des endpoints.

## 2. Structure du projet
- **Entités** : `Employee` (données RH), `AppUser` (authentification) situées dans `ma.fstt.atelier7_springrest.entities`.
- **Accès aux données** : `EmployeeRepository` et `AppUserRepository` (`JpaRepository`), package `repositories`.
- **Service métier** : interface `EmployeeService` + implémentation `EmployeeServiceImpl` avec validation d’existence et transactions.
- **Couche web** :
  - `EmployeeController` (`/api/employees`) : CRUD complet, validation `@Valid`, codes HTTP adaptés.
  - `AuthController` (`/auth/login`, `/auth/register`) : login → JWT, inscription avec hachage bcrypt + rôle par défaut.
- **Configuration** :
  - `application.properties` : datasource MySQL, dialecte Hibernate, secret JWT Base64, durée de validité (1h).
  - `SecurityConfig` : session stateless, filtres JWT, autorisations publiques sur `/auth/**`, configuration CORS pour autoriser le frontend Angular (localhost:4200).
  - `JwtAuthenticationFilter`, `JwtUtil`, `CustomUserDetailsService`.
  - `DataInitializer` : création d’un compte admin (`admin` / `admin123`) si absent.

## 3. Sécurité et flux d’authentification
1. **Enregistrement** (`POST /auth/register`) : création d’un utilisateur, mot de passe encodé `BCryptPasswordEncoder`, rôle `ROLE_USER` par défaut.
2. **Connexion** (`POST /auth/login`) : authentification `AuthenticationManager`, génération JWT (HS256) via `JwtUtil`.
3. **Protection API** : chaque requête vers `/api/employees/**` doit inclure `Authorization: Bearer <token>`.
4. **Filtre JWT** : `JwtAuthenticationFilter` extrait le token, vérifie signature/expiration, renseigne le `SecurityContext`.

## 4. Endpoints principaux
| Méthode | URI | Description | Auth |
|---------|-----|-------------|------|
| POST | `/auth/register` | Inscription utilisateur | Public |
| POST | `/auth/login` | Retourne JWT | Public |
| GET | `/api/employees` | Liste des employés | JWT requis |
| GET | `/api/employees/{id}` | Détail employé | JWT requis |
| POST | `/api/employees` | Création | JWT requis |
| PUT | `/api/employees/{id}` | Mise à jour | JWT requis |
| DELETE | `/api/employees/{id}` | Suppression | JWT requis |

## 5. Tests et vérifications
1. **Pré-requis** : MySQL avec base `employees_db`, utilisateur `root/medgm0801`.
2. **Build** : `./mvnw clean package`.
3. **Lancement** : `./mvnw spring-boot:run`.
4. **Flux Postman** détaillé :
   1. **Inscription (optionnelle)**  
      - Méthode/URL : `POST http://localhost:8080/auth/register`  
      - Body (JSON) :  
        ```json
        {
          "username": "admin",
          "password": "admin123",
          "role": "ROLE_ADMIN"
        }
        ```  
      - Réponse : l’utilisateur créé.
   2. **Connexion**  
      - `POST http://localhost:8080/auth/login`  
      - Body :  
        ```json
        {
          "username": "admin",
          "password": "admin123"
        }
        ```  
      - Copier le champ `token` du `AuthResponse`.
   3. **Utilisation du JWT**  
      - Dans l’onglet *Headers* des requêtes suivantes ajouter `Authorization: Bearer <token>`.
      - Exemple création employé :  
        - `POST http://localhost:8080/api/employees`  
        - Body JSON :  
          ```json
          {
            "firstName": "Sara",
            "lastName": "Benali",
            "email": "sara.benali@acme.com",
            "salary": 5200
          }
          ```
      - Exemple mise à jour : `PUT http://localhost:8080/api/employees/{id}` avec même structure JSON.
      - Suppression : `DELETE http://localhost:8080/api/employees/{id}` (sans body).
5. **Logs SQL** activés (`spring.jpa.show-sql=true`) pour vérification.

## 6. Axes d’amélioration (suggestions)
- Ajouter des DTO dédiés pour la couche REST pour éviter d’exposer directement l’entité `Employee`.
- Implémenter une gestion d’erreurs globale (`@ControllerAdvice`) pour harmoniser les réponses.
- Couvrir le service `EmployeeService` et la sécurité avec des tests unitaires et d’intégration.
- Gérer le rafraîchissement de token / expiration plus fine (refresh tokens).

Projet prêt pour démonstration Postman et relecture. Toutes les classes nécessaires à la Partie 1 sont en place et intégrées.


