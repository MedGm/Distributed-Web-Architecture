# Distributed Web Architecture Repository (JEE & Spring)

<p align="center">
  <img width="100" height="140" alt="image" src="https://github.com/user-attachments/assets/95f415be-76cf-46e5-b6e2-2ebfa8ed9f5e" />
  <img width="250" height="190" alt="image" src="https://github.com/user-attachments/assets/b13e3e29-92c7-4db8-b362-d24ab0a8c57c" />
  <img width="220" height="160" alt="image" src="https://cdn.worldvectorlogo.com/logos/spring-3.svg" />
</p>

Bienvenue dans ce dépôt GitHub qui regroupe mes travaux pratiques et ateliers réalisés dans le cadre de l’apprentissage de **l'architecture web distribuée**, en utilisant **Jakarta EE / Java EE** et **Spring Framework**.  
Chaque atelier est un projet indépendant qui illustre un aspect de ces technologies (Servlets, JSP, JSTL, JPA, EJB, Spring MVC, Spring Boot...).

---

## Objectif du dépôt

- Centraliser tous mes ateliers JEE et Spring au même endroit
- Fournir un point d’entrée pour cloner, compiler et exécuter les projets

---

## Structure du dépôt

| Atelier | Dossier | Description |
|---------|---------|-------------|
| **Atelier 1 – MVC2 (Servlet/JSP/DAO/CDI)** | [`atelier1_mvc2`](atelier1_mvc2/) | Première application web basée sur MVC2 : gestion des clients, produits et commandes avec DAO et CDI. *(Contient un README détaillé du projet)* |
| **Atelier 2 – JPA** | [`atelier2_jpa`](https://github.com/MedGm/JEE/tree/master/atelier2_jpa) | Application web avec JPA pour la persistance des données. |
| **Atelier 3 – JSF & JPA** | [`atelier3_jsf`](https://github.com/MedGm/JEE/tree/master/atelier3_jsf) | Application E-Commerce avec JSF, JPA, et PrimeFaces. |
| **Atelier 4 – EJB 4.0 & Architecture Distribuée** | [`atelier4_ejb`](atelier4_ejb/) | Architecture distribuée JEE avec EJB Remote : couche métier sur WildFly (port 8080) et application web sur Tomcat (port 9090) communiquant via JNDI. Gestion complète d'étudiants, modules et notes. *(Contient un README détaillé du projet)* |
| **Atelier 5 – REST API** | [`atelier5_restapi`](atelier5_restapi/) | API REST avec Spring Boot et JPA pour la gestion des produits. |
| **Atelier 5 – Frontend** | [`atelier5-frontend`](atelier5-frontend/) | Frontend Angular pour l'API REST de l'atelier 5. |
| **Atelier 6 – Spring MVC** | [`atelier6_springmvc`](atelier6_springmvc/) | Application web avec Spring MVC. |
| **Atelier 7 – Full-Stack + Docker** | [`docker-compose.yml`](docker-compose.yml), [`atelier7_springrest`](atelier7_springrest/), [`atelier7-frontend`](atelier7-frontend/) | Application full-stack de gestion des employés avec Spring Boot (API REST sécurisée JWT), Angular, MySQL, et conteneurisation Docker complète. |

> Chaque dossier contient son propre README.md détaillant le fonctionnement du projet.

---

## Technologies communes

- **Langage :** Java 17+, TypeScript  
- **Frameworks :** Jakarta EE (Servlet, JSP, JSTL, CDI, EJB, JPA), Spring Framework (Spring MVC, Spring Boot), Angular
- **Serveurs d'application :** WildFly, Tomcat (architecture distribuée)  
- **Base de données :** MySQL  
- **Gestion de projet :** Maven, npm  
- **Conteneurisation :** Docker, Docker Compose
- **IDE :** IntelliJ IDEA Ultimate  

---

## Utilisation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/MedGm/JEE.git
   cd JEE
   ```

2. Naviguer dans l'atelier souhaité :
   ```bash
   cd atelier1_mvc2
   ```

### Atelier 7 - Démarrage avec Docker

L'Atelier 7 peut être démarré facilement avec Docker Compose :

```bash
cd JEE
docker-compose up --build
```

L'application sera accessible sur :
- **Frontend Angular** : http://localhost:8082
- **Backend API** : http://localhost:8081
- **MySQL** : localhost:3307

Compte admin par défaut : `admin` / `admin123`

Pour plus de détails, consultez les README.md dans [`atelier7_springrest`](atelier7_springrest/) et [`atelier7-frontend`](atelier7-frontend/).

   
Réalisé par El Gorrim Mohamed
