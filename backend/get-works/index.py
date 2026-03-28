import os
import json
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список работ из БД для отображения на сайте."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    cur.execute(f'SELECT id, title, description, image_url, sort_order FROM {schema}.works ORDER BY sort_order ASC, id ASC')
    rows = cur.fetchall()
    cur.close()
    conn.close()

    works = [
        {'id': r[0], 'title': r[1], 'description': r[2], 'image_url': r[3], 'sort_order': r[4]}
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'works': works}, ensure_ascii=False)
    }