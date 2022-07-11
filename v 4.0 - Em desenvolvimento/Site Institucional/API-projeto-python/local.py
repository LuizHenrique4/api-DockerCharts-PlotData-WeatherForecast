import mysql.connector
from credentials import usr_L, pswd_L, banco_L
from main import capture_data

mydb = mysql.connector.connect(
    host="localhost",
    user=usr_L,
    password=pswd_L,
    database=banco_L
)


def insert_db(value1, value2, value3, value4):
    mydb.connect()
    try:
        if mydb.is_connected():
            mycursor = mydb.cursor()

            sql_query = "INSERT INTO banco_overwatch.dados(cpu,memoriaRam,disco,dataHora,fkServidor) VALUES (%s,%s, %s,now(),%s)"

            val = [value1, value2, value3, value4]

            mycursor.execute(sql_query, val)

            mydb.commit()
            
    except mysql.connector.Error as e:
        print("Erro ao conectar com o MySQL", e)
    finally:
        if mydb.is_connected():
            mycursor.close()
            mydb.close()
            
def check_server(fkEmpresa):
  nome_servidor = input("Digite o nome do servidor: ")
  verif = 0
  mydb.connect()
  try:
    if mydb.is_connected():
      mycursor = mydb.cursor()
      
      sql_query = f'SELECT idServidor,nome from servidor where fkEmpresa = {fkEmpresa};'
      
      mycursor.execute(sql_query)
      
      myresult = mycursor.fetchall()
      
      for data in myresult:
        if data[1] == nome_servidor:
          print("Esse Servidor está sendo utilizado!")
          fkServidor = data[0]
          verif = 1

      if verif == 0:
          print("Esse servidor não existe!")
          check_server(fkEmpresa)
      elif verif == 1:
          capture_data(fkServidor)
  finally:
    if mydb.is_connected():
            mycursor.close()
            mydb.close()
  
            
def check_enterprise():
  nome_empresa = input("Digite o nome da empresa: ")
  verif = 0
  fkEmpresa = 0
  mydb.connect()
  try:
    if mydb.is_connected():
      mycursor = mydb.cursor()
      
      sql_query = "SELECT idEmpresa,nomeEmpresa from empresa"
      
      mycursor.execute(sql_query)
      
      myresult = mycursor.fetchall()
      
      for data in myresult:
        if data[1] == nome_empresa:
          fkEmpresa = data[0]
          verif = 1

      if verif == 0:
          print("Empresa não existe!")
          check_enterprise()
      elif verif == 1:
          check_server(fkEmpresa)
  finally:
    if mydb.is_connected():
            mycursor.close()
            mydb.close()