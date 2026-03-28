import os
import json
import base64
import uuid
import psycopg2
import boto3


ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')


def check_auth(event):
    token = event.get('headers', {}).get('X-Admin-Token', '')
    return token == ADMIN_PASSWORD


def get_s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )


def get_conn():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    return conn, cur


def get_schema():
    return os.environ.get('MAIN_DB_SCHEMA', 'public')


def handler(event: dict, context) -> dict:
    """Админ API: добавление, удаление и получение работ. Требует заголовок X-Admin-Token."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    if not check_auth(event):
        return {'statusCode': 401, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Unauthorized'})}

    method = event.get('httpMethod')

    if method == 'GET':
        conn, cur = get_conn()
        schema = get_schema()
        cur.execute(f'SELECT id, title, description, image_url, sort_order, created_at FROM {schema}.works ORDER BY sort_order ASC, id ASC')
        rows = cur.fetchall()
        cur.close()
        conn.close()
        works = [
            {'id': r[0], 'title': r[1], 'description': r[2], 'image_url': r[3], 'sort_order': r[4], 'created_at': str(r[5])}
            for r in rows
        ]
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, 'body': json.dumps({'works': works}, ensure_ascii=False)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        title = body.get('title', '')
        description = body.get('description', '')
        sort_order = int(body.get('sort_order', 0))
        image_data = body.get('image_data', '')
        image_ext = body.get('image_ext', 'jpg')

        image_bytes = base64.b64decode(image_data)
        key = f'works/{uuid.uuid4()}.{image_ext}'
        s3 = get_s3()
        s3.put_object(Bucket='files', Key=key, Body=image_bytes, ContentType=f'image/{image_ext}')
        image_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"

        conn, cur = get_conn()
        schema = get_schema()
        cur.execute(
            f'INSERT INTO {schema}.works (title, description, image_url, sort_order) VALUES (%s, %s, %s, %s) RETURNING id',
            (title, description, image_url, sort_order)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, 'body': json.dumps({'id': new_id, 'image_url': image_url})}

    if method == 'DELETE':
        body = json.loads(event.get('body') or '{}')
        work_id = int(body.get('id'))

        conn, cur = get_conn()
        schema = get_schema()
        cur.execute(f'DELETE FROM {schema}.works WHERE id = %s', (work_id,))
        conn.commit()
        cur.close()
        conn.close()

        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Method not allowed'})}