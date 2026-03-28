import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(name: str, phone: str, service: str, message: str):
    smtp_user = "89134555705@mail.ru"
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта: {name}"
    msg["From"] = smtp_user
    msg["To"] = smtp_user

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px;">
      <h2 style="color: #111; margin-bottom: 24px;">Новая заявка с сайта</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #666; width: 140px;">Имя</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Телефон</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:{phone}">{phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Услуга</td><td style="padding: 8px 0;">{service or '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Сообщение</td><td style="padding: 8px 0;">{message or '—'}</td></tr>
      </table>
    </div>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())


def handler(event: dict, context) -> dict:
    """Сохраняет заявку в БД и отправляет уведомление на почту."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    service = (body.get("service") or "").strip()
    message = (body.get("message") or "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, service, message) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, service or None, message or None),
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    send_email(name, phone, service, message)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "id": lead_id}),
    }
