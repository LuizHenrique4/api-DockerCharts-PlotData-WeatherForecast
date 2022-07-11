import pyodbc
from credentials import usr_N,pswd_N,data_N,server_N,driver_N
import time
from datetime import datetime

cnxn = pyodbc.connect('DRIVER='+driver_N+';SERVER='+
                      server_N+';DATABASE='+data_N+';UID='+usr_N+';PWD='+ pswd_N)

def insert_cloud(cpu, memoriaRam, disco, fkServidor):
    try:
          cursor = cnxn.cursor()

          FORMAT='%Y-%m-%dT%H:%M:%S%z'
          date=datetime.strptime(time.strftime(FORMAT, time.localtime()),FORMAT)
          sql_query = """INSERT INTO [dbo].[dados](cpu,memoriaRam,disco,dataHora,fkServidor) VALUES (?,?,?,?,?)"""

          val = [cpu,memoriaRam,disco,date,fkServidor]

          cursor.execute(sql_query, val)

          cnxn.commit()          
    except:
        print("Erro ao conectar com o SQL SERVER")