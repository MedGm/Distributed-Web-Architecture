# Application de Gestion des Employés - Backend Spring Boot

Application Full-Stack de gestion des employés développée avec **Spring Boot** et **Angular**.

## Description

Cette application backend expose une API REST sécurisée pour la gestion des employés avec un système complet de CRUD (Create, Read, Update, Delete), protégé par authentification JWT.

## Technologies Utilisées

- **Spring Boot 4.0** - Framework backend
- **Spring Data JPA** - Accès aux données
- **Spring Security** - Sécurité et authentification
- **MySQL** - Base de données relationnelle
- **JWT (JSON Web Token)** - Authentification sécurisée
- **Lombok** - Réduction du code boilerplate
- **Jakarta Bean Validation** - Validation des données
- **Hibernate** - ORM (Object-Relational Mapping)

## Architecture

```
src/main/java/ma/fstt/atelier7_springrest/
├── entities/            # Entités JPA (Employee, AppUser)
├── repositories/        # Interfaces JPA Repository
├── services/            # Services métier
│   ├── EmployeeService.java
│   └── EmployeeServiceImpl.java
├── web/                 # Contrôleurs REST
│   ├── EmployeeController.java
│   ├── AuthController.java
│   └── dto/            # DTOs (AuthRequest, AuthResponse, RegisterRequest)
├── security/            # Configuration sécurité
│   ├── SecurityConfig.java
│   ├── JwtAuthenticationFilter.java
│   ├── JwtUtil.java
│   └── CustomUserDetailsService.java
└── config/              # Configuration (DataInitializer)
```

## Authentification

- **Login** : Connexion avec username/password via `POST /auth/login`
- **Register** : Inscription de nouveaux utilisateurs via `POST /auth/register`
- **JWT Token** : Génération et validation de tokens JWT (HS256)
- **Security Filter** : Filtre JWT pour protéger les endpoints `/api/**`
- **CORS** : Configuration pour autoriser le frontend Angular (localhost:4200)

## Installation

### Prérequis

- Java 17+
- Maven 3.6+
- MySQL 8.0+
- Frontend Angular en cours d'exécution sur `http://localhost:4200` (optionnel)

### Configuration de la base de données

1. Créer la base de données MySQL :
```sql
CREATE DATABASE employees_db;
```

2. Configurer les identifiants dans `src/main/resources/application.properties` :
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employees_db
spring.datasource.username=root
spring.datasource.password=votre_mot_de_passe
```

### Installation des dépendances

Les dépendances sont gérées par Maven et seront téléchargées automatiquement lors du build.

### Démarrage de l'application

```bash
./mvnw spring-boot:run
```

L'API sera accessible sur `http://localhost:8080`

### Build de production

```bash
./mvnw clean package
```

Le fichier JAR sera généré dans le dossier `target/`

## Configuration Frontend

L'application backend accepte les requêtes depuis le frontend Angular sur :

- **URL Frontend** : `http://localhost:4200`
- **CORS** : Configuré pour autoriser toutes les méthodes HTTP depuis le frontend

## Endpoints API

### Authentification

- `POST /auth/login` - Connexion (retourne un JWT token)
- `POST /auth/register` - Inscription d'un nouvel utilisateur

### Gestion des Employés (CRUD)

- `GET /api/employees` - Liste de tous les employés (JWT requis)
- `GET /api/employees/{id}` - Détails d'un employé (JWT requis)
- `POST /api/employees` - Création d'un employé (JWT requis)
- `PUT /api/employees/{id}` - Mise à jour d'un employé (JWT requis)
- `DELETE /api/employees/{id}` - Suppression d'un employé (JWT requis)

## Fonctionnalités

### Gestion des Employés (CRUD)

- **Liste** : Récupération de tous les employés
- **Détails** : Récupération des informations d'un employé par ID
- **Création** : Ajout d'un nouvel employé avec validation
- **Modification** : Mise à jour des informations d'un employé
- **Suppression** : Suppression d'un employé par ID

### Sécurité

- Authentification JWT avec expiration (1 heure par défaut)
- Protection des endpoints `/api/**` avec filtres JWT
- Hachage des mots de passe avec BCrypt
- Gestion des rôles utilisateurs (ROLE_USER, ROLE_ADMIN)
- Configuration CORS pour le frontend Angular

### Validation

- Validation Jakarta Bean Validation sur les entités
- Contraintes : `@NotBlank`, `@Email`, `@Positive`
- Messages d'erreur automatiques pour les données invalides

## Comptes par défaut

Un compte administrateur est créé automatiquement au démarrage :

- **Username** : `admin`
- **Password** : `admin123`
- **Rôle** : `ROLE_ADMIN`

## Structure des Modèles

### Employee

```java
@Entity
public class Employee {
    private Long id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Email
    private String email;
    @Positive
    private double salary;
}
```

### AppUser

```java
@Entity
public class AppUser {
    private Long id;
    private String username;
    private String password; // Haché avec BCrypt
    private String role; // ROLE_USER ou ROLE_ADMIN
}
```

## Configuration JWT

Les paramètres JWT sont configurés dans `application.properties` :

```properties
app.jwt.secret=votre_secret_base64_64_caracteres_minimum
app.jwt.expiration-ms=3600000  # 1 heure en millisecondes
```

## Commandes Utiles

```bash
# Démarrer l'application
./mvnw spring-boot:run

# Build du projet
./mvnw clean package

# Exécuter les tests
./mvnw test

# Nettoyer le projet
./mvnw clean
```

## Licence

Ce projet a été développé dans le cadre d'un atelier académique.

## Auteur

Développé pour l'atelier **Spring Boot + MySQL + JPA + Lombok + REST API + Spring Security + Angular**
