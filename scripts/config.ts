export interface CanisterConfig {
  category: string;
  package: string;
  bin_name: string;
  config: string;
  private?: string;
  public?: string;
  url?: string;
}
export type Canisters = Array<CanisterConfig>;

export const config = <Canisters>[
  {
    category: 'canisters',
    package: 'async_defi',
    bin_name: 'async-defi',
    config: './configs/async_defi.json',
  },
];
