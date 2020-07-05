# TodoList - saison 7

On veut mettre en place un petit site de gestion de nos tâches.

## Description

Le nom du projet est _TodoList_.

C'est un petit site permettant de gérer ses tâches, quel que soit leur sujet.

Il ne contient qu'_une seule et unique page_ permettant de réaliser toutes les actions nécessaires.  
Cette page va lister toutes les tâches déjà saisies, ainsi que leurs catégories respectives. Seuls les tâches actives (non archivées) sont affichées par défaut.

Pour chaque tâche, on pourra :

- modifier son nom
- la marquer comme "complète" (== terminée)
- la marquer comme "incomplète" (== en cours de réalisation)
- l'archiver
- la supprimer (si et seulement si elle est déjà archivée)

Un formulaire en bas de la liste permettra d'ajouter facilement une nouvelle tâche en renseignant son nom, et la catégorie liée.

En haut du site, on pourra filtrer la liste des tâches de la façon suivante :

- toutes / complétées / non complétées
- catégorie

Ces 2 filtres doivent se cumuler et permettre ainsi de lister, par exemple, toutes les tâches complétées d'une catégorie, ou bien les tâches archivées toutes catégories confondues.

On pourra aussi accéder spécifiquement aux tâches archivées grâce à un lien en haut de page.

### :warning: Précisions techniques

- chaque action sur le site se fera **sans jamais recharger la page**
- le site devra s'adapter à tous les écrans, grâce à la technique **_Responsive Design_**

## Fichiers techniques

- [User stories](docs/user_stories.md)
- [Product backlog](docs/product_backlog.md)
- [Wireframe](docs/wireframe.png)

## Organisation

L'organisation est horizontale. Des rôles sont définis.  
Quel que soit son rôle, « on » ne donne d'ordre à personne.  
Chacun assume son rôle et s'occupe de sa partie, de ses responsabilités.  
Chacun communique et se coordonne avec les autres.

### Rôle : _Product Owner_

