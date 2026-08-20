export interface AlgorithmFrame {
  values: string[];
  active: number[];
  done: number[];
  label: string;
}

export interface AlgorithmSample {
  number: number;
  category: string;
  title: string;
  explanation: string;
  complexity: string;
  code: string;
  frames: AlgorithmFrame[];
}

function sample(
  number: number,
  category: string,
  title: string,
  explanation: string,
  complexity: string,
  code: string,
  values: string[],
  labels: string[],
  focus: number[][],
  finalValues: string[] = values,
  done: number[] = []
): AlgorithmSample {
  return {
    number,
    category,
    title,
    explanation,
    complexity,
    code,
    frames: labels.map((label, index) => ({
      values: index === labels.length - 1 ? finalValues : values,
      active: focus[index] || [],
      done: index === labels.length - 1 ? done : [],
      label
    }))
  };
}

export const ALGORITHM_SAMPLES: AlgorithmSample[] = [
  sample(1, 'Tableaux', 'Trouver le maximum',
    'Parcourir le tableau une seule fois et conserver la plus grande valeur rencontrée.', 'O(n) temps · O(1) mémoire',
    `int max = values[0];
for (int value : values) {
  max = Math.max(max, value);
}`, ['3', '7', '2', '5'],
    ['3 devient le maximum courant.', '7 est plus grand : nouveau maximum.', '2 et 5 ne dépassent pas 7.', 'Maximum final : 7.'],
    [[0], [1], [2, 3], [1]], ['3', '7', '2', '5'], [1]),

  sample(2, 'Tableaux', 'Trouver le minimum',
    'Même principe que le maximum, avec une variable représentant la plus petite valeur courante.', 'O(n) temps · O(1) mémoire',
    `int min = values[0];
for (int value : values) {
  min = Math.min(min, value);
}`, ['6', '4', '9', '1'],
    ['6 initialise le minimum.', '4 devient le nouveau minimum.', '9 est ignoré.', '1 est le minimum final.'],
    [[0], [1], [2], [3]], ['6', '4', '9', '1'], [3]),

  sample(3, 'Tableaux', 'Calculer la somme',
    'Utiliser un accumulateur et lui ajouter chaque élément.', 'O(n) temps · O(1) mémoire',
    `int sum = 0;
for (int value : values) {
  sum += value;
}`, ['2', '4', '3'],
    ['Somme = 2.', 'Somme = 2 + 4 = 6.', 'Somme finale = 6 + 3 = 9.'],
    [[0], [0, 1], [0, 1, 2]], ['2', '4', '3'], [0, 1, 2]),

  sample(4, 'Tableaux', 'Inverser un tableau',
    'Échanger les éléments aux deux extrémités, puis rapprocher les deux pointeurs.', 'O(n) temps · O(1) mémoire',
    `for (int left = 0, right = a.length - 1; left < right; left++, right--) {
  int tmp = a[left];
  a[left] = a[right];
  a[right] = tmp;
}`, ['1', '2', '3', '4'],
    ['Échanger 1 et 4.', 'Échanger 2 et 3.', 'Le tableau est inversé.'],
    [[0, 3], [1, 2], []], ['4', '3', '2', '1'], [0, 1, 2, 3]),

  sample(5, 'Tableaux', 'Trouver le deuxième maximum',
    'Conserver simultanément le plus grand et le deuxième plus grand élément distinct.', 'O(n) temps · O(1) mémoire',
    `int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
for (int value : values) {
  if (value > first) { second = first; first = value; }
  else if (value > second && value != first) second = value;
}`, ['8', '3', '10', '6'],
    ['8 est premier.', '3 devient deuxième.', '10 devient premier et 8 deuxième.', 'Résultat : 8.'],
    [[0], [1], [2], [0]], ['8', '3', '10', '6'], [0]),

  sample(6, 'Tableaux', 'Supprimer les doublons triés',
    'Un pointeur lit le tableau, un autre écrit uniquement les nouvelles valeurs.', 'O(n) temps · O(1) mémoire',
    `int write = 1;
for (int read = 1; read < a.length; read++) {
  if (a[read] != a[write - 1]) a[write++] = a[read];
}`, ['1', '1', '2', '2', '3'],
    ['Garder le premier 1.', 'Ignorer le second 1.', 'Garder 2 puis ignorer son doublon.', 'Résultat compact : 1, 2, 3.'],
    [[0], [1], [2, 3], [0, 2, 4]], ['1', '2', '3'], [0, 1, 2]),

  sample(7, 'Tableaux', 'Déplacer les zéros à la fin',
    'Recopier les valeurs non nulles vers la gauche, puis compléter avec des zéros.', 'O(n) temps · O(1) mémoire',
    `int write = 0;
for (int value : a) if (value != 0) a[write++] = value;
while (write < a.length) a[write++] = 0;`, ['0', '3', '0', '5'],
    ['0 est sauté.', '3 est écrit à gauche.', '5 suit 3.', 'Compléter la fin avec des zéros.'],
    [[0], [1], [2, 3], []], ['3', '5', '0', '0'], [0, 1]),

  sample(8, 'Tableaux', 'Two Sum',
    'Mémoriser dans une Map les valeurs déjà vues et rechercher le complément de la cible.', 'O(n) temps · O(n) mémoire',
    `Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < a.length; i++) {
  int complement = target - a[i];
  if (seen.containsKey(complement)) return new int[]{seen.get(complement), i};
  seen.put(a[i], i);
}`, ['2', '7', '11', '15'],
    ['Cible 9 : mémoriser 2.', 'Pour 7, le complément 2 existe.', 'Paire trouvée : 2 + 7 = 9.'],
    [[0], [0, 1], [0, 1]], ['2', '7', '11', '15'], [0, 1]),

  sample(9, 'Tableaux', 'Rotation à droite',
    'Pour une petite rotation, déplacer le dernier élément en tête. Pour une solution générale, utiliser trois inversions.', 'O(n) temps · O(1) mémoire',
    `k %= a.length;
reverse(a, 0, a.length - 1);
reverse(a, 0, k - 1);
reverse(a, k, a.length - 1);`, ['1', '2', '3', '4'],
    ['Inverser tout le tableau.', 'Inverser les k premiers éléments.', 'Inverser le reste : rotation de 1.'],
    [[0, 3], [0], [1, 3]], ['4', '1', '2', '3'], [0, 1, 2, 3]),

  sample(10, 'Tableaux', 'Fusionner deux tableaux triés',
    'Comparer les têtes des deux tableaux et copier la plus petite dans le résultat.', 'O(n + m) temps · O(n + m) mémoire',
    `while (i < a.length && j < b.length) {
  merged[k++] = a[i] <= b[j] ? a[i++] : b[j++];
}`, ['1', '4', '2', '3'],
    ['Comparer 1 et 2 : prendre 1.', 'Comparer 4 et 2 : prendre 2.', 'Prendre 3 puis 4.', 'Fusion terminée.'],
    [[0, 2], [1, 2], [1, 3], []], ['1', '2', '3', '4'], [0, 1, 2, 3]),

  sample(11, 'Chaînes', 'Vérifier un palindrome',
    'Comparer les caractères symétriques avec deux pointeurs.', 'O(n) temps · O(1) mémoire',
    `int left = 0, right = text.length() - 1;
while (left < right) {
  if (text.charAt(left++) != text.charAt(right--)) return false;
}
return true;`, ['R', 'A', 'D', 'A', 'R'],
    ['Comparer R et R.', 'Comparer A et A.', 'Tous les couples correspondent : palindrome.'],
    [[0, 4], [1, 3], [2]], ['R', 'A', 'D', 'A', 'R'], [0, 1, 2, 3, 4]),

  sample(12, 'Chaînes', 'Inverser une chaîne',
    'StringBuilder fournit une solution lisible ; deux pointeurs conviennent pour un tableau de caractères.', 'O(n) temps · O(n) mémoire',
    `String reversed = new StringBuilder(text).reverse().toString();`, ['J', 'A', 'V', 'A'],
    ['Lire les caractères.', 'Les replacer de droite à gauche.', 'Résultat : AVAJ.'],
    [[0, 1, 2, 3], [0, 3], []], ['A', 'V', 'A', 'J'], [0, 1, 2, 3]),

  sample(13, 'Chaînes', 'Tester deux anagrammes',
    'Compter les occurrences de chaque caractère dans les deux chaînes et comparer les compteurs.', 'O(n) temps · O(k) mémoire',
    `Map<Character, Integer> counts = new HashMap<>();
for (char c : a.toCharArray()) counts.merge(c, 1, Integer::sum);
for (char c : b.toCharArray()) counts.merge(c, -1, Integer::sum);
return counts.values().stream().allMatch(v -> v == 0);`, ['C', 'H', 'I', 'E', 'N'],
    ['Compter CHIEN.', 'Décompter NICHE.', 'Tous les compteurs valent zéro.'],
    [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], []], ['N', 'I', 'C', 'H', 'E'], [0, 1, 2, 3, 4]),

  sample(14, 'Chaînes', 'Compter les caractères',
    'Utiliser Map.merge pour incrémenter le compteur associé à chaque caractère.', 'O(n) temps · O(k) mémoire',
    `Map<Character, Integer> counts = new LinkedHashMap<>();
for (char c : text.toCharArray()) counts.merge(c, 1, Integer::sum);`, ['J', 'A', 'V', 'A'],
    ['J → 1.', 'A → 1.', 'V → 1.', 'A → 2.'],
    [[0], [1], [2], [1, 3]], ['J', 'A', 'V', 'A'], [1, 3]),

  sample(15, 'Chaînes', 'Premier caractère non répété',
    'Compter d’abord les caractères, puis reparcourir la chaîne dans son ordre initial.', 'O(n) temps · O(k) mémoire',
    `Map<Character, Long> counts = text.chars().mapToObj(c -> (char) c)
  .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
return counts.entrySet().stream().filter(e -> e.getValue() == 1).findFirst();`, ['S', 'W', 'I', 'S', 'S'],
    ['Compter toutes les lettres.', 'S apparaît trois fois.', 'W apparaît une fois : résultat.'],
    [[0, 1, 2, 3, 4], [0, 3, 4], [1]], ['S', 'W', 'I', 'S', 'S'], [1]),

  sample(16, 'Chaînes', 'Compter les voyelles',
    'Parcourir la chaîne normalisée et incrémenter pour a, e, i, o, u ou y.', 'O(n) temps · O(1) mémoire',
    `long count = text.toLowerCase().chars()
  .filter(c -> "aeiouy".indexOf(c) >= 0)
  .count();`, ['S', 'P', 'R', 'I', 'N', 'G'],
    ['S, P et R ne sont pas des voyelles.', 'I est une voyelle.', 'Une voyelle trouvée.'],
    [[0, 1, 2], [3], [3]], ['S', 'P', 'R', 'I', 'N', 'G'], [3]),

  sample(17, 'Chaînes', 'Plus long préfixe commun',
    'Réduire progressivement le préfixe tant qu’une chaîne ne commence pas par celui-ci.', 'O(S) temps · O(1) mémoire',
    `String prefix = words[0];
for (String word : words) {
  while (!word.startsWith(prefix)) prefix = prefix.substring(0, prefix.length() - 1);
}`, ['F', 'L', 'E', 'U', 'R'],
    ['Préfixe candidat : FLEUR.', 'FLEUVE diffère après FLEU.', 'FLEXIBLE diffère après FLE.', 'Préfixe commun : FLE.'],
    [[0, 1, 2, 3, 4], [0, 1, 2, 3], [0, 1, 2], [0, 1, 2]], ['F', 'L', 'E'], [0, 1, 2]),

  sample(18, 'Chaînes', 'Parenthèses valides',
    'Empiler les ouvertures ; chaque fermeture doit correspondre au sommet de la pile.', 'O(n) temps · O(n) mémoire',
    `Deque<Character> stack = new ArrayDeque<>();
for (char c : text.toCharArray()) {
  if (c == '(' || c == '[' || c == '{') stack.push(c);
  else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;
}
return stack.isEmpty();`, ['(', '[', ']', ')'],
    ['Empiler (.', 'Empiler [.', '] dépile [.', ') dépile ( : pile vide.'],
    [[0], [1], [1, 2], [0, 3]], ['(', '[', ']', ')'], [0, 1, 2, 3]),

  sample(19, 'Recherche', 'Recherche linéaire',
    'Examiner chaque élément jusqu’à trouver la cible. Fonctionne même si le tableau n’est pas trié.', 'O(n) temps · O(1) mémoire',
    `for (int i = 0; i < a.length; i++) {
  if (a[i] == target) return i;
}
return -1;`, ['4', '9', '2', '7'],
    ['4 n’est pas 2.', '9 n’est pas 2.', '2 trouvé à l’index 2.'],
    [[0], [1], [2]], ['4', '9', '2', '7'], [2]),

  sample(20, 'Recherche', 'Recherche binaire',
    'Sur un tableau trié, comparer la cible au milieu et éliminer la moitié inutile.', 'O(log n) temps · O(1) mémoire',
    `int left = 0, right = a.length - 1;
while (left <= right) {
  int mid = left + (right - left) / 2;
  if (a[mid] == target) return mid;
  if (a[mid] < target) left = mid + 1; else right = mid - 1;
}`, ['1', '3', '5', '7', '9'],
    ['Milieu = 5 ; la cible 7 est à droite.', 'Nouvelle moitié : 7, 9.', '7 trouvé.'],
    [[2], [3, 4], [3]], ['1', '3', '5', '7', '9'], [3]),

  sample(21, 'Tri', 'Tri à bulles',
    'Comparer les voisins et les échanger s’ils sont dans le mauvais ordre. Pédagogique, mais peu efficace.', 'O(n²) temps · O(1) mémoire',
    `for (int end = a.length - 1; end > 0; end--)
  for (int i = 0; i < end; i++)
    if (a[i] > a[i + 1]) swap(a, i, i + 1);`, ['4', '2', '3', '1'],
    ['Comparer 4 et 2 : échanger.', 'Comparer 4 et 3 puis 4 et 1.', 'Répéter sur la partie non triée.', 'Tableau trié.'],
    [[0, 1], [1, 2, 3], [0, 1, 2], []], ['1', '2', '3', '4'], [0, 1, 2, 3]),

  sample(22, 'Tri', 'Tri par sélection',
    'Chercher le minimum de la zone non triée et le placer à la position courante.', 'O(n²) temps · O(1) mémoire',
    `for (int i = 0; i < a.length - 1; i++) {
  int min = i;
  for (int j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
  swap(a, i, min);
}`, ['5', '2', '4', '1'],
    ['Chercher le minimum : 1.', 'Placer 1 au début.', 'Chercher ensuite 2.', 'Tableau trié.'],
    [[0, 1, 2, 3], [0, 3], [1], []], ['1', '2', '4', '5'], [0, 1, 2, 3]),

  sample(23, 'Tri', 'Tri par insertion',
    'Insérer chaque valeur à sa bonne place dans la partie gauche déjà triée.', 'O(n²) temps · O(1) mémoire',
    `for (int i = 1; i < a.length; i++) {
  int value = a[i], j = i - 1;
  while (j >= 0 && a[j] > value) a[j + 1] = a[j--];
  a[j + 1] = value;
}`, ['4', '1', '3', '2'],
    ['Insérer 1 avant 4.', 'Insérer 3 entre 1 et 4.', 'Insérer 2 entre 1 et 3.', 'Tableau trié.'],
    [[0, 1], [1, 2], [1, 2, 3], []], ['1', '2', '3', '4'], [0, 1, 2, 3]),

  sample(24, 'Tri', 'Tri fusion',
    'Diviser en moitiés jusqu’aux éléments seuls, puis fusionner les sous-tableaux triés.', 'O(n log n) temps · O(n) mémoire',
    `void mergeSort(int[] a, int left, int right) {
  if (left >= right) return;
  int mid = (left + right) / 2;
  mergeSort(a, left, mid);
  mergeSort(a, mid + 1, right);
  merge(a, left, mid, right);
}`, ['4', '1', '3', '2'],
    ['Diviser en [4,1] et [3,2].', 'Trier les deux moitiés.', 'Fusionner en choisissant le plus petit.', 'Tableau trié.'],
    [[0, 1, 2, 3], [0, 1, 2, 3], [0, 2], []], ['1', '2', '3', '4'], [0, 1, 2, 3]),

  sample(25, 'Nombres', 'Factorielle',
    'Multiplier les entiers de 1 à n. Une boucle évite la profondeur de pile de la récursion.', 'O(n) temps · O(1) mémoire',
    `long result = 1;
for (int i = 2; i <= n; i++) result *= i;`, ['1', '2', '3', '4'],
    ['Résultat = 1.', 'Multiplier par 2.', 'Multiplier par 3 : 6.', 'Multiplier par 4 : 24.'],
    [[0], [1], [2], [3]], ['1', '2', '6', '24'], [3]),

  sample(26, 'Nombres', 'Suite de Fibonacci',
    'Conserver uniquement les deux valeurs précédentes pour produire la suivante.', 'O(n) temps · O(1) mémoire',
    `int previous = 0, current = 1;
for (int i = 2; i <= n; i++) {
  int next = previous + current;
  previous = current;
  current = next;
}`, ['0', '1', '?', '?', '?'],
    ['Départ : 0 et 1.', '0 + 1 = 1.', '1 + 1 = 2.', '1 + 2 = 3.'],
    [[0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]], ['0', '1', '1', '2', '3'], [0, 1, 2, 3, 4]),

  sample(27, 'Nombres', 'Tester si un nombre est premier',
    'Chercher un diviseur seulement jusqu’à la racine carrée de n.', 'O(√n) temps · O(1) mémoire',
    `if (n < 2) return false;
for (int divisor = 2; divisor * divisor <= n; divisor++)
  if (n % divisor == 0) return false;
return true;`, ['2', '3', '4', '5'],
    ['Pour 17, tester 2.', 'Tester 3.', 'Tester 4.', 'Aucun diviseur : 17 est premier.'],
    [[0], [1], [2], [3]], ['2', '3', '4', '5'], [0, 1, 2, 3]),

  sample(28, 'Nombres', 'PGCD avec Euclide',
    'Remplacer répétitivement (a, b) par (b, a modulo b) jusqu’à obtenir un reste nul.', 'O(log min(a,b)) temps · O(1) mémoire',
    `while (b != 0) {
  int remainder = a % b;
  a = b;
  b = remainder;
}
return a;`, ['48', '18'],
    ['48 modulo 18 = 12.', '18 modulo 12 = 6.', '12 modulo 6 = 0.', 'PGCD = 6.'],
    [[0, 1], [0, 1], [0, 1], [1]], ['12', '6'], [1]),

  sample(29, 'Nombres', 'Trouver le nombre manquant',
    'Comparer la somme attendue de 0 à n avec la somme réelle. XOR est une alternative sans risque de dépassement.', 'O(n) temps · O(1) mémoire',
    `int expected = n * (n + 1) / 2;
int actual = Arrays.stream(a).sum();
return expected - actual;`, ['0', '1', '3', '4'],
    ['Pour 0..4, somme attendue = 10.', 'Somme observée = 8.', '10 - 8 = 2.', 'Le nombre manquant est 2.'],
    [[0, 1, 2, 3], [0, 1, 2, 3], [], []], ['0', '1', '2', '3', '4'], [2]),

  sample(30, 'Nombres', 'FizzBuzz',
    'Tester d’abord la divisibilité par 15, puis par 3 et par 5 pour éviter les conditions imbriquées incorrectes.', 'O(n) temps · O(1) mémoire hors sortie',
    `for (int i = 1; i <= n; i++) {
  if (i % 15 == 0) System.out.println("FizzBuzz");
  else if (i % 3 == 0) System.out.println("Fizz");
  else if (i % 5 == 0) System.out.println("Buzz");
  else System.out.println(i);
}`, ['3', '5', '15'],
    ['3 est divisible par 3 : Fizz.', '5 est divisible par 5 : Buzz.', '15 est divisible par 3 et 5 : FizzBuzz.'],
    [[0], [1], [2]], ['Fizz', 'Buzz', 'FizzBuzz'], [0, 1, 2]),

  sample(31, 'Tableaux avancés', 'Sous-tableau de somme maximale — Kadane',
    'Conserver la meilleure somme se terminant à la position courante et la meilleure somme globale. On redémarre lorsque prolonger le sous-tableau est moins avantageux que repartir de la valeur courante.', 'O(n) temps · O(1) mémoire',
    `int current = a[0], best = a[0];
for (int i = 1; i < a.length; i++) {
  current = Math.max(a[i], current + a[i]);
  best = Math.max(best, current);
}
return best;`, ['-2', '1', '-3', '4', '-1', '2', '1', '-5', '4'],
    ['-2 est la meilleure somme initiale.', 'Repartir à 1 est préférable.', 'À 4, abandonner le préfixe négatif.', 'Étendre avec -1, 2 et 1 donne 6.', 'Le meilleur sous-tableau vaut 6.'],
    [[0], [1], [1, 2, 3], [3, 4, 5, 6], [3, 4, 5, 6]],
    ['-2', '1', '-3', '4', '-1', '2', '1', '-5', '4'], [3, 4, 5, 6]),

  sample(32, 'Fenêtre glissante', 'Plus longue sous-chaîne sans répétition',
    'Maintenir une fenêtre [left, right] sans doublon. Lorsqu’un caractère réapparaît dans la fenêtre, déplacer left juste après sa précédente position.', 'O(n) temps · O(k) mémoire',
    `Map<Character, Integer> lastSeen = new HashMap<>();
int left = 0, best = 0;
for (int right = 0; right < text.length(); right++) {
  char c = text.charAt(right);
  if (lastSeen.containsKey(c)) left = Math.max(left, lastSeen.get(c) + 1);
  lastSeen.put(c, right);
  best = Math.max(best, right - left + 1);
}`, ['A', 'B', 'C', 'A', 'B', 'C', 'B', 'B'],
    ['La fenêtre devient A.', 'Étendre à ABC : longueur 3.', 'A se répète : déplacer la gauche après le premier A.', 'B se répète : la fenêtre devient CB.', 'La longueur maximale reste 3.'],
    [[0], [0, 1, 2], [1, 2, 3], [5, 6], [0, 1, 2]],
    ['A', 'B', 'C', 'A', 'B', 'C', 'B', 'B'], [0, 1, 2]),

  sample(33, 'Intervalles', 'Fusionner les intervalles qui se chevauchent',
    'Trier par début, puis comparer chaque intervalle avec le dernier intervalle fusionné. Étendre sa fin en cas de chevauchement, sinon créer un nouveau groupe.', 'O(n log n) temps · O(n) mémoire',
    `Arrays.sort(intervals, Comparator.comparingInt(i -> i[0]));
List<int[]> merged = new ArrayList<>();
for (int[] current : intervals) {
  int[] last = merged.isEmpty() ? null : merged.get(merged.size() - 1);
  if (last == null || last[1] < current[0]) merged.add(current.clone());
  else last[1] = Math.max(last[1], current[1]);
}`, ['[1,3]', '[2,6]', '[8,10]', '[9,12]'],
    ['Trier les intervalles par début.', '[1,3] et [2,6] se chevauchent.', 'Créer ensuite le groupe [8,10].', '[9,12] étend ce groupe.', 'Résultat : [1,6] et [8,12].'],
    [[0, 1, 2, 3], [0, 1], [2], [2, 3], []], ['[1,6]', '[8,12]'], [0, 1]),

  sample(34, 'Collections', 'Top K éléments les plus fréquents',
    'Compter les occurrences avec une Map, puis conserver les k meilleures entrées dans un min-heap de taille k. Pour des entiers avec fréquence bornée, le bucket sort est une alternative linéaire.', 'O(n log k) temps · O(n) mémoire',
    `Map<Integer, Long> counts = Arrays.stream(a).boxed()
  .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.comparingLong(counts::get));
for (int value : counts.keySet()) {
  heap.offer(value);
  if (heap.size() > k) heap.poll();
}`, ['1', '1', '1', '2', '2', '3'],
    ['Compter : 1→3, 2→2, 3→1.', 'Ajouter 1 au min-heap.', 'Ajouter 2 ; le heap contient les deux meilleurs.', '3 est moins fréquent et sort du heap.', 'Top 2 : 1 et 2.'],
    [[0, 1, 2, 3, 4, 5], [0, 1, 2], [3, 4], [5], [0, 3]], ['1×3', '2×2'], [0, 1]),

  sample(35, 'Structures de données', 'Implémenter un cache LRU',
    'Un LRU évince l’entrée la moins récemment utilisée. LinkedHashMap avec accessOrder=true fournit une implémentation concise ; en entretien, expliquer aussi la combinaison HashMap + liste doublement chaînée pour get/put en O(1).', 'O(1) moyen par get/put · O(capacité) mémoire',
    `class LruCache<K, V> extends LinkedHashMap<K, V> {
  private final int capacity;
  LruCache(int capacity) { super(capacity, 0.75f, true); this.capacity = capacity; }
  @Override protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
    return size() > capacity;
  }
}`, ['put A', 'put B', 'get A', 'put C'],
    ['A entre dans le cache.', 'B devient la plus récente ; A est la plus ancienne.', 'Lire A la déplace en position récente.', 'Ajouter C dépasse la capacité 2 : évincer B.', 'Ordre final récent→ancien : C, A.'],
    [[0], [0, 1], [0, 2], [1, 3], []], ['C', 'A'], [0, 1]),

  sample(36, 'Listes chaînées', 'Détecter un cycle — Floyd',
    'Faire avancer slow d’un nœud et fast de deux. Dans une liste cyclique, ils finissent par se rencontrer ; sinon fast atteint null. Une seconde phase peut retrouver l’entrée du cycle.', 'O(n) temps · O(1) mémoire',
    `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow == fast) return true;
}
return false;`, ['1', '2', '3', '4', '↩2'],
    ['slow et fast partent de 1.', 'slow=2, fast=3.', 'slow=3, fast revient vers 2.', 'slow et fast se rencontrent dans le cycle.', 'Cycle détecté sans mémoire supplémentaire.'],
    [[0], [1, 2], [1, 2], [2], [1, 2, 3, 4]], ['1', '2', '3', '4', '↩2'], [1, 2, 3, 4]),

  sample(37, 'Listes chaînées', 'Inverser une liste chaînée',
    'Parcourir la liste avec current et rediriger current.next vers previous. Conserver next avant de modifier le lien pour ne pas perdre le reste de la liste.', 'O(n) temps · O(1) mémoire',
    `ListNode previous = null, current = head;
while (current != null) {
  ListNode next = current.next;
  current.next = previous;
  previous = current;
  current = next;
}
return previous;`, ['1', '2', '3', 'null'],
    ['Détacher 1 et le faire pointer vers null.', 'Faire pointer 2 vers 1.', 'Faire pointer 3 vers 2.', 'current atteint null.', 'La nouvelle tête est 3.'],
    [[0], [0, 1], [1, 2], [3], []], ['3', '2', '1', 'null'], [0, 1, 2]),

  sample(38, 'Arbres', 'Parcours en largeur — BFS',
    'Visiter l’arbre niveau par niveau avec une file. Ajouter les enfants de chaque nœud après sa visite. Cette technique sert aussi à calculer une distance minimale dans un graphe non pondéré.', 'O(n) temps · O(w) mémoire',
    `Queue<TreeNode> queue = new ArrayDeque<>();
queue.offer(root);
while (!queue.isEmpty()) {
  TreeNode node = queue.poll();
  visit(node);
  if (node.left != null) queue.offer(node.left);
  if (node.right != null) queue.offer(node.right);
}`, ['1', '2', '3', '4', '5', '6'],
    ['Mettre la racine 1 dans la file.', 'Visiter 1 puis ajouter 2 et 3.', 'Visiter tout le niveau : 2 puis 3.', 'Visiter le dernier niveau : 4, 5, 6.', 'Ordre BFS : 1, 2, 3, 4, 5, 6.'],
    [[0], [0, 1, 2], [1, 2], [3, 4, 5], []], ['1', '2', '3', '4', '5', '6'], [0, 1, 2, 3, 4, 5]),

  sample(39, 'Arbres', 'Parcours en profondeur — DFS préordre',
    'Visiter un nœud, puis explorer complètement son sous-arbre gauche avant le sous-arbre droit. La version récursive est lisible ; une pile explicite évite la profondeur d’appel sur un arbre très profond.', 'O(n) temps · O(h) mémoire',
    `void preorder(TreeNode node) {
  if (node == null) return;
  visit(node);
  preorder(node.left);
  preorder(node.right);
}`, ['1', '2', '4', '5', '3', '6'],
    ['Visiter la racine 1.', 'Descendre à gauche vers 2.', 'Explorer 4 puis revenir vers 5.', 'Revenir à la racine et explorer 3 puis 6.', 'Ordre DFS préordre terminé.'],
    [[0], [0, 1], [1, 2, 3], [4, 5], []], ['1', '2', '4', '5', '3', '6'], [0, 1, 2, 3, 4, 5]),

  sample(40, 'Graphes', 'Ordre topologique des dépendances — algorithme de Kahn',
    'Calculer le degré entrant de chaque nœud, placer ceux de degré zéro dans une file, puis supprimer progressivement leurs arêtes. Si moins de nœuds que prévu sont produits, le graphe contient un cycle.', 'O(V + E) temps · O(V) mémoire',
    `Queue<Node> ready = nodes.stream().filter(n -> indegree.get(n) == 0)
  .collect(Collectors.toCollection(ArrayDeque::new));
while (!ready.isEmpty()) {
  Node node = ready.poll();
  order.add(node);
  for (Node next : graph.get(node))
    if (indegree.merge(next, -1, Integer::sum) == 0) ready.offer(next);
}
if (order.size() != nodes.size()) throw new IllegalStateException("Cycle");`, ['DB', 'Repository', 'Service', 'API'],
    ['DB n’a aucune dépendance : degré entrant zéro.', 'Retirer DB libère Repository.', 'Retirer Repository libère Service.', 'Retirer Service libère API.', 'Ordre valide : DB → Repository → Service → API.'],
    [[0], [0, 1], [1, 2], [2, 3], []], ['DB', 'Repository', 'Service', 'API'], [0, 1, 2, 3])
];
