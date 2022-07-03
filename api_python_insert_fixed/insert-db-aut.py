import random
import time
from functools import reduce
from connectdb import *

print("="*10, "INÍCIO DAS MEDIÇÕES", "="*10)
print("-"*10, "Ctrl+C para parar", "-"*10, "\n")


def flush(velocidade_do_vento, probabilidade_de_chuva, umidade, temperatura, count):
    average_velocidade_do_vento = round(
        (reduce((lambda x, y: x+y), velocidade_do_vento)/len(velocidade_do_vento)), 2)
    average_probabilidade_de_chuva = round(
        (reduce((lambda x, y: x+y), probabilidade_de_chuva)/len(probabilidade_de_chuva)), 2)
    average_umidade = round(
        (reduce((lambda x, y: x+y), umidade)/len(umidade)), 2)
    average_temperatura = round(
        (reduce((lambda x, y: x+y), temperatura)/len(temperatura)), 2)    

    print('\nReadings:', count)
    print(
        f"Velocidade do Vento: {average_velocidade_do_vento}KM/h | ",
        f"Probabilidade de Chuva: {average_probabilidade_de_chuva}%",
        f"Umidade: {average_umidade}%",
        f"Temperatura: {average_temperatura}%")

    insert_db(average_velocidade_do_vento, average_probabilidade_de_chuva, average_umidade, average_temperatura)

try:
    count = 1
    velocidade_do_vento = []
    probabilidade_de_chuva = []
    umidade = []
    temperatura = []

    while True:
        current_velocidade_do_vento = (random.uniform(0.00, 125.00))
        current_probabilidade_de_chuva = (random.uniform(0.00, 100.00))
        current_umidade = (random.uniform(0.00, 80.00))
        current_temperatura = (random.uniform(0.50, 40.00))

        data_hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        velocidade_do_vento.append(float("{0:.2f}".format(current_velocidade_do_vento)))
        probabilidade_de_chuva.append(float("{0:.2f}".format(current_probabilidade_de_chuva)))
        umidade.append(float("{0:.2f}".format(current_umidade)))
        temperatura.append(float("{0:.2f}".format(current_temperatura)))

        print(
        "Velocidade do Vento: ", float("{0:.2f}".format(current_velocidade_do_vento)), "KM/h",
        "| Probabilidade de Chuva:", float("{0:.2f}".format(current_probabilidade_de_chuva)), "%",
        "| Umidade:", float("{0:.2f}".format(current_umidade)), "%",
        "| Temperatura:", float("{0:.2f}".format(current_temperatura)), "º",
        "| Data:", data_hora)

        time.sleep(2)
        if(count == 5):
            flush(velocidade_do_vento, probabilidade_de_chuva, umidade, temperatura, count)
            count = 1
        count = count + 1
except KeyboardInterrupt:
    pass

flush(velocidade_do_vento, probabilidade_de_chuva, umidade, temperatura, count)
