import local
import nuvem
import psutil
import time


print(" "*30, "+="*10, "Sistema OVERWATCH", "=+"*10, " "*30)
print(" "*40, "="*10, "Ctrl+C para parar", "="*10, " "*40, "\n")


def capture_data(fkServidor):
    try:
        while True:
            current_cpu = (psutil.cpu_percent())
            current_ram = psutil.virtual_memory().percent
            
            try:        
                current_disco = psutil.disk_usage("/etc").percent
            except FileNotFoundError:
                current_disco = psutil.disk_usage("/").percent
                
            data_hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

            print(
                f'Servidor {fkServidor} -> ',
                "CPU:", float("{0:.2f}".format(current_cpu)), "%",
                "| Memória Ram:", float(
                    "{0:.2f}".format(current_ram)), "%",
                "| Disco:", float(
                    "{0:.2f}".format(current_disco)), "%",
                "| Data:", data_hora, "\n")

            time.sleep(10)
            local.insert_db(current_cpu, current_ram, current_disco, fkServidor)
            nuvem.insert_cloud(current_cpu, current_ram, current_disco, fkServidor)
    except KeyboardInterrupt:
        pass
      
if(__name__ == "__main__"):
    local.check_enterprise()