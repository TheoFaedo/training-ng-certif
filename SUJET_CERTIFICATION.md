# 🚀 Sujet de Projet : *FleetPulse – Plateforme de Gestion de Flotte & Missions*

## Contextualisation Métier
Vous êtes recruté(e) en tant que Lead / Senior Developer Angular pour concevoir le front-end de **FleetPulse**, une application de suivi en temps réel de véhicules de livraison et de leurs missions logistiques associées.

L'application doit gérer des flux de données à haute fréquence, un filtrage avancé, un formulaire de création de mission complexe, un tableau de bord modulaire et un contrôle d'accès sécurisé.

---

## 📋 Cahier des Charges Technique & Fonctionnel

### 1. Architecture & Routage Avancé (`Advanced Routing & Architecture`)
- **Lazy-Loading & Structure** :
  - L'application doit comporter au moins 2 sous-modules / sous-domaines sous chargement différé (Lazy-loading) :
    1. `/dashboard` (Tableau de bord interactif)
    2. `/fleet` (Gestion et détails de la flotte de véhicules)
  - Mettre en place un système de routes imbriquées (Child Routes) pour la vue détaillée d'un véhicule (`/fleet/:id/details`, `/fleet/:id/telemetry`).
- **Guards & Resolvers** :
  - Développer un **Guard fonctionnel** (`canActivate`) simulant une vérification de rôle ("ADMIN" ou "FLEET_MANAGER").
  - Développer un **Guard fonctionnel** (`canDeactivate`) empêchant l'utilisateur de quitter la page de création de mission si un formulaire comporte des modifications non enregistrées.
  - Développer un **Resolver fonctionnel** permettant de charger les données du véhicule avant l'activation de la route `/fleet/:id`.
