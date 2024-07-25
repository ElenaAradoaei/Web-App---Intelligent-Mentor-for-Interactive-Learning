from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import openai
from fastapi.middleware.cors import CORSMiddleware
from capitole import capitole_admitere, capitole_bac_biologie_vegetala, capitole_bac_anatomie_genetica
import json
import random
import os

app = FastAPI()

# Configurare cheie OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Modelul Pydantic pentru datele de intrare
class UserData(BaseModel):
    timpInvatare: int
    nivel: str
    obiectiv: str

class UserQuestion(BaseModel):
    intrebareUser: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/generate_questionnaire")
def generate_questionnaire_options():
    return {"msg": "OK"}

# Ruta pentru generarea chestionarului
@app.post("/generate_questionnaire")
async def generate_questionnaire(user_data: UserData):
    # Maparea datelor de intrare
    timp_invatare = user_data.timpInvatare
    nivel = user_data.nivel.lower()
    obiectiv = user_data.obiectiv.lower()

    print(timp_invatare)
    print(nivel)
    print(obiectiv)

    if obiectiv == "bacalaureat biologie vegetala si animala":
        capitole_selectate = capitole_bac_biologie_vegetala
    elif obiectiv == "bacalaureat anatomie si genetica":
        capitole_selectate = capitole_bac_anatomie_genetica
    elif obiectiv == "admitere la medicina":
        capitole_selectate = capitole_admitere
    else:
        capitole_selectate = capitole_admitere + capitole_bac_biologie_vegetala + capitole_bac_anatomie_genetica
        
    # Definirea numarului de intrebari proportional cu timpul de invatare
    num_questions = int(timp_invatare / 3)  # Presupunem ca o intrebare este rezolvata in 3 minute
    capitole_alese = random.sample(capitole_selectate, 5)
    # Generarea intrebarilor folosind OpenAI API
    tr_answer_template: str = """
        {
            "Intrebari": [
                {
                    "Numar enunt", "Enunt",
                    "Raspunsuri" : "array a), b), c), d)", 
                    "Varianta corecta de raspuns" : "lower letter",
                    "Capitol" : "Maxim 5 cuvinte",
                    "Explicatie" : "Varianta corecta este a/b/c/d). Explica, te rog, in cateva enunturi, care este varianta corecta si de ce"
                }
            ]
        }
        """
    messages = [{"role": "system", "content": "You are an expert biology teacher. Your answers will be in JSON format according to the specified template in each question."},
        {"role": "user", "content": f"Folosind urmatorul format: {tr_answer_template}, genereaza in limba romana un numar de {num_questions} intrebari diferite de biologie de tip grila cu 4 variante\
        de raspuns cu complement simplu din urmatoarele capitole: {', '.join(capitole_alese)}, pentru un student {nivel} care are ca scop {obiectiv}."}]
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type": "json_object"},
        temperature=0.9,
        messages = messages
    )

    # Extragere intrebari din raspunsul generat
    questions = response.choices[0].message.content
    print(questions)
    return {"questions": json.loads(questions)}

@app.options("/generate_answer")
def generate_answer_options():
    return {"msg": "OK"}

# Ruta pentru generarea raspunsului
@app.post("/generate_answer")
async def generate_answer(user_data: UserQuestion):
    # Maparea datelor de intrare
    intrebare_user = user_data.intrebareUser

    print(intrebare_user)
        
    # Generarea raspunsului folosind OpenAI API
    tr_answer_template: str = """
        {
            "Intrebare", 
            "Raspuns"
        }
        """
    messages = [{"role": "system", "content": "Esti un profesor de biologie, iar un student de liceu te intreaba ceva. Răspunsurile tale vor fi în format JSON conform șablonului specificat în fiecare întrebare."},
        {"role": "user", "content": f"Folosind urmatorul format: {tr_answer_template}, genereaza in limba romana un raspuns in 2-3 fraze pentru urmatoarea intrebare a elevului: {intrebare_user}"}]
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type": "json_object"},
        seed=10023,
        temperature=0.5,
        messages = messages
    )

    # Extragere intrebari din raspunsul generat
    answer = response.choices[0].message.content
    print(answer)
    return {"questions": json.loads(answer)}