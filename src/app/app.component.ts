import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  difficulty: string = 'E';
  question: string = '';
  fileName: string | null = null;

  languages = [
    { name: 'Java', value: 'J', logo: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
    { name: 'C#', value: 'C#', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1820px-Logo_C_sharp.svg.png' },
    { name: 'Python', value: 'Py', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png' },
    { name: 'SQL', value: 'SQL', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png' },
    { name: 'Bash Script', value: 'B', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/2048px-Bash_Logo_Colored.svg.png' },
  ];

  selectedLanguage: string | null = this.languages[0].value;

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
