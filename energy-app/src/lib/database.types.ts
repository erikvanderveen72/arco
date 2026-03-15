export type EnergyProvider = {
  id: string;
  name: string;
  kwh_rate: number;
  gas_rate: number;
  standing_charge_electricity: number;
  standing_charge_gas: number;
  contract_type: "vast" | "variabel" | "dynamisch";
  contract_duration_months: number;
  green_energy: boolean;
  rating: number;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      energy_providers: {
        Row: EnergyProvider;
        Insert: Omit<EnergyProvider, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<EnergyProvider, "id" | "created_at" | "updated_at">>;
      };
    };
  };
};
