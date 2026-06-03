-- website_find tables for Supabase

CREATE TABLE leads (
    place_id                  TEXT PRIMARY KEY,
    name                      TEXT NOT NULL,
    address                   TEXT,
    phone                     TEXT,
    category                  TEXT,
    search_term               TEXT,
    website_uri               TEXT,
    google_maps_uri           TEXT,
    rating                    REAL,
    review_count              INTEGER,
    lat                       REAL,
    lng                       REAL,
    lead_type                 TEXT NOT NULL,
    status                    TEXT NOT NULL DEFAULT 'new',
    notes                     TEXT DEFAULT '',
    website_status            TEXT,
    website_status_checked_at TEXT,
    outreach_script           TEXT,
    outreach_script_at        TEXT,
    last_contacted_at         TEXT,
    email_subject             TEXT,
    email_body                TEXT,
    email_generated_at        TEXT,
    mockup_html               TEXT,
    mockup_generated_at       TEXT,
    first_seen                TEXT NOT NULL,
    last_seen                 TEXT NOT NULL
);

CREATE INDEX idx_leads_status    ON leads(status);
CREATE INDEX idx_leads_lead_type ON leads(lead_type);

CREATE TABLE scans (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location      TEXT NOT NULL,
    radius_km     REAL,
    categories    TEXT NOT NULL,
    scanned_at    TEXT NOT NULL,
    result_count  INTEGER NOT NULL
);

CREATE INDEX idx_scans_location ON scans(location);

-- Disable RLS so the app can read/write freely with anon key
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on leads" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on scans" ON scans FOR ALL USING (true) WITH CHECK (true);