- **Injection de Dépendances & Tokens** :
  - Créer un `InjectionToken` personnalisé pour la configuration de l'application (ex: `API_CONFIG` fournissant une URL de base, un délai de timeout et un flag de fonctionnalités).
  - Utiliser la fonction `inject()` dans vos services et guards (pas de constructeurs verbeux lorsque cela s'y prête).
  - Fournir une instance spécifique de service au niveau d'un composant via l'arborescence des injecteurs (Hierarchy of Injectors / `providers: [...]`).

---

### 2. Composants Avancés & Architecture UI (`Advanced & Intermediate Components`)
- **Container vs. Presentation Pattern** :
  - Séparer strictement les composants conteneurs (gestion de l'état, appels services, injection) des composants de présentation (composants "purs", axés sur l'affichage et l'émission d'évènements).
- **Projection de Contenu Avancée** :
  - Créer un composant générique `WidgetCardComponent` utilisant la projection de contenu multi-slot (`<ng-content select="...">`) pour projeter un en-tête (`[widget-header]`), le corps principal et un pied de page (`[widget-footer]`).
- **Template Dynamic & Références** :
  - Permettre au `WidgetCardComponent` d'accepter optionnellement un `TemplateRef` personnalisé (`ng-template`) pour personnaliser dynamiquement l'état d'erreur ou de chargement du widget.
  - Utiliser les variables de référence de template (`#var`) et les requêtes `@ViewChild` ou `@ContentChild` (ou leurs équivalents basés sur les **Signals** : `viewChild`, `contentChild`) pour interagir avec le DOM ou des sous-composants.
- **Custom Two-Way Data Binding** :
  - Créer un composant personnalisé de sélection de priorité/statut (`PriorityPickerComponent`) proposant un Two-Way Data Binding natif (soit via le pattern `@Input()` / `@Output()` `[x]` / `(xChange)`, soit via la fonction `model()` des Signals).
- **Sécurisation (Sanitization)** :
  - Créer un composant ou un pipe capable d'afficher des alertes sous forme de fragments HTML dynamiques en utilisant `DomSanitizer` pour garantir l'absence de failles XSS tout en rendant le HTML sécurisé.

---

### 3. Gestion d'État, Signals & RxJS Avancé (`Signals, RxJS & State Management`)
- **Signals & Computed** :
  - Gérer l'état réactif global ou local de la flotte à l'aide de **Signals** Angular (`signal()`, `computed()`, `effect()`).
  - Dériver des métriques calculées en temps réel : nombre de véhicules actifs, taux moyen de carburant, alertes critiques.
  - Utiliser `effect()` pour logger ou persister temporairement dans le `localStorage` des préférences utilisateur lors des changements d'état.
- **RxJS Avancé & Interopérabilité** :
  - Simuler un flux de télémétrie en temps réel (WebSocket ou `interval`) émettant des coordonnées GPS et des statuts.
  - Manipuler ce flux avec des opérateurs RxJS avancés : `switchMap`, `debounceTime`, `distinctUntilChanged`, `catchError`, `shareReplay`, `combineLatest`.
  - Assurer une interopérabilité sans faille entre RxJS et Signals en utilisant `toSignal()` et `toObservable()`.
  - Utiliser un `BehaviorSubject` ou un `ReplaySubject` pour diffuser l'historique des alertes dans un service centralisé.

---

### 4. Formulaires Avancés (`Advanced Forms`)
- **Reactive Forms** :
  - Créer un formulaire réactif complet de **Planification de Mission** comprenant :
    - Un champ véhicule (sélection).
    - Un champ itinéraire avec une liste dynamique d'étapes (utilisation de `FormArray`).
- **Validation Personnalisée (Sync & Async)** :
  - **Validateur Synchrone** : Vérifier que la date de fin de mission est strictly postérieure à la date de début.
  - **Validateur Asynchrone** : Simuler un appel API qui vérifie la disponibilité du véhicule sélectionné (doit retourner une promesse ou un Observable).
  - Appliquer les classes CSS de validation Angular (`ng-invalid`, `ng-dirty`, `ng-touched`) pour afficher des retours visuels précis et ergonomiques.

---

### 5. Performance & Pipes (`Performance & Pipes`)
- **Change Detection & TrackBy** :
  - Passer l'ensemble de vos composants de présentation en `ChangeDetectionStrategy.OnPush`.
  - Utiliser la nouvelle syntaxe `@for` avec une expression `track` pertinente (ou `*ngFor` avec une fonction `trackBy`) sur toutes les listes dynamiques.
- **Pipes Personnalisés & Chaining** :
  - Créer un Pipe personnalisé `DistanceFormatterPipe` (ex: conversion mètres en km avec options de formatage).
  - Utiliser le pipe `async` dans les templates là où les Observables ne sont pas convertis en Signals.
  - Chaîner au moins deux pipes dans un template (ex: `DistanceFormatterPipe` chaîné avec `UppercasePipe` ou `DatePipe`).

---

### 6. TypeScript Avancé (`TypeScript & Typing`)
- Définir des types et interfaces rigoureux :
  - Utilisation de **Generics** pour vos structures de réponses d'API ou d'état (`ApiResponse<T>`, `StateSlice<T>`).
  - Utilisation des **Utility Types** (`Pick`, `Omit`, `Partial`, `Readonly`, `Record`).
  - Utilisation des **Union Types** et des **Enums** pour classifier les types de véhicules et les statuts de mission.
  - Utilisation du *Nullish coalescing operator* (`??`) et du *Spread syntax* (`...`) de manière idiomatique et immuable.

---

### 7. Tests Unitaires (`Testing`)
- Écrire des tests unitaires complets avec `TestBed` :
  - Tester le composant conteneur principal à l'aide de `ComponentFixture` et `DebugElement`.
  - Tester l'interaction utilisateur sur un formulaire (simulation de saisie et vérification des déclenchements de validation).
  - Simuler les dépendances d'un service ou d'un composant en utilisant des **Custom Providers** dans le `TestBed` (`useValue`, `useFactory` ou `jasmine.createSpyObj` / `vitest.fn`).

---

## 🎯 Ordre de réalisation suggéré

1. **Phase 1 : Modèles & Services** (Interfaces TS, Generics, Injection Tokens, Services de télémétrie RxJS & Signals).
2. **Phase 2 : Composants UI Réutilisables** (Widget Card, Projection, Custom Two-Way Binding, Pipes).
3. **Phase 3 : Routage, Lazy Loading & Guards** (Guards fonctionnels, Resolvers, structure des pages).
4. **Phase 4 : Formulaire Avancé** (Reactive Form, FormArray, Validateurs sync & async).
5. **Phase 5 : Optimisation & Performance** (OnPush, TrackBy, Sanitizer).
6. **Phase 6 : Tests Unitaires** (TestBed, Mocks, Spies).
