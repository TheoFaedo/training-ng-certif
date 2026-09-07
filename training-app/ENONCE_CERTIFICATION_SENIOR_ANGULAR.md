# Épreuve blanche — Senior Angular Developer

## Contexte

Une équipe produit souhaite créer **OpsBoard**, un tableau de suivi des incidents
techniques. L'application est destinée aux opérateurs qui doivent consulter,
filtrer, créer et mettre à jour des incidents sans recharger la page.

Une application Angular 22 vide est déjà disponible dans ce dépôt. Votre mission
est d'implémenter l'application ci-dessous en privilégiant les API modernes
d'Angular : composants standalone, signaux, contrôle de flux natif et routes
fonctionnelles. L'interface visuelle peut rester sobre ; la qualité de
l'architecture, du typage, de l'accessibilité et des tests prime.

Durée indicative : 5 à 7 heures.

## Données métier

Un incident possède au minimum les propriétés suivantes :

```ts
type IncidentStatus = 'new' | 'investigating' | 'resolved';
type IncidentPriority = 'low' | 'medium' | 'high' | 'critical';

interface Incident {
  id: string;
  title: string;
  description: string; // contenu fourni par un utilisateur
  status: IncidentStatus;
  priority: IncidentPriority;
  assignee?: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

Créez un jeu de données local réaliste d'au moins douze incidents. Il n'est pas
attendu de serveur HTTP. Simulez cependant des accès asynchrones avec RxJS afin
que les choix de chargement, d'annulation et d'affichage soient significatifs.

## Parcours attendu

### Navigation et chargement différé

L'application comporte les routes suivantes :

| URL | Écran | Attendu |
| --- | --- | --- |
| `/dashboard` | Tableau de bord | Compteurs par statut et priorité, et cinq incidents récents. |
| `/incidents` | Liste | Recherche, filtres, tri et pagination locale. |
| `/incidents/new` | Création | Formulaire de création. |
| `/incidents/:id` | Détail | Consultation, changement de statut et commentaires. |
| `/incidents/:id/edit` | Édition | Formulaire prérempli. |
| `/admin` | Administration | Gestion d'une liste de catégories/tags. |

- La route `incidents` est une feature lazy-loadée et contient ses routes
  enfants. La feature `admin` est lazy-loadée séparément.
- Placez un `router-outlet` enfant dans le shell de la feature incidents ; sa
  vue de liste doit rester visible lorsque le détail est affiché à côté ou sous
  elle, selon votre mise en page.
- Le détail utilise un **resolver fonctionnel** : la vue reçoit l'incident
  résolu dans `route.data` et gère proprement le cas « introuvable ».
- L'accès à `admin` nécessite le rôle `admin`. Implémentez ce contrôle avec un
  guard fonctionnel et un service d'authentification simulé. Ajoutez un
  `canDeactivate` sur création/édition lorsque le formulaire contient des
  modifications non enregistrées.
- Les paramètres de route, paramètres de requête et fragments éventuels doivent
  être lus de manière réactive. La liste synchronise ses filtres avec l'URL pour
  qu'un lien puisse être partagé.
- Configurez le routeur avec `withHashLocation()` et préchargez les routes lazy
  après le premier affichage. Affichez un indicateur de navigation via l'API de
  `RouterOutlet` ou les événements du routeur.

### Liste et composants

Découpez la feature avec une architecture explicite :

- Un **container** `IncidentListPage` orchestre route, état, chargement et
  navigation. Il ne doit pas porter le rendu d'une ligne métier complexe.
- Des composants de présentation reçoivent des données immuables et émettent
  des intentions (`select`, `statusChange`, etc.). Ils ne doivent pas injecter
  le store métier ni le routeur.
- Créez un composant réutilisable `ui-card` utilisant la projection de contenu.
  Il expose des zones `[card-title]`, `[card-actions]` et son contenu principal.
  Utilisez `ContentChild` (ou sa variante signal) pour adapter l'ARIA si un titre
  projeté est fourni.
- Créez `incident-table` qui accepte une liste, une propriété `selectedId` avec
  liaison bidirectionnelle personnalisée (`model()` et `[(selectedId)]`) et un
  `ng-template` optionnel projeté pour personnaliser la cellule « priorité ».
  Une vue par défaut doit fonctionner sans template fourni. Employez
  `ng-container` lorsque nécessaire sans ajouter de nœud au DOM.
- La table utilise `@for` avec une clé stable. Expliquez dans un court commentaire
  pourquoi suivre l'index serait erroné ici.
- Utilisez au moins une variable de référence de template pour le champ de
  recherche et donnez-lui le focus après l'initialisation. Faites-le avec
  `viewChild`/`ViewChild` et un hook de cycle de vie adapté, sans accès DOM global.

### État, RxJS et performance

Concevez un `IncidentStore` local inspiré de Redux : état unique et privé,
actions/intents clairement nommés, transformations pures et état exposé en
lecture seule. Il n'est pas obligatoire d'ajouter une bibliothèque Redux.

- Stockez l'état d'interface avec des `signal`, exposez les totaux et la liste
  filtrée avec `computed`, et utilisez `effect` uniquement pour un effet de bord
  justifié (par exemple persistance de préférence de tri dans `localStorage`).
- Le dépôt renvoie des `Observable`. Faites l'interopérabilité RxJS/signaux avec
  `toSignal` ou `toObservable`, et justifiez brièvement le choix à l'endroit
  concerné.
- La recherche doit être asynchrone, annulable lors d'une nouvelle saisie et ne
  pas déclencher une requête pour chaque frappe. Utilisez une composition RxJS
  appropriée (`debounceTime`, `distinctUntilChanged`, `switchMap`, etc.).
- Montrez un flux **cold** (chargement du dépôt) et un flux **hot** (par exemple
  notifications de mises à jour), en choisissant consciemment `Subject`,
  `BehaviorSubject` ou `ReplaySubject`. Documentez le choix dans le code.
- Affichez au moins une source `Observable` avec `async`, y compris l'état de
  chargement ou de notification. Ne souscrivez pas manuellement dans le template
  ou pour afficher une simple valeur.
- Préservez l'immuabilité lors des modifications : utilisez spread syntax et
  évitez toute mutation de tableau ou d'objet provenant du store.

### Formulaires et validation

Les pages de création et d'édition partagent un composant de formulaire.

- Utilisez les Signal Forms d'Angular 22, ou à défaut les Reactive Forms.
- Le titre est obligatoire, entre 5 et 100 caractères ; la priorité et le statut
  sont obligatoires. La description est obligatoire pour une priorité `critical`.
  Implémentez cette dernière règle par un validateur personnalisé au niveau du
  groupe/modèle.
- Affichez des erreurs accessibles après interaction et utilisez les classes et
  propriétés Angular de validation (pristine/dirty, touched/untouched,
  valid/invalid) de façon pertinente.
- La valeur de l'assigné peut être absente : employez `??` là où une valeur de
  présentation par défaut est nécessaire, sans confondre une chaîne vide et
  `null`/`undefined`.

### Sécurité et directive

La description provient d'utilisateurs et peut contenir un sous-ensemble de
HTML (liens, listes, emphase).

- Rendez ce contenu par une liaison `[innerHTML]` standard et laissez Angular le
  sanitiser. N'utilisez pas `bypassSecurityTrustHtml`.
- Ajoutez une directive attribut `incidentPriority` applicable à un élément ou à
  l'attribut `[data-priority]`. Elle ajoute une classe et un libellé accessible
  selon la priorité. Utilisez les options du décorateur (`selector`, `host`,
  éventuellement `exportAs`) plutôt que `@HostBinding`/`@HostListener`.
- Documentez en quelques lignes dans le README les raisons du choix de
  sanitisation et les précautions à prendre avec les URL externes.

### Injection de dépendances

- Déclarez un `InjectionToken` typé pour la configuration d'application
  (nom de l'organisation, délai simulé, drapeau de fonctionnalités).
- Fournissez cette configuration via un provider objet. Faites varier le délai
  du dépôt par cette configuration.
- Ajoutez au niveau de la feature admin un provider qui remplace localement un
  service de formatage/horloge ; démontrez ainsi la hiérarchie des injecteurs.
- Utilisez `inject()` dans les services, guards, resolvers et composants lorsque
  cela rend le code plus clair. Expliquez dans le README comment vous évitez les
  dépendances circulaires (en particulier entre store, dépôt et navigation).
- Injectez `ElementRef` seulement dans le composant/directive qui doit réellement
  manipuler son propre élément (par exemple le focus du champ de recherche) ;
  ne l'utilisez pas comme mécanisme de sélection global du DOM.

### TypeScript et modularité

- Respectez `strict`. N'utilisez ni `any`, ni assertions de type non justifiées.
- Modélisez les états et actions avec des unions discriminées. Utilisez un enum
  uniquement si vous pouvez expliquer son intérêt face à une union de littéraux.
- Définissez au moins un type générique réutilisable (par exemple `AsyncState<T>`
  ou `Page<T>`) et au moins un type dérivé (`Pick`, `Omit`, `Readonly`,
  `Partial`, `Record` ou type indexé) dans une API réelle.
- Le projet doit utiliser des composants standalone. Dans le README, comparez ce
  choix aux rôles historiques des NgModules (root, feature, routing, shared,
  service) et indiquez dans quels cas un NgModule tiers existant pourrait encore
  être importé. Ne réintroduisez pas de NgModule applicatif sans raison.
- Évitez les imports « barrel » qui créent des cycles ou réduisent la capacité de
  tree-shaking. Importez les symboles nécessaires et vérifiez une build de
  production.

## Tests exigés

Écrivez des tests unitaires ciblés avec les API Angular de test : `TestBed`,
`ComponentFixture` et `DebugElement`.

1. Le store : création, mise à jour immuable et calcul d'un compteur dérivé.
2. Le resolver : retour de l'incident attendu et redirection/erreur pour un ID
   absent.
3. Le guard admin et le `canDeactivate` : autorisation/refus selon les états.
4. Le formulaire : règle « description obligatoire si critical ».
5. `incident-table` : sélection via la liaison bidirectionnelle et rendu du
   template personnalisé projeté.
6. La directive : classes/attributs accessibles produits pour une priorité.

Pour au moins deux tests, remplacez une dépendance via un provider de test
(`useValue`, `useClass` ou `useFactory`) plutôt qu'en sollicitant le vrai dépôt.

## Livrables et critères de réussite

Livrez le code, ce README mis à jour et une courte section « Décisions » qui
couvre : architecture container/présentation, stratégie d'état, interop RxJS /
signals, DI hiérarchique, sécurité HTML, lazy-loading et compromis éventuels.

L'évaluation portera notamment sur :

- la compilation stricte, `ng build` de production et les tests verts ;
- la pertinence des frontières de composants et de l'injection ;
- l'usage idiomatique d'Angular 22, la maîtrise de la réactivité et de RxJS ;
- l'absence de fuite de souscription et la stabilité des listes ;
- la navigation, les cas d'erreur et l'accessibilité clavier/lecteur d'écran ;
- la capacité à expliquer les choix et à identifier les risques de sécurité ou
  de dépendances circulaires.

## Bonus de discussion (sans code imposé)

Préparez-vous à expliquer :

- pourquoi `switchMap` est préférable à `mergeMap` pour la recherche ;
- la différence entre `computed` et `effect`, et entre signal et `BehaviorSubject` ;
- les conséquences de Zone.js et de la détection de changements avec les
  composants Angular récents ;
- comment vous liriez un marble diagram pour valider la recherche ;
- les impacts du tree-shaking sur la façon d'organiser exports et providers ;
- les limites d'un guard comme mécanisme de sécurité : le contrôle réel reste
  côté serveur.
