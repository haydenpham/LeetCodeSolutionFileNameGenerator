import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  difficulty: string = 'E';
  question: string = '';
  selectedLanguage: string | null = null;
  fileName: string | null = null;

  languages = [
    { name: 'C#', code: 'C#' },
    { name: 'Java', code: 'J' },
    { name: 'Python', code: 'Py' },
    { name: 'SQL', code: 'SQL' },
    { name: 'Bash Script', code: 'B' }
  ];

  generateFileName() {
    if (!this.selectedLanguage) {
      alert('Please select a programming language.');
      return;
    }

    if (!this.isValidLeetCodeQuestionFormat(this.question)) {
      alert('Please enter a valid LeetCode question format.');
      this.clear();
      return;
    }

    const formattedQuestion = this.formatQuestion(this.question);
    this.fileName = `[${this.difficulty}][${this.selectedLanguage}].${formattedQuestion}`;
  }

  private formatQuestion(question: string): string {
    const [number, ...titleParts] = question.split('. ');
    const formattedTitle = titleParts.join(' ').replace(/\s+/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    return `${number}.${formattedTitle}`;
  }

  isValidLeetCodeQuestionFormat(input: string): boolean {
    const pattern = /^\d+\.\s[A-Za-z]+(\s[A-Za-z]+)*$/;
    return pattern.test(input);
  }


  // TODO: Add clear button to reset form
  clear() {
    this.difficulty = 'E';
    this.question = '';
    this.selectedLanguage = null;
    this.fileName = null;
  }
}
