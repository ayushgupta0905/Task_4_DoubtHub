import pandas as pd
import numpy as np
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import json

def text_preprocessing(text):
    text = text.lower()
    exclude = '!"#$%&\'()*,-./:;<=>?@[\\]^_`{|}~'
    for char in exclude:
            text = text.replace(char,'')
    return text


def retrain(new_querry="",domain=""):

    base_dir = os.path.dirname(__file__)
    if domain == 'Backend':
        file_path = os.path.join(base_dir, 'data' ,'backend_qa.csv')
    elif domain == 'Cyber Security':
        file_path = os.path.join(base_dir, 'data' ,'cybersecurity_qa.csv')
    elif domain == 'DSA':
        file_path = os.path.join(base_dir, 'data' ,'dsa_qa.csv')
    elif domain == 'Frontend':
        file_path = os.path.join(base_dir, 'data' ,'frontend_qa.csv')
    elif domain == 'Programming Language':
        file_path = os.path.join(base_dir, 'data' ,'programming_language_qa.csv')
    elif domain == 'ML/AI':
        file_path = os.path.join(base_dir, 'data' ,'aiml_qa.csv')
    else:
        return json.dumps({"error": "Invalid domain specified."})
        

    df = pd.read_csv(file_path)
    # df = pd.read_csv('training/Clustering_data.csv.csv')
    # df = pd.read_csv(data_path)              
    df['question'] = df['question'].apply(text_preprocessing)

    new_querry = text_preprocessing(new_querry)


    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(df['question']).toarray()
    new_query_vector = vectorizer.transform([new_querry]).toarray()


    similarity = cosine_similarity(new_query_vector, X)[0]
    top_indeces = np.argsort(-similarity)[:5]
    # print(top_indeces)
    # print(similarity)


    nearest_queries = df['question'].iloc[top_indeces]


    result = {}
    i = 1
    for q in nearest_queries:
        result[i] = q
        i += 1
    # print(result)
    return json.dumps({"similar_queries": result})


retrain(new_querry="What is react", domain="Frontend")
