export type Direction = "left" | "right" | "up" | "down";

export interface API {
  swipe(dir?: Direction): Promise<void>;

  /**
   * Restore swiped-card state. Use this function if you want to undo a swiped-card (e.g. you have a back button that shows last swiped card or you have a reset button. The promise is resolved once the card is returned
   */
  restoreCard(): Promise<void>;
}
