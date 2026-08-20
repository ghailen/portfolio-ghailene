interface ReviewableCourseItem {
  type: 'paragraph' | 'table' | 'algorithm';
  location: string;
  index: number;
  document?: string;
  style?: string;
  text?: string;
  images?: string[];
  rows?: string[][];
}

const CORRECTIONS: Record<string, string> = {
  'entretien-general-23': 'Un tableau d’objets stocke des références vers les objets, ou null. La taille d’une référence n’est pas fixée par le langage Java : elle dépend de la JVM, de l’architecture et de réglages tels que les compressed ordinary object pointers. Il ne faut donc pas affirmer qu’elle vaut toujours 4 octets.',
  'entretien-general-33': 'Correction : hashCode() renvoie un entier utilisé par les collections de hachage pour déterminer un bucket. Ce nombre n’est ni une adresse mémoire ni une référence vers l’objet. Deux objets différents peuvent avoir le même hash code : c’est une collision normale. Si equals() retourne true, les deux objets doivent avoir le même hash code ; l’inverse n’est pas obligatoire.',
  'entretien-general-39': 'ArrayList utilise un tableau dynamique ; LinkedList une liste doublement chaînée. ArrayList est généralement plus rapide pour l’accès par index, l’itération et même de nombreux ajouts grâce à la localité mémoire. LinkedList n’est avantageuse pour une insertion ou suppression que si l’on possède déjà un ListIterator positionné au bon nœud. La recherche de la position reste en O(n).',
  'entretien-general-40': 'Supprimer ou insérer au milieu d’un ArrayList décale des références et coûte O(n). Dans LinkedList, trouver l’élément coûte O(n), puis la modification des liens coûte O(1). Il est donc incorrect de dire globalement que LinkedList est plus rapide ; le choix dépend de l’opération, et ArrayList est le meilleur choix par défaut dans la majorité des applications.',
  'entretien-general-52': 'Créer une exception métier unchecked en étendant RuntimeException est une pratique courante lorsque l’appelant ne peut pas raisonnablement récupérer localement de l’erreur. Une checked exception convient lorsque le contrat impose explicitement une récupération. Le choix doit être documenté ; il ne faut ni interdire systématiquement les exceptions unchecked, ni utiliser RuntimeException pour masquer toute erreur.',
  'entretien-general-55': 'Une checked exception, comme IOException, doit être capturée ou déclarée avec throws au moment de la compilation. Une unchecked exception étend RuntimeException et n’impose pas cette déclaration. Le compilateur vérifie le traitement déclaré, pas le fait que l’erreur se produira ou non.',
  'entretien-general-264': 'Correction : @Transactional n’a pas été introduit par Hibernate 5. L’annotation utilisée le plus souvent vient de Spring Framework (org.springframework.transaction.annotation.Transactional) ou de Jakarta Transactions. Hibernate participe à la transaction comme fournisseur JPA, mais la délimitation déclarative est gérée par Spring ou Jakarta.',
  'preparation-generale-aux-entretiens-3530': 'En Java, tous les paramètres sont passés par valeur. Pour une primitive, la valeur primitive est copiée. Pour un objet, la valeur copiée est la référence : la méthode peut modifier l’objet référencé, mais réaffecter le paramètre local ne change pas la variable de l’appelant. Java ne possède pas de passage par référence au sens C++.'
};

