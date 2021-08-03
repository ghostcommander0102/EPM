import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from .base import *


# ==============================================================================
# THIRD-PARTY APPS SETTINGS
# ==============================================================================

sentry_sdk.init(
    dsn=config('DSN'),
    integrations=[DjangoIntegration()],
    send_default_pii=True
)
