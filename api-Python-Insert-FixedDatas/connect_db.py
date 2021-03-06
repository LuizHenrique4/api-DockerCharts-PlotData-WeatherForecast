import mysql.connector
from credentials import usr, pswd, banc
from main import capture_data

mydb = mysql.connector.connect(
    host="localhost",
    user=usr,
    password=pswd,
    database=banc
)

def insert_db(value1, value2, value3, value4, value5):
    mydb.connect()
    try:
        if mydb.is_connected():
            mycursor = mydb.cursor()

            sql_query = "INSERT INTO banco_clima_tempo.status_de_clima(velocidade_do_vento,probabilidade_chuva,umidade,temperatura,data_hora,fkCidade) VALUES (%s,%s,%s,%s,now(),%s)"

            val = [value1, value2, value3, value4, value5]

            mycursor.execute(sql_query, val)

            mydb.commit()
            
    except mysql.connector.Error as e:
        print("Erro ao conectar com o MySQL", e)
    finally:
        if mydb.is_connected():
            mycursor.close()
            mydb.close()
            
def check_server(fkPais):
  zona_Cidade = input("Digite a zona do Cidade: ")
  verif = 0
  mydb.connect()
  try:
    if mydb.is_connected():
      mycursor = mydb.cursor()
      
      sql_query = f'SELECT idCidade,zona from Cidade where fkPais = {fkPais};'
      
      mycursor.execute(sql_query)
      
      myresult = mycursor.fetchall()
      
      for data in myresult:
        if data[1] == zona_Cidade:
          print("Essa Cidade já está sendo utilizado!")
          fkCidade = data[0]
          verif = 1

      if verif == 0:
          print("Essa Cidade não existe!")
          check_server(fkPais)
      elif verif == 1:
          capture_data(fkCidade)
  finally:
    if mydb.is_connected():
            mycursor.close()
            mydb.close()
  
            
def check_enterprise():
  nome_Pais = input("Digite o nome do Pais: ")
  verif = 0
  fkPais = 0
  mydb.connect()
  try:
    if mydb.is_connected():
      mycursor = mydb.cursor()
      
      sql_query = "SELECT idPais,nomePais from Pais"
      
      mycursor.execute(sql_query)
      
      myresult = mycursor.fetchall()
      
      for data in myresult:
        if data[1] == nome_Pais:
          fkPais = data[0]
          verif = 1

      if verif == 0:
          print("Pais não existe!")
          check_enterprise()
      elif verif == 1:
          check_server(fkPais)
  finally:
    if mydb.is_connected():
            mycursor.close()
            mydb.close()