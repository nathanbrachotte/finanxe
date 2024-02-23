CREATE TABLE etf (
    etf_id INT PRIMARY KEY,
    symbol VARCHAR(10),
    name VARCHAR(100)
);

CREATE TABLE price_history (
    price_id INT PRIMARY KEY,
    etf_id INT,
    date DATE,
    price INT,
    KEY etf_id_idx (etf_id)
);