const ANSWERS: Record<string, string> = {
  'entretien-general-1194': 'Réponse revue : javac compile le code source en bytecode. La JVM commence par charger et vérifier ce bytecode ; l’interpréteur peut l’exécuter immédiatement, puis le compilateur JIT transforme les chemins fréquemment exécutés en code machine optimisé. Java peut avoir un coût de démarrage et de chauffe, mais le JIT, le profilage à l’exécution et les optimisations de la JVM évitent qu’il soit simplement « interprété et lent ».',
  'entretien-general-1258': 'Exemple de réponse : « Le poste combine les sujets sur lesquels je peux être rapidement utile — Java, Spring, Angular et qualité logicielle — avec des enjeux d’architecture et de production qui me permettent encore de progresser. Je recherche surtout une équipe qui partage les décisions, mesure la qualité en production et me laisse prendre la responsabilité d’un sujet de bout en bout. » Adapter cette réponse à l’entreprise et citer un élément précis de l’offre.',
  'entretien-general-1259': 'Exemple de réponse : « À moyen terme, je souhaite devenir le référent fiable d’un périmètre et accompagner les développeurs moins expérimentés. À plus long terme, je veux évoluer vers davantage de conception et de leadership technique sans perdre le contact avec le code et la production. » Éviter les titres vagues et relier l’ambition aux besoins du poste.',
  'preparation-generale-aux-entretiens-3374': 'Réponse revue : les tris classiques sont le tri à bulles, par sélection et par insertion en O(n²), puis quicksort, mergesort et heapsort en O(n log n) en moyenne ou au pire selon l’algorithme. Il n’existe pas de tri universellement « le plus rapide » : cela dépend de la taille, de l’ordre initial, de la stabilité, de la mémoire et du type des données. En Java, préférer Arrays.sort ou List.sort ; leur implémentation est optimisée et peut varier selon le type et la version.',
  'preparation-generale-aux-entretiens-3467': 'Réponse revue : une pile est une structure LIFO — dernier entré, premier sorti. Les opérations principales sont push, pop et peek, normalement en O(1). En Java, préférer Deque avec ArrayDeque plutôt que l’ancienne classe Stack. Cas d’usage : parcours en profondeur, annulation, pile d’appels et validation de parenthèses.',
  'preparation-generale-aux-entretiens-3525': 'Réponse revue pour Java : Java utilise uniquement le passage par valeur. Une primitive est copiée ; pour un objet, la valeur de la référence est copiée. La méthode peut donc modifier l’état de l’objet partagé, mais elle ne peut pas réaffecter la variable de l’appelant. Cette distinction évite l’expression trompeuse « passage d’objet par référence ».',
  'preparation-generale-aux-entretiens-3857': 'Réponse revue : le catalogue GoF décrit 23 patterns répartis en création, structure et comportement, mais réciter le nombre ne suffit pas. Pour un profil expérimenté, expliquer quand utiliser Strategy, Factory, Adapter, Decorator, Observer et Template Method, ainsi que leurs coûts. Ajouter les patterns d’architecture réellement pratiqués : hexagonale, repository, outbox, saga ou CQRS selon le contexte.',
  'preparation-generale-aux-entretiens-3879': 'Réponse revue : la composition favorise un couplage plus faible, le remplacement d’un comportement et les tests isolés ; elle évite aussi les hiérarchies fragiles. L’héritage est pertinent pour une vraie relation « est-un » avec un contrat stable et permet le polymorphisme, mais couple fortement la sous-classe aux détails du parent. Règle pratique : préférer la composition pour réutiliser un comportement, réserver l’héritage à une abstraction métier claire.',
  'preparation-generale-aux-entretiens-3910': 'Réponse revue : la valeur du CAC 40 change en continu pendant la séance ; il faut la vérifier le jour de l’entretien sur une source de marché plutôt que mémoriser un chiffre. Il est plus important d’expliquer qu’il s’agit d’un indice de 40 grandes valeurs cotées à Paris, pondéré notamment par la capitalisation flottante, avec une composition révisée périodiquement.',
  'preparation-generale-aux-entretiens-3937': 'Réponse revue : un sous-jacent est l’actif ou la référence dont dépend un produit dérivé. Exemples : action, indice, obligation, taux d’intérêt, devise, matière première, crédit, volatilité ou cryptoactif. Il faut pouvoir relier chaque sous-jacent à un risque : marché, taux, change, crédit ou liquidité.',
  'preparation-generale-aux-entretiens-3947': 'Réponse revue : une action ordinaire peut donner droit à une part des dividendes décidés par l’assemblée, à un droit de vote, à l’information des actionnaires et, selon les règles applicables, à participer à certaines augmentations de capital. Le dividende n’est jamais garanti et les droits peuvent varier selon la catégorie d’action.',
  'preparation-generale-aux-entretiens-3965': 'Réponse revue : l’écart théorique entre le prix future et le prix spot s’explique par le coût de portage : financement, stockage éventuel, assurance, revenus ou dividendes du sous-jacent et rendement de convenance. Une formule simplifiée est F ≈ S × e^((r + coûts − revenus)T). L’offre, la demande et les contraintes de marché peuvent créer des écarts temporaires.',
  'preparation-generale-aux-entretiens-3966': 'Réponse revue : une option donne à l’acheteur le droit, sans obligation, d’acheter — call — ou de vendre — put — un sous-jacent à un prix d’exercice. Les caractéristiques essentielles sont le sous-jacent, le strike, l’échéance, le style d’exercice, la taille du contrat et la prime. Le vendeur reçoit la prime et porte l’obligation correspondante.',
  'preparation-generale-aux-entretiens-3969': 'Réponse revue : le prix d’une option dépend principalement du prix du sous-jacent, du strike, du temps restant, de la volatilité attendue, des taux d’intérêt et des dividendes ou revenus. La volatilité et la maturité augmentent généralement la valeur temps. Les sensibilités sont résumées par les Greeks : delta, gamma, vega, theta et rho.',
  'preparation-generale-aux-entretiens-3970': 'Réponse revue : un future est un contrat standardisé négocié sur un marché organisé, avec chambre de compensation, appels de marge et règlement quotidien. Un forward est un contrat de gré à gré personnalisable, réglé généralement à l’échéance et exposé davantage au risque de contrepartie. Les deux fixent aujourd’hui les conditions d’un échange futur.',
  'entretien-bnp-paribas-4103': 'Réponse revue : javac compile un fichier .java en bytecode stocké dans un fichier .class. La JVM charge, vérifie et exécute ce bytecode par interprétation et compilation JIT vers le code machine de la plateforme.',
  'entretien-bnp-paribas-4104': 'Réponse revue : la JVM ne se limite pas à interpréter chaque instruction. Le JIT compile les méthodes fréquemment exécutées en code machine et peut les optimiser grâce au profil d’exécution. Les performances finales peuvent être proches du natif, au prix d’un démarrage et d’une phase de chauffe.',
  'entretien-bnp-paribas-4132': 'Réponse revue : un test d’intégration vérifie la collaboration réelle entre plusieurs composants techniques — application, base, broker ou API — et cherche les erreurs de configuration ou de contrat. Un test fonctionnel vérifie un comportement métier observable à partir d’un scénario utilisateur ou d’une API. Un même test peut être à la fois fonctionnel et d’intégration selon son périmètre.',
  'entretien-bnp-paribas-4155': 'Exemple de réponse : relier trois éléments concrets — le domaine de l’entreprise, les responsabilités du poste et la manière de travailler de l’équipe — à votre expérience. Donner un exemple de contribution possible dans les premiers mois plutôt que répondre seulement « le challenge » ou « apprendre ».',
  'entretien-bnp-paribas-4156': 'Exemple de réponse : viser une progression crédible vers le rôle de référent technique, la conception et le mentorat, tout en restant impliqué dans le développement et la production. Montrer que cette trajectoire peut se construire dans l’entreprise au lieu de présenter le poste comme une étape temporaire.',
  'entretien-bnp-paribas-4157': 'Exemple de réponse : « Java LTS, Spring Boot, PostgreSQL, Kafka lorsque l’asynchronisme est justifié, Angular récent, tests avec JUnit/Testcontainers, observabilité OpenTelemetry et déploiement automatisé. Mais je choisis la stack à partir des contraintes ; ma stack idéale est surtout celle que l’équipe sait opérer durablement. »'
};

