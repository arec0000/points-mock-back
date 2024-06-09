"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const common_1 = require("@nestjs/common");
const RussianNouns = require("russian-nouns-js");
let LanguageService = class LanguageService {
    constructor() {
        this.rne = new RussianNouns.Engine();
    }
    formatCountry(word) {
        return this.rne.decline({ text: word, gender: RussianNouns.Gender.FEMININE }, RussianNouns.Case.ACCUSATIVE)[0];
    }
};
exports.LanguageService = LanguageService;
exports.LanguageService = LanguageService = __decorate([
    (0, common_1.Injectable)()
], LanguageService);
//# sourceMappingURL=language.service.js.map