import connect_db
import random
import time

print(" "*30, "==="*10, "Sistema de Monitoramento Climático", "==="*10, " "*30)
print(" "*40, "==="*10, "Ctrl+C para parar", "==="*10, " "*40, "\n")

def capture_data(fkCidade):
    try:
        while True:
            current_velocidade_do_vento = (random.uniform(0.00, 125.00))
            current_probabilidade_de_chuva = (random.uniform(0.00, 100.00))
            current_umidade = (random.uniform(0.00, 80.00))
            current_temperatura = (random.uniform(0.50, 40.00))
            data_hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

            print(
                f'Cidade {fkCidade} -> ',
                "| Velocidade do vendo:", float("{0:.2f}".format(current_velocidade_do_vento)), "KM/h",
                "| Probabilidade de chuva:",float("{0:.2f}".format(current_probabilidade_de_chuva)), "%",
                "| Umidade:", float("{0:.2f}".format(current_umidade)), "%",
                "| Temperatura:", float("{0:.2f}".format(current_temperatura)), "º",
                "| Data:", data_hora, "\n")

            time.sleep(2)
            connect_db.insert_db(current_velocidade_do_vento, current_probabilidade_de_chuva, current_umidade, current_temperatura, fkCidade)
    except KeyboardInterrupt:
        pass
      
if(__name__ == "__main__"):
    connect_db.check_enterprise()