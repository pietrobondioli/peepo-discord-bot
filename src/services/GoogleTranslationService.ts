import TranslateLIB from '@google-cloud/translate';
import { TranslateRequest } from '@google-cloud/translate/build/src/v2';

require('dotenv').config();

class GoogleTranslationService {
  protected TranslationService;

  constructor() {
    const { Translate } = TranslateLIB.v2;
    this.TranslationService = new Translate({
      projectId: process.env.GOOGLE_TRANSLATION_PROJECT_ID,
      key: process.env.GOOGLE_TRANSLATION_API_KEY,
    });
  }

  async translate(
    text: string,
    translateReq: TranslateRequest
  ): Promise<string> {
    const translations = await this.TranslationService.translate(
      text,
      translateReq
    );
    return translations[0];
  }
}

export { GoogleTranslationService };
