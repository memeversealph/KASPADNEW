export interface TokenConfig {
  tick: string;
  max: string;
  lim: string;
  dec: string;
  pre: string;
}

export interface KRC20Token {
  tick: string;
  max: string;
  lim: string;
  pre: string;
  to?: string;
  dec: string;
  minted?: string;
  opScoreAdd: string;
  opScoreMod: string;
  state: string;
  hashRev?: string;
  mtsAdd: string;
  holderTotal?: number;
  transferTotal?: number;
  mintTotal?: number;
}