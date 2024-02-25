CREATE TABLE etfs (
    etf_id INT PRIMARY KEY AUTO_INCREMENT,
    isin VARCHAR(12),
    url VARCHAR(300),
    name VARCHAR(100)
);
ALTER TABLE etfs ADD currency VARCHAR(3);

CREATE TABLE price_history (
    price_id INT PRIMARY KEY,
    etf_id INT,
    date DATE,
    price INT,
    KEY etf_id_idx (etf_id)
);

INSERT INTO etfs (isin, url, name) VALUES
    ('IE00B4L5Y983', 'https://www.ishares.com/uk/individual/en/products/251882/ishares-msci-world-ucits-etf-acc-fund?switchLocale=y&siteEntryPassthrough=true', 'iShares Core MSCI World UCITS ETF USD (Acc)');
INSERT INTO etfs (isin, url, name, currency) VALUES
    ('IE00B52VJ196', 'https://www.ishares.com/uk/individual/en/products/251767/ishares-dow-jones-europe-sustainability-screened-ucits-etf', 'iShares MSCI Europe SRI UCITS ETF', 'EUR'),
    ('IE00BFNM3P36', 'https://www.ishares.com/uk/individual/en/products/305397/ishares-msci-em-imi-esg-screened-ucits-etf-usd-acc-fund', 'iShares MSCI EM IMI ESG Screened UCITS ETF', 'USD');
    ('IE00B1XNHC34', 'https://www.ishares.com/uk/individual/en/products/251911/ishares-global-clean-energy-ucits-etf', 'iShares Global Clean Energy UCITS ETF', 'USD');
    ('IE000NDWFGA5', '', '', '');
    ('IE00B3WJKG14', 'https://www.blackrock.com/pt/profissionais/products/280510/ishares-sp-500-information-technology-sector-ucits-etf', 'iShares S&P 500 Information Technology Sector UCITS ETF', 'USD');
    ('US78409V1044', '', '', '');
    ('IE00BG370F43', '', '', '');


UPDATE etfs
SET url = 'https://www.ishares.com/uk/individual/en/products/251882/ishares-msci-world-ucits-etf-acc-fund?switchLocale=y&siteEntryPassthrough=true'
WHERE isin = 'IE00B4L5Y983';

SELECT * FROM etfs;
