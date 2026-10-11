import pandas as pd
import numpy as np
import re
from pathlib import Path
from typing import Annotated
import joblib
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from training.recommend import retrain



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://campusdoubt.vercel.app", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load('model/domain_classifier.joblib')
vectoriser = joblib.load('model/domain_classifier_vectorizer.joblib')



class User_input(BaseModel):
    Query: Annotated[str, Field(..., description="Enter your query")]


def text_preprocessing(text) :
    
    text = text.lower()
    #For html tags
    text = re.sub(r'<.*?>', '', text)    
    # For links                  
    text = re.sub(r'https?://\S+|www\.\S+', '', text)   
    #For punctuation
    for char in '!"#$%&\'()*,-./:;<=>?@[\\]^_`{|}~':
        text = text.replace(char, '')
    #For emojis    
    emoji_pattern = re.compile(
        "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags
        u"\U00002700-\U000027BF"  # dingbats
        u"\U000024C2-\U0001F251"
        u"\U0001F900-\U0001F9FF"  # supplemental symbols & pictographs
        u"\U0001FA70-\U0001FAFF"  # extended symbols
        u"\U0001F018-\U0001F270"  # various additional symbols
        u"\U0001F000-\U0001F02F"  # Mahjong tiles
        "]+", flags=re.UNICODE)
    text = emoji_pattern.sub('', text)
    # For extra whitespace
    text = re.sub(r'\s+', ' ', text).strip() 
    return text
 

@app.get("/")
def read_root():
    return {"message": "Welcome to the Query Classification API.",
            "endpoints": ["/predict", "/recommend"],
            "description": "This API classifies user queries into different domains and provides recommendations based on the query."}



@app.post("/recommend")
def recommend_querry(data: User_input):
    domain = get_domain(data)
    result = retrain(new_querry=text_preprocessing(data.Query) , domain=domain)
    return JSONResponse(
        status_code=200,
        content={"recommendations": result},
    )


@app.post("/predict")
def predict_domain(data: User_input):
    #input_data = [data.Query]
    #input_data = [text.lower() for text in input_data]
    input_data = [text_preprocessing(data.Query)]
    input_vector = vectoriser.transform(input_data).toarray()
    prediction = model.predict(input_vector)[0]
    if prediction.item() == 0:
        predict = 'Backend'
    elif prediction.item() == 1:
        predict = 'Cyber Security'
    elif prediction.item() == 2:
        predict = 'DSA'
    elif prediction.item() == 3:
        predict = 'Frontend'
    elif prediction.item() == 4:
        predict = 'ML/AI'
    elif prediction.item() == 5:
        predict = 'Programming Language'
    else:
        predict = 'Other'
    
    return JSONResponse(
        status_code=200,
        content={"prediction": predict},
    ) 


def get_domain(data: User_input):
    #input_data = [data.Query]
    #input_data = [text.lower() for text in input_data]
    input_data = [text_preprocessing(data.Query)]
    input_vector = vectoriser.transform(input_data).toarray()
    prediction = model.predict(input_vector)[0]
    if prediction.item() == 0:
        predict = 'Backend'
    elif prediction.item() == 1:
        predict = 'Cyber Security'
    elif prediction.item() == 2:
        predict = 'DSA'
    elif prediction.item() == 3:
        predict = 'Frontend'
    elif prediction.item() == 4:
        predict = 'ML/AI'
    elif prediction.item() == 5:
        predict = 'Programming Language'
    else:
        predict = 'Other'
    
    return predict
