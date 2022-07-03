import mysql.connector
from credentials import usr, pswd

def insert_db(value1, value2, value3, value4):
    try:  
        mydb = mysql.connector.connect(
            host = "localhost",
            user = usr,
            password = pswd,
            database = "banco_clima_tempo"
        )

        if mydb.is_connected():
            db_info = mydb.get_server_info()
            print("Conectado ao MySQL Server versão ", db_info)

            mycursor = mydb.cursor()

            sql_query = "INSERT INTO banco_clima_tempo.status_de_clima(velocidade_do_vento,probabilidade_chuva,umidade,temperatura,data_hora) VALUES (%s,%s,%s,%s,now())"

            val = [value1, value2, value3, value4]

            mycursor.execute(sql_query, val)

            mydb.commit()

            print(mycursor.rowcount, "registro inserido")
    except mysql.connector.Error as e:
        print("Erro ao conectar com o MySQL", e)
    finally:
        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()
print("Conexão com MySQL está fechada\n")