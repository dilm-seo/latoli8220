export class APIKeyError extends Error {
  constructor() {
    super("Veuillez configurer votre clé API OpenAI dans les paramètres");
    this.name = "APIKeyError";
  }
}

export class AnalysisError extends Error {
  constructor(message: string = "Erreur lors de l'analyse. Vérifiez votre clé API et réessayez.") {
    super(message);
    this.name = "AnalysisError";
  }
}