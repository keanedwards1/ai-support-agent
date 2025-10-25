from fastapi import FastAPI
from routes import ask  # adjust if needed

app = FastAPI()

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

app.include_router(ask.router)
