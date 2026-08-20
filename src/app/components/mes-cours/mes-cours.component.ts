import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ALGORITHM_SAMPLES, AlgorithmFrame, AlgorithmSample } from './algorithm-samples';
import { reviewCourseItems } from './content-review';
import { quizDefinitionsFor } from './quiz-bank';

interface CourseItem {
  type: 'paragraph' | 'table' | 'algorithm';
  location: string;
  index: number;
  document?: string;
  style?: string;
  text?: string;
  images?: string[];
  rows?: string[][];
  algorithm?: AlgorithmSample;
}

interface CourseDocument {
  paragraph_count: number;
  table_count: number;
  inline_shape_count: number;
  items: CourseItem[];
}

interface CourseSection {
  id: string;
  title: string;
  items: CourseItem[];
}

interface QuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

@Component({
  selector: 'app-mes-cours',
  templateUrl: './mes-cours.component.html',
  styleUrls: ['./mes-cours.component.scss']
})
export class MesCoursComponent implements OnInit, OnDestroy {
  searchTerm = '';
  loading = true;
  error = false;
  totalParagraphs = 0;
  totalTables = 0;
  totalImages = 0;
  sections: CourseSection[] = [];
  openedSections = new Set<string>();
  algorithmSteps: Record<string, number> = {};
  quizzes: Record<string, QuizQuestion[]> = {};
  quizAnswers: Record<string, number> = {};
  submittedQuizzes = new Set<string>();
  private algorithmTimers = new Map<string, ReturnType<typeof setInterval>>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    forkJoin([
      this.http.get<CourseDocument>('assets/cours/entretien-content.json'),
      this.http.get<CourseDocument>('assets/cours/versions-content.json'),
      this.http.get<CourseDocument>('assets/cours/advanced-content.json')
    ]).subscribe({
      next: documents => {
        const retainedItems = reviewCourseItems(documents.flatMap(document => document.items))
          .filter(item => !this.isDeprecatedAlgorithmDocument(item.document));
        const algorithmItems = this.createAlgorithmItems();

        this.totalParagraphs = retainedItems.filter(item => item.type === 'paragraph').length + ALGORITHM_SAMPLES.length;
        this.totalTables = retainedItems.filter(item => item.type === 'table').length;
        this.totalImages = retainedItems.reduce((total, item) => total + (item.images?.length || 0), 0);
        this.sections = this.orderSections(this.createSections([...retainedItems, ...algorithmItems]));
        this.quizzes = this.createQuizzes(this.sections);
        if (this.sections.length) {
          this.openedSections.add(this.sections[0].id);
        }
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.algorithmTimers.forEach(timer => clearInterval(timer));
  }

  get filteredSections(): CourseSection[] {
    const query = this.normalize(this.searchTerm);
    if (!query) {
      return this.sections;
    }

    return this.sections
      .map(section => {
        if (this.normalize(section.title).includes(query)) {
          return section;
        }
        return {
          ...section,
          items: section.items.filter((item, index, items) => {
            const matches = (candidate?: CourseItem) => this.normalize(
              candidate?.text || candidate?.rows?.flat().join(' ') || ''
            ).includes(query);
            return matches(item) ||
              (item.style === 'Answer' && matches(items[index - 1])) ||
              (items[index + 1]?.style === 'Answer' && matches(items[index + 1]));
          })
        };
      })
      .filter(section => section.items.length > 0);
  }

  isOpen(section: CourseSection): boolean {
    return this.searchTerm.trim().length > 0 || this.openedSections.has(section.id);
  }

  toggleSection(section: CourseSection): void {
    if (this.openedSections.has(section.id)) {
      this.openedSections.delete(section.id);
    } else {
      this.openedSections.add(section.id);
    }
  }

  goToSection(section: CourseSection, event: Event): void {
    event.preventDefault();
    this.openedSections.add(section.id);

    setTimeout(() => {
      const target = document.getElementById(section.id);
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      history.replaceState(null, '', `${location.pathname}${location.search}#${section.id}`);
    });
  }

  expandAll(): void {
    this.sections.forEach(section => this.openedSections.add(section.id));
  }

  collapseAll(): void {
    this.openedSections.clear();
  }

  isSubheading(item: CourseItem): boolean {
    return !!item.style?.startsWith('Heading');
  }

  isDivider(text = ''): boolean {
    return text.length >= 5 && /^[\s_\-–—]+$/.test(text);
  }

  isCode(item: CourseItem): boolean {
    const text = item.text || '';
    if (item.style === 'Code') {
      return true;
    }
    return text.includes('\n') && (
      /[{};]/.test(text) ||
      /^\s*(@\w+|spring:|management:|resilience4j:|CREATE\s|SELECT\s|EXPLAIN\s|POST\s|\/\/|#)/m.test(text)
    );
  }

  imagePath(image: string): string {
    return `assets/cours/media/${image}`;
  }

  trackSection(_: number, section: CourseSection): string {
    return section.id;
  }

  trackItem(_: number, item: CourseItem): string {
    return `${item.document || 'general'}-${item.location}-${item.index}`;
  }

  quizAnswerKey(section: CourseSection, questionIndex: number): string {
    return `${section.id}-${questionIndex}`;
  }

  selectQuizAnswer(section: CourseSection, questionIndex: number, optionIndex: number): void {
    if (this.submittedQuizzes.has(section.id)) {
      return;
    }
    this.quizAnswers[this.quizAnswerKey(section, questionIndex)] = optionIndex;
  }

  isQuizComplete(section: CourseSection): boolean {
    return this.quizzes[section.id]?.every((_, questionIndex) =>
      this.quizAnswers[this.quizAnswerKey(section, questionIndex)] !== undefined
    ) || false;
  }

  submitQuiz(section: CourseSection): void {
    if (this.isQuizComplete(section)) {
      this.submittedQuizzes.add(section.id);
    }
  }

  resetQuiz(section: CourseSection): void {
    this.submittedQuizzes.delete(section.id);
    this.quizzes[section.id]?.forEach((_, questionIndex) => {
      delete this.quizAnswers[this.quizAnswerKey(section, questionIndex)];
    });
  }

  quizScore(section: CourseSection): number {
    return (this.quizzes[section.id] || []).reduce((score, question, questionIndex) =>
      score + (this.quizAnswers[this.quizAnswerKey(section, questionIndex)] === question.correctIndex ? 1 : 0), 0
    );
  }

  isQuizOptionCorrect(section: CourseSection, questionIndex: number, optionIndex: number): boolean {
    return this.submittedQuizzes.has(section.id) &&
      this.quizzes[section.id][questionIndex].correctIndex === optionIndex;
  }

  isQuizOptionWrong(section: CourseSection, questionIndex: number, optionIndex: number): boolean {
    return this.submittedQuizzes.has(section.id) &&
      this.quizAnswers[this.quizAnswerKey(section, questionIndex)] === optionIndex &&
      this.quizzes[section.id][questionIndex].correctIndex !== optionIndex;
  }

  algorithmKey(item: CourseItem): string {
    return `${item.document || 'algorithm'}-${item.index}`;
  }

  algorithmFrame(item: CourseItem): AlgorithmFrame | undefined {
    const frames = item.algorithm?.frames;
    if (!frames?.length) {
      return undefined;
    }
    return frames[this.algorithmSteps[this.algorithmKey(item)] || 0];
  }

  algorithmStepNumber(item: CourseItem): number {
    return (this.algorithmSteps[this.algorithmKey(item)] || 0) + 1;
  }

  isAlgorithmPlaying(item: CourseItem): boolean {
    return this.algorithmTimers.has(this.algorithmKey(item));
  }

  previousAlgorithmStep(item: CourseItem): void {
    this.stopAlgorithm(item);
    const key = this.algorithmKey(item);
    this.algorithmSteps[key] = Math.max(0, (this.algorithmSteps[key] || 0) - 1);
  }

  nextAlgorithmStep(item: CourseItem): void {
    this.stopAlgorithm(item);
    this.advanceAlgorithm(item);
  }

  playAlgorithm(item: CourseItem): void {
    const key = this.algorithmKey(item);
    this.stopAlgorithm(item);
    this.algorithmSteps[key] = 0;
    const timer = setInterval(() => {
      const lastIndex = (item.algorithm?.frames.length || 1) - 1;
      if ((this.algorithmSteps[key] || 0) >= lastIndex) {
        this.stopAlgorithm(item);
        return;
      }
      this.algorithmSteps[key] = (this.algorithmSteps[key] || 0) + 1;
    }, 900);
    this.algorithmTimers.set(key, timer);
  }

  private advanceAlgorithm(item: CourseItem): void {
    const key = this.algorithmKey(item);
    const lastIndex = (item.algorithm?.frames.length || 1) - 1;
    this.algorithmSteps[key] = Math.min(lastIndex, (this.algorithmSteps[key] || 0) + 1);
  }

  private stopAlgorithm(item: CourseItem): void {
    const key = this.algorithmKey(item);
    const timer = this.algorithmTimers.get(key);
    if (timer) {
      clearInterval(timer);
      this.algorithmTimers.delete(key);
    }
  }

  private createAlgorithmItems(): CourseItem[] {
    return [
      {
        type: 'paragraph',
        location: 'body',
        index: 0,
        document: 'algorithmes-top-30',
        style: 'Title',
        text: 'Algorithmique — Top 40 exercices essentiels'
      },
      ...ALGORITHM_SAMPLES.map((algorithm, index): CourseItem => ({
        type: 'algorithm',
        location: 'body',
        index: index + 1,
        document: 'algorithmes-top-30',
        algorithm
      }))
    ];
  }

  private createQuizzes(sections: CourseSection[]): Record<string, QuizQuestion[]> {
    const quizzes: Record<string, QuizQuestion[]> = {};

    sections.forEach((section, sectionIndex) => {
      const definitions = quizDefinitionsFor(section.title) || [];
      quizzes[section.id] = definitions.map((definition, questionIndex) => {
        const correctIndex = (sectionIndex + questionIndex) % 3;
        const options = [...definition.distractors];
        options.splice(correctIndex, 0, definition.correct);

        return {
          prompt: definition.question,
          options,
          correctIndex,
          explanation: definition.explanation
        };
      });
    });

    return quizzes;
  }

  private isDeprecatedAlgorithmDocument(document = ''): boolean {
    return ['algorithmes-java', 'exercices-d-algorithmique', 'exercices-hackerrank'].includes(document);
  }

  private orderSections(sections: CourseSection[]): CourseSection[] {
    const priorities: Array<[RegExp, number]> = [
      [/Préparation générale/i, 10],
      [/Questions d’entretien & quiz/i, 20],
      [/Java — fondamentaux/i, 30],
      [/Java 11/i, 40],
      [/Java 17/i, 41],
      [/Java 21/i, 42],
      [/Java 25/i, 43],
      [/Collections/i, 50],
      [/Streams/i, 60],
      [/Threads/i, 70],
      [/Mémoire JVM/i, 80],
      [/Spring & Spring Boot/i, 90],
      [/Spring Security/i, 91],
      [/Transactions avancées/i, 92],
      [/Hibernate & JPA/i, 100],
      [/SQL, modélisation/i, 105],
      [/Cache applicatif/i, 108],
      [/API REST/i, 110],
      [/Résilience/i, 115],
      [/HTTP, JUnit/i, 120],
      [/Tests d’intégration/i, 121],
      [/Observabilité/i, 125],
      [/Architecture logicielle/i, 130],
      [/Architecture distribuée/i, 135],
      [/System design/i, 137],
      [/Conception logicielle/i, 140],
      [/Bonnes pratiques & Design Patterns/i, 150],
      [/TDD, BDD & DDD/i, 160],
      [/Algorithmique — Top 40/i, 170],
      [/Angular — fondamentaux/i, 180],
      [/Angular — cours/i, 190],
      [/Questions d'entretien Angular/i, 200],
      [/Angular 17/i, 210],
      [/Angular 22/i, 220],
      [/Kafka, OpenSearch/i, 230],
      [/Docker — pratique/i, 240],
      [/Camunda BPM/i, 250],
      [/Entretien BNP/i, 260]
    ];

    return sections
      .map((section, originalIndex) => ({ section, originalIndex }))
      .sort((a, b) => {
        const priorityA = priorities.find(([pattern]) => pattern.test(a.section.title))?.[1] ?? 900;
        const priorityB = priorities.find(([pattern]) => pattern.test(b.section.title))?.[1] ?? 900;
        return priorityA - priorityB || a.originalIndex - b.originalIndex;
      })
      .map(entry => entry.section);
  }

  private createSections(items: CourseItem[]): CourseSection[] {
    const bodyItems = items.filter(item => item.location === 'body');
    const sections: CourseSection[] = [];
    let current: CourseSection = { id: 'java', title: 'Java', items: [] };

    for (const item of bodyItems) {
      const title = item.text?.trim() || '';
      const isDocumentTitle = !!title && item.style === 'Title';
      const isGeneralDocument = (item.document || 'entretien-general') === 'entretien-general';
      const startsSection = !!title && item.style === 'Heading 1' && isGeneralDocument;

      if (isDocumentTitle) {
        if (current.items.length) {
          sections.push(current);
        }
        current = {
          id: this.slugify(title),
          title: title.replace(/:$/, ''),
          items: []
        };
        continue;
      }

      if (startsSection) {
        if (!current.items.length) {
          current.items.push({ ...item, style: 'Heading 2' });
          continue;
        }
        if (current.items.length) {
          sections.push(current);
        }
        current = {
          id: this.slugify(title) + '-' + sections.length,
          title: title.replace(/:$/, ''),
          items: []
        };
        if (item.images?.length) {
          current.items.push({ ...item, text: '', style: 'normal' });
        }
        continue;
      }

      const hasContent = item.type === 'table' || item.type === 'algorithm' || !!title || !!item.images?.length;
      if (hasContent) {
        current.items.push(item);
      }
    }

    if (current.items.length) {
      sections.push(current);
    }
    return sections;
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  private slugify(value: string): string {
    return this.normalize(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'section';
  }
}
