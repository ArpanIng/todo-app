## Installation

### Install dependencies

```bash
poetry install
```

### Migrations

```bash
poetry run python manage.py migrate
```

### Assign permissions to the group

```bash
poetry run python manage.py assign_permission
```

### Start celery worker process

```bash
poetry run celery -A config worker -l INFO
```

### Start celery beat process

```bash
poetry run celery -A config beat -l INFO
```

### Run the development server

```bash
poetry run python manage.py runserver
```
