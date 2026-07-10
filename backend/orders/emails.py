from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def _send_html_email(subject, template_name, context, to):
    if not to:
        return
    html_body = render_to_string(template_name, context)
    message = EmailMultiAlternatives(
        subject=subject,
        body="View this email in an HTML-capable client to see order details.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to],
    )
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=True)


def send_order_confirmation(order):
    _send_html_email(
        subject=f"Your ZardoCards order {order.order_number}",
        template_name="orders/emails/order_confirmation.html",
        context={"order": order},
        to=order.customer_email,
    )


def send_admin_order_alert(order):
    _send_html_email(
        subject=f"New order {order.order_number} — ${order.total}",
        template_name="orders/emails/admin_alert.html",
        context={"order": order},
        to=settings.ADMIN_NOTIFICATION_EMAIL,
    )
