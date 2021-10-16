import axios from 'axios';
import { Joke } from '../models/services/YoMomma/Joke';
import { GoogleTranslationService } from './GoogleTranslationService';

require('dotenv').config();

class YoMommaService {
  protected BASE_URL: string = 'https://api.yomomma.info/';

  protected translationService: GoogleTranslationService;

  constructor() {
    this.translationService = new GoogleTranslationService();
  }

  async getJoke(language: string | null = null): Promise<Joke> {
    const axiosYoMommaResponse = await axios
      .get<Joke>(this.BASE_URL)
      .catch(() => {
        throw new Error("Could't find a joke.");
      });
    const yoMommaJoke = axiosYoMommaResponse.data;
    if (language) {
      yoMommaJoke.joke = await this.translationService.translate(
        yoMommaJoke.joke,
        {
          to: language,
        }
      );
    }
    return yoMommaJoke;
  }
}

export { YoMommaService };