const TYPOGRAPHY_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bequal\(\)/gi, 'equals()'],
  [/\bhashmap\b/gi, 'HashMap'],
  [/\bhashset\b/gi, 'HashSet'],
  [/\barraylist\b/gi, 'ArrayList'],
  [/\blinkedlist\b/gi, 'LinkedList'],
  [/\bspringboot\b/gi, 'Spring Boot'],
  [/\bjavascript\b/gi, 'JavaScript'],
  [/\bjunit\b/gi, 'JUnit'],
  [/\bgarbage collector\b/gi, 'Garbage Collector']
];

export function reviewCourseItems<T extends ReviewableCourseItem>(items: T[]): T[] {
  const reviewed: T[] = [];

  for (const item of items) {
    const key = `${item.document || 'entretien-general'}-${item.index}`;
    const correctedText = item.text ? normalizeTypography(CORRECTIONS[key] || item.text) : item.text;
    reviewed.push({ ...item, text: correctedText });

    const answer = ANSWERS[key];
    if (answer) {
      reviewed.push({
        ...item,
        index: item.index + 0.01,
        style: 'Answer',
        text: answer,
        images: undefined,
        rows: undefined
      });
    }
  }

  return reviewed;
}

function normalizeTypography(text: string): string {
  return TYPOGRAPHY_REPLACEMENTS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    text
  );
}
