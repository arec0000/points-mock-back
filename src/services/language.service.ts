import { Injectable } from "@nestjs/common";
import * as RussianNouns from "russian-nouns-js";

@Injectable()
export class LanguageService {
  private rne = new RussianNouns.Engine();

  formatCountry(word: string) {
    return this.rne.decline(
      { text: word, gender: RussianNouns.Gender.FEMININE },
      RussianNouns.Case.ACCUSATIVE,
    )[0];
  }
}
