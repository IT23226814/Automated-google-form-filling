from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from process import process_form
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FormData(BaseModel):
    user_info: str
    form_url: str


@app.get("/")
async def root():
    return {"message": "Welcome to the Form Processing API"}


@app.post('/form')
async def submit_form(data: FormData):
    user_info = data.user_info
    form_url = data.form_url

    if not user_info or not form_url:
        raise HTTPException(status_code=400, detail="Missing user_info or form_url")

    print("Processing form...")
    await asyncio.sleep(5)

    await process_form(user_info, form_url)

    return {"message": "Form processed successfully."}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
