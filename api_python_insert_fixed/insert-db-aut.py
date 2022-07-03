import psutil
import time
from functools import reduce
from connectdb import *

print("="*10, "INÍCIO DAS MEDIÇÕES", "="*10)
print("-"*10, "Ctrl+C para parar", "-"*10, "\n")


def flush(bytes_cpu_list, bytes_memoriaRam_list, bytes_disco_list, count):
    average_bytes_cpu = round(
        (reduce((lambda x, y: x+y), bytes_cpu_list)/len(bytes_cpu_list)), 2)
    average_bytes_memoriaRam = round(
        (reduce((lambda x, y: x+y), bytes_memoriaRam_list)/len(bytes_memoriaRam_list)), 2)
    average_bytes_disco = round(
        (reduce((lambda x, y: x+y), bytes_disco_list)/len(bytes_disco_list)), 2)

    print('\nReadings:', count)
    print(
        f"Average Bytes CPU: {average_bytes_cpu}MB | ",
        f"Average Bytes Memória Ram: {average_bytes_memoriaRam}MB",
        f"Average Bytes Disco: {average_bytes_disco}MB")

    insert_db(average_bytes_cpu, average_bytes_memoriaRam, average_bytes_disco)


try:
    count = 1
    bytes_cpu_list = []
    bytes_memoriaRam_list = []
    bytes_disco_list = []

    while True:
        current_bytes_cpu = ((psutil.cpu_percent()))
        current_bytes_ram = ((psutil.virtual_memory().percent))
        current_bytes_disco = ((psutil.disk_usage("/").percent))

        data_hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        bytes_cpu_list.append(float("{0:.2f}".format(current_bytes_cpu)))
        bytes_memoriaRam_list.append(
            float("{0:.2f}".format(current_bytes_ram)))
        bytes_disco_list.append(float("{0:.2f}".format(current_bytes_disco)))

        print(
            "Bytes CPU:", float("{0:.2f}".format(current_bytes_cpu)), "MB",
            "| Bytes Memória Ram:", float(
                "{0:.2f}".format(current_bytes_ram)), "MB",
            "| Bytes Disco:", float(
                "{0:.2f}".format(current_bytes_disco)), "MB",
            "| Date:", data_hora)

        time.sleep(2)
        if(count == 5):
            flush(bytes_cpu_list, bytes_memoriaRam_list, bytes_disco_list, count)
            count = 1
        count = count + 1
except KeyboardInterrupt:
    pass

flush(bytes_cpu_list, bytes_memoriaRam_list, bytes_disco_list, count)
