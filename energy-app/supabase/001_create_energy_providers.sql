-- Supabase Migration: Energy Providers Table
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard)

-- Create the energy_providers table
CREATE TABLE IF NOT EXISTS energy_providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  kwh_rate NUMERIC(6, 4) NOT NULL,          -- Prijs per kWh in EUR (bijv. 0.2850)
  gas_rate NUMERIC(6, 4) NOT NULL,           -- Prijs per m³ gas in EUR (bijv. 1.2500)
  standing_charge_electricity NUMERIC(6, 2) NOT NULL DEFAULT 0, -- Vastrecht elektriciteit per maand
  standing_charge_gas NUMERIC(6, 2) NOT NULL DEFAULT 0,         -- Vastrecht gas per maand
  contract_type TEXT NOT NULL CHECK (contract_type IN ('vast', 'variabel', 'dynamisch')),
  contract_duration_months INTEGER NOT NULL DEFAULT 12,
  green_energy BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(2, 1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for fast filtering
CREATE INDEX idx_energy_providers_contract_type ON energy_providers(contract_type);
CREATE INDEX idx_energy_providers_green ON energy_providers(green_energy);

-- Enable Row Level Security
ALTER TABLE energy_providers ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view providers)
CREATE POLICY "Public read access" ON energy_providers
  FOR SELECT USING (true);

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_energy_providers_updated_at
  BEFORE UPDATE ON energy_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed data: Nederlandse energieleveranciers (voorbeeldprijzen)
INSERT INTO energy_providers (name, kwh_rate, gas_rate, standing_charge_electricity, standing_charge_gas, contract_type, contract_duration_months, green_energy, rating, logo_url) VALUES
  ('Vattenfall',        0.2850, 1.2500, 7.95, 7.95, 'vast',      12, true,  4.2, NULL),
  ('Eneco',             0.2720, 1.1800, 6.95, 6.95, 'vast',      36, true,  4.5, NULL),
  ('Essent',            0.2950, 1.3200, 8.50, 8.50, 'vast',      12, false, 3.8, NULL),
  ('Budget Energie',    0.2580, 1.1500, 5.50, 5.50, 'variabel',   0, false, 3.5, NULL),
  ('Greenchoice',       0.2680, 1.2000, 6.50, 6.50, 'vast',      12, true,  4.3, NULL),
  ('ANWB Energie',      0.2750, 1.2300, 7.00, 7.00, 'vast',      12, true,  4.1, NULL),
  ('Vandebron',         0.2450, 1.0800, 6.00, 6.00, 'dynamisch',  0, true,  4.4, NULL),
  ('Tibber',            0.2380, 1.0500, 5.99, 5.99, 'dynamisch',  0, true,  4.6, NULL),
  ('EasyEnergy',        0.2420, 1.0900, 5.75, 5.75, 'dynamisch',  0, false, 3.9, NULL),
  ('Oxxio',             0.2890, 1.2800, 7.50, 7.50, 'variabel',   0, false, 3.6, NULL),
  ('Mega',              0.2650, 1.1600, 6.25, 6.25, 'variabel',   0, false, 3.7, NULL),
  ('Nederlandse Energie Maatschappij', 0.2780, 1.2100, 7.25, 7.25, 'vast', 24, false, 3.4, NULL),
  ('Pure Energie',      0.2550, 1.1400, 5.95, 5.95, 'vast',      12, true,  4.0, NULL),
  ('Energie Direct',    0.2920, 1.3000, 8.00, 8.00, 'variabel',   0, false, 3.3, NULL),
  ('Frank Energie',     0.2400, 1.0600, 5.85, 5.85, 'dynamisch',  0, true,  4.5, NULL);
