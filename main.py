
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import pandas as pd

app = FastAPI()

# Serve frontend
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

# Load candle data
data = pd.read_csv("data/XAUUSD_M1.csv")

@app.get("/candles")
def candles():
    return data.to_dict(orient="records")
