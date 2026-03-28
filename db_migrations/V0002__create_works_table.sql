CREATE TABLE IF NOT EXISTS works (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO works (title, description, image_url, sort_order) VALUES
('Жилой дом', 'Кладка кирпичных стен, монтаж перекрытий', 'https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/87c24507-5eec-4f71-b157-859553aa608e.jpg', 1),
('Фундаментные работы', 'Армирование и заливка монолитного фундамента', 'https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/c77b5519-ee10-45e6-b9e0-02f8c1a2138b.jpg', 2),
('Финишная отделка', 'Штукатурка, выравнивание стен и потолков', 'https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/6ba7cb0c-c1bc-46e2-8c0c-0295ab7ab1c5.jpg', 3),
('Коммерческий объект', 'Многоэтажное здание под ключ', 'https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/2b2f4d22-2c1a-415a-a79e-e40774939d64.jpg', 4),
('Кровельные работы', 'Монтаж кровли и водосточной системы', 'https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/472c26e4-d82b-4611-bd8f-c7a3bd1e1015.jpg', 5),
('Готовый объект', 'Сдача дома под ключ с благоустройством', 'https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/29c3ab08-31aa-4d94-aac1-7b688006af31.jpg', 6);
