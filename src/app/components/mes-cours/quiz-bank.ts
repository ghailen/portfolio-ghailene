export interface QuizDefinition {
  question: string;
  correct: string;
  distractors: [string, string];
  explanation: string;
}

interface QuizBankEntry {
  pattern: RegExp;
  questions: QuizDefinition[];
}

const q = (
  question: string,
  correct: string,
  firstWrong: string,
  secondWrong: string,
  explanation: string
): QuizDefinition => ({ question, correct, distractors: [firstWrong, secondWrong], explanation });

const QUIZ_BANK: QuizBankEntry[] = [
  {
    pattern: /Préparation générale/i,
    questions: [
      q('Comment structurer une réponse technique pendant un entretien senior ?', 'Contexte, décision, compromis, résultat mesurable', 'Donner uniquement la définition théorique', 'Citer le maximum de technologies possible', 'Une réponse senior expose le raisonnement et les compromis, pas seulement la solution.'),
      q('Que faire si vous ne connaissez pas immédiatement la réponse ?', 'Clarifier les hypothèses puis raisonner à voix haute', 'Inventer une réponse avec assurance', 'Changer discrètement de sujet', 'Le recruteur évalue aussi votre méthode de résolution et votre transparence.'),
      q('Quel exemple démontre le mieux votre niveau senior ?', 'Un incident réel avec diagnostic, arbitrage et amélioration durable', 'Une liste de toutes les annotations Spring', 'Un projet sans difficulté particulière', 'Un retour d’expérience concret montre votre capacité à décider et à apprendre.')
    ]
  },
  {
    pattern: /Questions d’entretien & quiz/i,
    questions: [
      q('Pourquoi reformuler une question ambiguë avant de répondre ?', 'Pour valider le besoin et éviter une réponse hors sujet', 'Pour gagner du temps sans répondre', 'Pour obliger le recruteur à donner la solution', 'La clarification des contraintes fait partie du travail d’un développeur senior.'),
      q('Quelle réponse est la plus convaincante à une question de retour d’expérience ?', 'Situation, tâche, actions, résultat et enseignement', 'Une opinion générale sans exemple', 'Le détail chronologique de toute la mission', 'La méthode STAR rend la contribution et son impact faciles à évaluer.'),
      q('Comment répondre à une question comportant plusieurs solutions valides ?', 'Comparer les options selon les contraintes et justifier un choix', 'Présenter une solution comme universelle', 'Refuser de choisir entre les options', 'Une décision d’architecture dépend du contexte, du coût et des risques.')
    ]
  },
  {
    pattern: /Java — fondamentaux/i,
    questions: [
      q('Quel contrat doit respecter equals() avec hashCode() ?', 'Deux objets égaux doivent avoir le même hashCode', 'Deux hashCode égaux garantissent equals', 'hashCode doit être unique pour chaque objet', 'Le contrat est indispensable au bon fonctionnement des collections de hachage.'),
      q('Pourquoi String est-elle immuable en Java ?', 'Son état ne change pas après construction', 'Elle ne peut jamais être comparée', 'Elle est toujours stockée sur la pile', 'L’immutabilité facilite la sécurité, le partage et la mise en cache du hash.'),
      q('Quelle différence principale existe entre checked et unchecked exception ?', 'Une checked exception doit être déclarée ou capturée', 'Une unchecked exception ne peut pas être capturée', 'Une checked exception hérite toujours de Error', 'Les checked exceptions héritent d’Exception hors RuntimeException.')
    ]
  },
  {
    pattern: /Java 11/i,
    questions: [
      q('Quel client HTTP standard est disponible depuis Java 11 ?', 'java.net.http.HttpClient', 'ApacheHttpClient du JDK', 'javax.ws.rs.Client', 'HttpClient prend en charge HTTP/2 et les appels synchrones ou asynchrones.'),
      q('Que permet var dans les paramètres de lambda en Java 11 ?', 'Ajouter notamment des annotations au paramètre', 'Rendre la lambda dynamiquement typée', 'Changer le type pendant l’exécution', 'var conserve le typage statique et permet une syntaxe uniforme avec annotations.'),
      q('Quelle méthode de String ajoutée en Java 11 teste un texte vide ou composé d’espaces ?', 'isBlank()', 'isEmptyTrimmed()', 'hasNoText()', 'isBlank tient compte des caractères d’espacement Unicode.')
    ]
  },
  {
    pattern: /Java 17/i,
    questions: [
      q('Quel avantage apporte une sealed class ?', 'Contrôler explicitement les sous-types autorisés', 'Empêcher toute instanciation', 'Rendre tous les champs immuables', 'sealed, permits, final et non-sealed encadrent une hiérarchie de types.'),
      q('Que permet le pattern matching de instanceof en Java 17 ?', 'Tester et convertir en une seule expression', 'Comparer automatiquement deux objets', 'Créer un proxy dynamique', 'La variable de pattern évite un cast explicite après le test.'),
      q('Quel est le statut des records en Java 17 ?', 'Une forme concise de classe de données immuable', 'Une collection ordonnée', 'Une interface fonctionnelle', 'Un record génère notamment composants, accesseurs, equals, hashCode et toString.')
    ]
  },
  {
    pattern: /Java 21/i,
    questions: [
      q('Quel problème les virtual threads cherchent-ils surtout à résoudre ?', 'Supporter beaucoup de tâches bloquantes avec peu de threads système', 'Accélérer automatiquement les calculs CPU', 'Remplacer les transactions de base de données', 'Les virtual threads rendent le modèle thread-par-requête beaucoup plus scalable pour les I/O.'),
      q('Quel avantage apporte le pattern matching de switch ?', 'Traiter les types de façon exhaustive et lisible', 'Modifier le type d’une variable', 'Exécuter tous les case successivement', 'Les patterns et les guards réduisent les casts et améliorent l’exhaustivité.'),
      q('À quoi servent les sequenced collections introduites en Java 21 ?', 'Uniformiser l’accès au premier, au dernier et à l’ordre inversé', 'Trier automatiquement toutes les collections', 'Garantir que les collections sont thread-safe', 'SequencedCollection fournit une API commune pour les collections ordonnées.')
    ]
  },
  {
    pattern: /Java 25/i,
    questions: [
      q('Quelle règle appliquer avant d’utiliser une fonctionnalité preview de Java ?', 'L’activer explicitement et vérifier sa stabilité pour la production', 'La considérer comme définitivement compatible', 'La compiler sans option particulière', 'Une preview peut encore évoluer et exige --enable-preview à la compilation et à l’exécution.'),
      q('Pourquoi suivre les évolutions du garbage collector dans une nouvelle version Java ?', 'Pour évaluer latence, débit et consommation selon la charge', 'Pour supprimer tous les objets manuellement', 'Pour empêcher le JIT de compiler le code', 'Le choix et le réglage du GC dépendent des objectifs de latence et de débit.'),
      q('Quelle démarche est recommandée pour migrer vers un nouveau JDK ?', 'Tester dépendances, compilation, performances et observabilité progressivement', 'Changer uniquement la variable JAVA_HOME en production', 'Mettre à jour toutes les bibliothèques sans tests', 'Une migration sûre combine compatibilité, tests de non-régression et mesures en charge.')
    ]
  },
  {
    pattern: /Collections et Map/i,
    questions: [
      q('Quelle complexité moyenne offre HashMap pour get et put ?', 'O(1)', 'O(log n) dans tous les cas', 'O(n²)', 'Le hachage donne un accès moyen constant, sous réserve d’une bonne distribution.'),
      q('Quand préférer LinkedHashMap à HashMap ?', 'Quand il faut conserver un ordre d’insertion ou d’accès', 'Quand plusieurs threads écrivent sans synchronisation', 'Quand toutes les clés sont triées naturellement', 'LinkedHashMap maintient une liste chaînée qui préserve un ordre déterministe.'),
      q('Pourquoi une clé mutable est-elle dangereuse dans une HashMap ?', 'Son hash peut changer et rendre l’entrée introuvable', 'Elle transforme automatiquement la Map en Set', 'Elle interdit les valeurs null', 'Les champs utilisés par equals et hashCode doivent rester stables pendant le stockage.')
    ]
  },
  {
    pattern: /Streams et expressions lambda/i,
    questions: [
      q('Pourquoi un Stream Java ne peut-il généralement être consommé qu’une fois ?', 'Une opération terminale ferme le pipeline', 'Le Stream efface toujours la collection source', 'Une lambda ne peut être appelée qu’une fois', 'Un Stream représente un pipeline de calcul, pas une collection réutilisable.'),
      q('Quelle différence existe entre map et flatMap ?', 'flatMap transforme puis aplatit les résultats imbriqués', 'map supprime automatiquement les doublons', 'flatMap trie les éléments', 'flatMap évite d’obtenir un Stream de Streams.'),
      q('Quel risque présente parallelStream() ?', 'Une surcharge ou des effets de bord si la tâche et les données ne s’y prêtent pas', 'Il exécute toujours les éléments dans l’ordre', 'Il rend chaque collection immuable', 'Le parallélisme doit être mesuré et les opérations doivent rester indépendantes.')
    ]
  },
  {
    pattern: /Threads et concurrence/i,
    questions: [
      q('Que garantit le mot-clé volatile ?', 'La visibilité des écritures entre threads, pas l’atomicité composée', 'L’atomicité de toutes les opérations', 'L’exclusion mutuelle du bloc courant', 'volatile établit des garanties de visibilité mais i++ reste non atomique.'),
      q('À quoi sert un ExecutorService ?', 'Découpler la soumission des tâches de la gestion des threads', 'Rendre chaque méthode synchronized', 'Remplacer toutes les files de messages', 'Un pool contrôle le nombre de threads, la file et le cycle de vie.'),
      q('Comment éviter classiquement un deadlock entre deux verrous ?', 'Toujours acquérir les verrous dans le même ordre', 'Ajouter davantage de threads', 'Utiliser uniquement des variables locales', 'Un ordre global d’acquisition supprime l’attente circulaire.')
    ]
  },
  {
    pattern: /Mémoire JVM/i,
    questions: [
      q('Où sont principalement alloués les objets Java ?', 'Dans le heap', 'Dans le metaspace uniquement', 'Dans la pile native du thread', 'Le heap est partagé et géré par le garbage collector.'),
      q('Que contient principalement le metaspace ?', 'Les métadonnées des classes chargées', 'Les variables locales de chaque méthode', 'Les connexions JDBC ouvertes', 'Depuis Java 8, le metaspace remplace PermGen et utilise la mémoire native.'),
      q('Qu’est-ce qu’une fuite mémoire en Java malgré le garbage collector ?', 'Des objets inutiles restent accessibles par des références', 'Un objet local est libéré après la méthode', 'Le JIT compile trop de méthodes', 'Le GC ne peut collecter qu’un objet devenu inatteignable.')
    ]
  },
  {
    pattern: /Spring & Spring Boot/i,
    questions: [
      q('Pourquoi privilégier l’injection par constructeur ?', 'Elle rend les dépendances obligatoires et facilite les tests', 'Elle crée toujours un nouveau bean', 'Elle évite totalement les cycles de dépendances', 'Le constructeur favorise l’immutabilité et rend les dépendances explicites.'),
      q('Quelle différence principale existe entre @Component et @Bean ?', '@Component est détecté par scan, @Bean est déclaré dans une configuration', '@Bean ne peut créer que des services', '@Component désactive l’injection', 'Les deux enregistrent un bean, mais par des mécanismes différents.'),
      q('À quoi sert l’auto-configuration Spring Boot ?', 'Configurer des beans selon le classpath, les propriétés et les beans présents', 'Télécharger automatiquement le JDK', 'Créer la base de données de production', 'Les conditions d’auto-configuration fournissent des valeurs par défaut surchargeables.')
    ]
  },
  {
    pattern: /Spring Security/i,
    questions: [
      q('Quelle différence existe entre OAuth2 et OpenID Connect ?', 'OIDC ajoute une couche d’identité et un ID token à OAuth2', 'OAuth2 chiffre les mots de passe et OIDC les stocke', 'OIDC remplace toujours HTTPS', 'OAuth2 délègue l’autorisation ; OIDC standardise aussi l’authentification.'),
      q('Pourquoi un access token JWT doit-il avoir une durée de vie courte ?', 'Pour limiter l’impact d’un vol de jeton', 'Pour réduire la taille de la base SQL', 'Pour empêcher toute révocation', 'Un jeton autoporteur volé reste utilisable jusqu’à son expiration.'),
      q('Où valider les autorisations métier sensibles ?', 'Côté serveur, au niveau adapté de l’API ou du service', 'Uniquement dans l’interface Angular', 'Dans le navigateur après la réponse', 'Le client ne constitue jamais une frontière de sécurité fiable.')
    ]
  },
  {
    pattern: /Transactions avancées/i,
    questions: [
      q('Pourquoi @Transactional peut ne pas fonctionner lors d’un appel interne à la même classe ?', 'L’appel ne passe pas par le proxy Spring', 'La base refuse les méthodes privées', 'JPA désactive automatiquement le commit', 'La gestion transactionnelle Spring est généralement appliquée par un proxy.'),
      q('Quel problème résout l’isolation SERIALIZABLE ?', 'Elle évite les anomalies en simulant une exécution séquentielle', 'Elle accélère toutes les lectures', 'Elle supprime le besoin de transaction', 'Cette isolation est forte mais peut réduire la concurrence.'),
      q('Quand utiliser REQUIRES_NEW ?', 'Quand une opération doit avoir une transaction indépendante', 'Pour joindre obligatoirement la transaction existante', 'Pour exécuter sans transaction', 'La transaction courante est suspendue et une nouvelle transaction est créée.')
    ]
  },
  {
    pattern: /Hibernate & JPA/i,
    questions: [
      q('Qu’est-ce que le problème N+1 ?', 'Une requête charge les parents puis une requête supplémentaire par relation', 'Une transaction exécute exactement N plus une écritures', 'Un index contient trop de colonnes', 'Un fetch join, un EntityGraph ou un batch adapté peut réduire ces accès.'),
      q('Quelle différence existe entre LAZY et EAGER ?', 'LAZY diffère le chargement, EAGER le demande immédiatement', 'LAZY interdit les relations', 'EAGER met toujours les données en cache distribué', 'Le choix influence le volume chargé et le risque de requêtes inutiles.'),
      q('À quoi sert @Version ?', 'À détecter les mises à jour concurrentes par verrouillage optimiste', 'À versionner le schéma SQL', 'À sélectionner la version de Java', 'La colonne de version permet de lever une erreur si l’entité a changé entre lecture et écriture.')
    ]
  },
  {
    pattern: /SQL, modélisation/i,
    questions: [
      q('Pourquoi l’ordre des colonnes d’un index composite est-il important ?', 'Il détermine les préfixes exploitables par les requêtes', 'Il change l’ordre physique de toutes les lignes', 'Il empêche toute mise à jour', 'Un index (a,b) aide typiquement les filtres sur a, puis sur a et b.'),
      q('Que faut-il examiner dans un plan EXPLAIN ?', 'Les scans, estimations, jointures et volumes de lignes', 'Uniquement le texte de la requête', 'Seulement le nombre de colonnes retournées', 'Le plan révèle comment l’optimiseur accède aux données et où se trouve le coût.'),
      q('Quel compromis entraîne l’ajout d’un index ?', 'Des lectures souvent plus rapides mais des écritures et du stockage supplémentaires', 'Des écritures toujours plus rapides', 'La suppression du besoin de contraintes', 'Chaque index doit être maintenu lors des insertions, mises à jour et suppressions.')
    ]
  },
  {
    pattern: /Cache applicatif/i,
    questions: [
      q('Quel risque principal introduit le cache-aside ?', 'Servir une donnée obsolète si l’invalidation est incorrecte', 'Empêcher toute montée en charge', 'Supprimer automatiquement la source de vérité', 'L’application doit coordonner lecture, remplissage et invalidation du cache.'),
      q('Comment limiter un cache stampede ?', 'Utiliser verrou, single-flight, jitter ou rafraîchissement anticipé', 'Donner le même TTL exact à toutes les clés', 'Désactiver toutes les expirations', 'Il faut éviter que de nombreuses requêtes recalculent simultanément la même valeur.'),
      q('Pourquoi ajouter du jitter au TTL ?', 'Pour éviter l’expiration simultanée d’un grand nombre de clés', 'Pour chiffrer les valeurs', 'Pour rendre les clés uniques', 'Une variation aléatoire répartit la charge de rechargement dans le temps.')
    ]
  },
  {
    pattern: /API REST & tests unitaires/i,
    questions: [
      q('Quelle propriété rend PUT idempotent ?', 'Répéter la même requête produit le même état final attendu', 'PUT ne retourne jamais de corps', 'PUT crée toujours une nouvelle ressource', 'L’idempotence concerne l’effet serveur, pas l’identité des réponses réseau.'),
      q('Quand retourner HTTP 201 ?', 'Après la création réussie d’une ressource', 'Après toute lecture réussie', 'Quand le client est non authentifié', 'Une création REST renvoie souvent 201 et l’URI dans Location.'),
      q('Que doit isoler un test unitaire ?', 'Une unité de comportement avec des dépendances contrôlées', 'Toute l’application et sa base réelle', 'Uniquement les méthodes privées', 'Un test unitaire doit être rapide, déterministe et focalisé.')
    ]
  },
  {
    pattern: /Résilience avec Resilience4j/i,
    questions: [
      q('À quoi sert un circuit breaker ?', 'À arrêter temporairement les appels vers un service fortement défaillant', 'À réessayer sans limite', 'À répartir les données entre partitions', 'Il protège les ressources et teste ensuite la récupération en état half-open.'),
      q('Pourquoi ajouter du backoff et du jitter aux retries ?', 'Pour éviter de surcharger simultanément un service en difficulté', 'Pour rendre les appels transactionnels', 'Pour garantir que toute requête réussit', 'Des retries synchronisés peuvent amplifier une panne au lieu de l’atténuer.'),
      q('Quel appel ne doit pas être réessayé aveuglément ?', 'Une opération non idempotente sans clé d’idempotence', 'Une lecture idempotente temporairement indisponible', 'Une requête avec timeout court', 'Un retry peut dupliquer un paiement ou une commande si le premier appel a abouti.')
    ]
  },
  {
    pattern: /HTTP, JUnit/i,
    questions: [
      q('Quelle différence existe entre HTTP 401 et 403 ?', '401 indique une authentification absente ou invalide, 403 un accès refusé', '401 signifie ressource absente, 403 erreur serveur', 'Les deux signifient toujours la même chose', 'Le serveur distingue l’identité non établie de l’autorisation insuffisante.'),
      q('À quoi sert @ParameterizedTest dans JUnit 5 ?', 'Exécuter le même test avec plusieurs jeux de données', 'Partager une transaction entre tous les tests', 'Démarrer automatiquement Spring Boot', 'Les sources de valeurs réduisent la duplication des cas de test.'),
      q('Que valide @Valid dans un contrôleur Spring ?', 'Les contraintes Bean Validation portées par l’objet reçu', 'Le token OAuth2 uniquement', 'La syntaxe SQL de la requête', 'Les annotations comme @NotNull ou @Size sont évaluées sur l’objet.')
    ]
  },
  {
    pattern: /Tests d’intégration/i,
    questions: [
      q('Pourquoi utiliser Testcontainers ?', 'Tester avec de vrais services isolés lancés dans des conteneurs', 'Remplacer tous les tests unitaires', 'Déployer automatiquement en production', 'Il rapproche le test des versions réelles de PostgreSQL, Kafka ou Redis.'),
      q('Quel avantage apporte @DynamicPropertySource ?', 'Injecter dynamiquement les URL et ports fournis par les conteneurs', 'Créer des mocks Mockito', 'Désactiver le contexte Spring', 'Les ports Testcontainers sont souvent aléatoires et doivent être transmis au contexte.'),
      q('Que doit vérifier un bon test d’intégration repository ?', 'Mapping, requêtes, contraintes et comportement transactionnel réel', 'Seulement que le mock a été appelé', 'Uniquement les getters de l’entité', 'Le but est de détecter les écarts entre le code JPA et la vraie base.')
    ]
  },
  {
    pattern: /Observabilité/i,
    questions: [
      q('Quelle différence existe entre métriques, logs et traces ?', 'Les métriques agrègent, les logs décrivent des événements, les traces suivent une requête', 'Les trois sont des synonymes', 'Les traces remplacent toujours les logs', 'Les trois signaux sont complémentaires pour diagnostiquer un système distribué.'),
      q('Pourquoi propager un traceId entre services ?', 'Pour corréler les opérations d’une même requête distribuée', 'Pour authentifier automatiquement l’utilisateur', 'Pour remplacer l’identifiant métier en base', 'Le contexte de trace relie spans, logs et latences de bout en bout.'),
      q('Que mesure un SLI ?', 'Un indicateur réel de fiabilité perçue par l’utilisateur', 'Une promesse contractuelle uniquement', 'Le nombre de développeurs du service', 'Disponibilité ou latence peuvent alimenter un SLO mesurable.')
    ]
  },
  {
    pattern: /Architecture logicielle/i,
    questions: [
      q('Quel objectif poursuit l’architecture hexagonale ?', 'Isoler le domaine des détails techniques via ports et adaptateurs', 'Créer obligatoirement des microservices', 'Supprimer toutes les interfaces', 'Le cœur métier dépend d’abstractions et non des frameworks externes.'),
      q('Pourquoi rechercher une forte cohésion ?', 'Pour regrouper les responsabilités qui évoluent ensemble', 'Pour concentrer tout le code dans une classe', 'Pour multiplier les dépendances circulaires', 'Une forte cohésion rend les composants plus compréhensibles et maintenables.'),
      q('Quel signal indique un couplage excessif ?', 'Une petite modification impose des changements dans de nombreux modules', 'Un module possède des tests unitaires', 'Une interface masque une implémentation', 'Le ripple effect révèle des frontières de composants fragiles.')
    ]
  },
  {
    pattern: /Architecture distribuée/i,
    questions: [
      q('Pourquoi une livraison exactly-once est-elle difficile dans un système distribué ?', 'Les pannes et retries créent une incertitude sur le traitement effectif', 'TCP interdit les accusés de réception', 'Une base ne peut jamais avoir de transaction', 'On vise souvent at-least-once avec idempotence et déduplication.'),
      q('À quoi sert le pattern Outbox ?', 'Publier fiablement un événement lié à une transaction locale', 'Mettre en cache les réponses HTTP', 'Répartir la charge CPU', 'La donnée métier et l’événement sont écrits atomiquement avant publication asynchrone.'),
      q('Pourquoi accepter l’eventual consistency ?', 'Pour découpler et rendre disponibles des services distribués', 'Pour garantir une lecture immédiatement à jour partout', 'Pour supprimer les conflits métier', 'La convergence différée exige des règles métier et une UX adaptées.')
    ]
  },
  {
    pattern: /System design/i,
    questions: [
      q('Quelle est la première étape d’un exercice de system design ?', 'Clarifier les exigences fonctionnelles, le volume et les contraintes', 'Dessiner immédiatement vingt microservices', 'Choisir une base NoSQL sans estimation', 'Les décisions découlent des besoins, des ordres de grandeur et des SLO.'),
      q('Pourquoi estimer le trafic et le stockage ?', 'Pour dimensionner les composants et identifier les goulots', 'Pour obtenir une valeur exacte sur dix ans', 'Pour éviter de discuter des compromis', 'Des estimations simples orientent partitionnement, cache et capacité réseau.'),
      q('Comment présenter un compromis CAP ?', 'Relier cohérence et disponibilité au comportement pendant une partition', 'Choisir systématiquement les trois propriétés', 'Affirmer que CAP ne concerne que SQL', 'En présence d’une partition, il faut arbitrer selon les besoins métier.')
    ]
  },
  {
    pattern: /Conception logicielle/i,
    questions: [
      q('Que signifie le principe de responsabilité unique ?', 'Une classe doit avoir une seule raison métier de changer', 'Une classe ne doit avoir qu’une méthode', 'Chaque service doit avoir un seul utilisateur', 'Le principe concerne les axes de changement, pas le nombre de lignes.'),
      q('Pourquoi programmer contre une abstraction ?', 'Pour réduire le couplage à une implémentation concrète', 'Pour éviter tous les tests', 'Pour rendre chaque méthode statique', 'Une interface stable facilite substitution, test et évolution.'),
      q('Quand une abstraction devient-elle prématurée ?', 'Quand elle généralise sans second besoin concret ni variation identifiée', 'Dès qu’elle utilise une interface', 'Quand elle possède une documentation', 'Une abstraction spéculative ajoute du coût sans simplifier un changement réel.')
    ]
  },
  {
    pattern: /Bonnes pratiques & Design Patterns/i,
    questions: [
      q('Quel problème résout Strategy ?', 'Changer un algorithme interchangeable sans multiplier les conditions', 'Garantir une instance unique', 'Construire un objet complexe étape par étape', 'Chaque stratégie encapsule une variante derrière un contrat commun.'),
      q('Quand utiliser Decorator ?', 'Ajouter dynamiquement des responsabilités sans modifier la classe décorée', 'Créer une famille d’objets liés', 'Gérer une transaction distribuée', 'Les décorateurs s’empilent tout en respectant la même interface.'),
      q('Pourquoi Singleton est-il souvent critiqué ?', 'Il introduit un état global et complique l’isolation des tests', 'Il crée toujours plusieurs instances', 'Il interdit l’injection de dépendances', 'Son cycle de vie implicite masque les dépendances et favorise le couplage.')
    ]
  },
  {
    pattern: /TDD, BDD & DDD/i,
    questions: [
      q('Quel est le cycle classique du TDD ?', 'Red, Green, Refactor', 'Build, Deploy, Monitor', 'Given, When, Then uniquement', 'On écrit un test en échec, le minimum pour le réussir, puis on améliore le code.'),
      q('À quoi sert le langage ubiquitaire en DDD ?', 'Partager les mêmes termes précis entre métier et développeurs', 'Traduire automatiquement le code', 'Remplacer les tests d’acceptation', 'Le modèle et les conversations utilisent le même vocabulaire métier.'),
      q('Qu’est-ce qu’un bounded context ?', 'Une frontière où un modèle métier garde un sens cohérent', 'Une limite de mémoire JVM', 'Un type de transaction SQL', 'Un même terme peut avoir des modèles différents selon les contextes.')
    ]
  },
  {
    pattern: /Algorithmique — Top 40/i,
    questions: [
      q('Quelle structure permet de résoudre efficacement Two Sum ?', 'Une HashMap des valeurs déjà rencontrées', 'Une pile uniquement', 'Un arbre binaire complet obligatoire', 'On recherche le complément en O(1) moyen pour obtenir O(n).'),
      q('Quel invariant utilise une fenêtre glissante ?', 'Une plage contiguë ajustée tout en maintenant une propriété', 'Le tableau reste toujours trié', 'Chaque élément est visité exactement deux fois dans tous les algorithmes', 'La fenêtre évite de recalculer toute la plage à chaque déplacement.'),
      q('Quelle structure est utilisée par le parcours BFS ?', 'Une file FIFO', 'Une pile LIFO', 'Une HashMap triée', 'La file traite les nœuds niveau par niveau.')
    ]
  },
  {
    pattern: /Angular — fondamentaux/i,
    questions: [
      q('Quelle différence existe entre interpolation et property binding ?', 'L’interpolation produit du texte, le property binding affecte une propriété DOM ou composant', 'Les deux déclenchent toujours une requête HTTP', 'Le property binding fonctionne uniquement avec les chaînes', 'Le choix dépend de la cible et du type de valeur à transmettre.'),
      q('À quoi sert un service Angular injectable ?', 'Partager une logique ou un état avec un cycle de vie contrôlé', 'Créer automatiquement une route', 'Remplacer le template HTML', 'L’injection de dépendances découple les composants de l’implémentation.'),
      q('Pourquoi utiliser trackBy dans une liste ngFor ?', 'Éviter de recréer inutilement les éléments DOM stables', 'Trier automatiquement la liste', 'Charger les données depuis le serveur', 'Une identité stable améliore les performances et conserve l’état des éléments.')
    ]
  },
  {
    pattern: /Angular — cours/i,
    questions: [
      q('Pourquoi préférer le pipe async à une souscription manuelle simple dans un template ?', 'Il gère la souscription et le désabonnement avec le cycle de vue', 'Il rend tout Observable synchrone', 'Il transforme automatiquement les erreurs en succès', 'Le pipe async réduit les fuites et déclenche correctement la détection.'),
      q('Quel est le rôle d’un route guard ?', 'Autoriser, refuser ou rediriger une navigation selon une règle', 'Sécuriser à lui seul l’API backend', 'Compiler les composants en avance', 'Un guard améliore le flux client, mais le serveur doit toujours contrôler les droits.'),
      q('Pourquoi découper une application en composants spécialisés ?', 'Améliorer cohésion, réutilisation et testabilité', 'Supprimer toute communication entre vues', 'Garantir qu’aucun état ne change', 'Des responsabilités claires limitent les composants monolithiques.')
    ]
  },
  {
    pattern: /Questions d'entretien Angular/i,
    questions: [
      q('Quelle différence existe entre Subject et BehaviorSubject ?', 'BehaviorSubject conserve et émet une valeur courante aux nouveaux abonnés', 'Subject ne peut avoir qu’un abonné', 'BehaviorSubject termine automatiquement', 'BehaviorSubject exige une valeur initiale et rejoue la dernière valeur.'),
      q('Comment limiter les fuites liées aux subscriptions ?', 'Utiliser async pipe, takeUntilDestroyed ou un mécanisme de destruction', 'Mettre toutes les subscriptions dans un tableau sans les fermer', 'Transformer chaque Observable en Promise globale', 'Une souscription longue doit suivre le cycle de vie du composant.'),
      q('Quel effet a ChangeDetectionStrategy.OnPush ?', 'Limiter les vérifications selon les entrées, événements et signaux observés', 'Désactiver définitivement l’affichage', 'Rendre tous les objets immuables automatiquement', 'OnPush réduit le travail mais demande une gestion prévisible des changements.')
    ]
  },
  {
    pattern: /Angular 17/i,
    questions: [
      q('Quelle nouveauté de template Angular 17 remplace souvent *ngIf ?', 'Le bloc @if', 'La directive @inject', 'Le décorateur @Repeat', '@if, @for et @switch offrent un contrôle de flux intégré.'),
      q('Quel avantage apporte @defer ?', 'Retarder le chargement d’une partie de l’interface selon un déclencheur', 'Exécuter les requêtes sans authentification', 'Désactiver le lazy loading des routes', '@defer réduit le travail initial et permet placeholder, loading et error.'),
      q('Pourquoi les composants standalone simplifient-ils Angular ?', 'Ils déclarent directement leurs imports sans NgModule obligatoire', 'Ils ne peuvent utiliser aucun service', 'Ils s’exécutent sans navigateur', 'Les dépendances du composant deviennent locales et explicites.')
    ]
  },
  {
    pattern: /Angular 22/i,
    questions: [
      q('Quelle précaution prendre avec les nouveautés d’une version Angular récente ?', 'Vérifier le statut stable ou preview et le guide de migration', 'Activer toutes les previews en production sans test', 'Ignorer les peer dependencies', 'Une migration fiable s’appuie sur la documentation, les tests et des étapes contrôlées.'),
      q('Pourquoi privilégier les signals pour un état local synchrone ?', 'Ils exposent des dépendances réactives fines et lisibles', 'Ils remplacent tous les appels HTTP', 'Ils rendent RxJS inutilisable', 'Signals et RxJS sont complémentaires selon la nature synchrone ou événementielle du flux.'),
      q('Que faut-il mesurer après une migration Angular ?', 'Build, tests, taille des bundles et performances runtime', 'Uniquement le nombre de fichiers TypeScript', 'Seulement le temps de démarrage du poste développeur', 'Une montée de version doit préserver comportement et budgets de performance.')
    ]
  },
  {
    pattern: /Kafka, OpenSearch, Docker et Kubernetes/i,
    questions: [
      q('Comment Kafka garantit-il l’ordre des messages ?', 'À l’intérieur d’une même partition', 'Entre toutes les partitions d’un cluster', 'Uniquement avec un consumer unique mondial', 'La clé de partitionnement doit regrouper les événements qui exigent un ordre commun.'),
      q('Pourquoi définir un mapping explicite dans OpenSearch ?', 'Pour contrôler les types, analyseurs et recherches', 'Pour supprimer le besoin d’index', 'Pour rendre toutes les chaînes numériques', 'Un mapping incorrect peut produire des recherches incohérentes ou coûteuses.'),
      q('Quel rôle joue un readiness probe Kubernetes ?', 'Indiquer si le pod peut recevoir du trafic', 'Redémarrer systématiquement le nœud', 'Construire l’image Docker', 'Un pod non prêt reste hors des endpoints du Service.')
    ]
  },
  {
    pattern: /Docker — pratique/i,
    questions: [
      q('Pourquoi utiliser un build Docker multi-stage ?', 'Séparer compilation et image runtime pour réduire la taille', 'Exécuter plusieurs conteneurs dans la même image', 'Partager automatiquement les secrets', 'L’image finale ne conserve que les artefacts et dépendances nécessaires.'),
      q('Quelle différence existe entre image et conteneur ?', 'L’image est un modèle immuable, le conteneur une instance en exécution', 'Le conteneur construit toujours plusieurs images', 'L’image contient obligatoirement un système complet', 'Plusieurs conteneurs peuvent être créés à partir de la même image.'),
      q('Pourquoi ne pas stocker un secret dans un Dockerfile ?', 'Il peut rester dans les couches et l’historique de l’image', 'Docker chiffre toujours les fichiers', 'Le secret empêche le réseau de fonctionner', 'Les secrets doivent être injectés par un mécanisme dédié au runtime ou au build.')
    ]
  },
  {
    pattern: /Camunda BPM/i,
    questions: [
      q('Quelle différence existe entre une user task et une service task ?', 'La user task attend une action humaine, la service task automatise un traitement', 'La service task ne peut appeler aucun code', 'La user task termine toujours immédiatement', 'Le type de tâche traduit la responsabilité humaine ou technique dans le processus.'),
      q('Pourquoi modéliser une erreur métier avec une BPMN Error ?', 'Pour permettre au processus de suivre un chemin métier prévu', 'Pour provoquer uniquement un incident technique', 'Pour supprimer l’instance de processus', 'Une boundary error peut intercepter l’erreur et déclencher une alternative métier.'),
      q('À quoi sert une external task dans Camunda 7 ?', 'Faire exécuter un travail par un worker externe via polling et verrou', 'Créer une transaction distribuée globale', 'Remplacer toutes les user tasks', 'Le worker récupère, verrouille puis complète ou échoue la tâche de façon découplée.')
    ]
  },
  {
    pattern: /Entretien BNP Paribas/i,
    questions: [
      q('Dans un système de messages financiers, pourquoi l’idempotence est-elle essentielle ?', 'Pour éviter le double traitement lors des retries ou doublons', 'Pour supprimer toute journalisation', 'Pour garantir un réseau sans panne', 'Une clé métier et un stockage du résultat protègent contre les doubles effets.'),
      q('Comment sécuriser un traitement de message critique ?', 'Valider, tracer, dédupliquer et prévoir reprise ou dead-letter queue', 'Ignorer les messages invalides sans trace', 'Faire des retries infinis sans délai', 'Le traitement doit être observable, borné et récupérable.'),
      q('Quel élément est important pour auditer une opération bancaire ?', 'Une trace horodatée, corrélée et non ambiguë des décisions', 'Uniquement le dernier état affiché', 'Un log local supprimé après traitement', 'L’auditabilité exige une piste exploitable sans exposer les données sensibles.')
    ]
  }
];

export function quizDefinitionsFor(title: string): QuizDefinition[] | undefined {
  return QUIZ_BANK.find(entry => entry.pattern.test(title))?.questions;
}
