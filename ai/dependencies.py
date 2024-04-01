from dependency_injector import containers, providers
from celery import Celery


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    celery_app = providers.Singleton(Celery, broker=config.celery.broker_url)