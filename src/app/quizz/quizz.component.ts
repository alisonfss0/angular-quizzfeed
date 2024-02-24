import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../assets/data/quizz_questions.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  standalone: true,
  styleUrls: ['./quizz.component.css', './quizz.responsive.component.css'],
  imports: [CommonModule],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  /**
   * Handles the player's choice and updates the quizz state accordingly.
   *
   * @param value The player's choice.
   */
  playerChoose(value: string) {
    this.answers.push(value);

    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer = this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
    }
  }

  /**
   * Checks the result of a quiz or survey.
   *
   * @param {string[]} answers - The array of user answers to check.
   * @returns {string} The final quizz result, corresponding to the most frequently occurring answer alias.
   *
   * @throws {TypeError} If the `answers` parameter is not an array of strings.
   */
  checkResult(anwsers: string[]): string {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }

  /**
   * Shuffles an array in place.
   *
   * @param {any[]} array The array to shuffle.
   * @returns {any[]} The shuffled array.
   */
  shuffleArray(array: any[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
}
