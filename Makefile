.PHONY: setup run test docker-build docker-run clean

setup:
	python3 -m venv .venv
	.venv/bin/pip install -r backend/requirements.txt
	cp -n backend/.env.example backend/.env || true
	@echo "---"
	@echo "Edita backend/.env con tus API keys"
	@echo "Luego: source .venv/bin/activate && make run"

run:
	cd backend && uvicorn app.main:app --reload --port 8000

frontend:
	cd frontend && python3 -m http.server 9090

test:
	cd backend && python -m pytest tests/ -v

docker-build:
	docker compose build

docker-run:
	docker compose up

lint:
	cd backend && pip install ruff -q && ruff check app/

clean:
	rm -rf .venv backend/__pycache__ backend/app/__pycache__
	rm -rf .pytest_cache backend/.pytest_cache
	rm -rf backend/**/__pycache__
