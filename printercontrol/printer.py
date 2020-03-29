from serial import Serial


class PrinterMachine(Serial):

    def __init__(self):
        Serial.__init__(self)

    def __str__(self):
        return f"Printer => <port>: {self.port} ; <baudrate> {self.baudrate}"

    def __read_data(self, size_bytes):
        # The "self.read" is from the "Serial" class
        data = self.read(size=size_bytes)
        return data.decode('utf-8')

    def get_temp(self):
        # The "self.write" is from the "Serial" class
        self.write(bytes('M105\n'.encode('utf-8')))
        return self.__read_data(20)

    def get_config(self):
        """
        Uniquement pour un laserGrbl
        """
        self.write(bytes('$$\n'.encode('utf-8')))
        return self.__read_data(10000)

    def set_type_position(self, type_pos):
        if type_pos == "relative":
            order = f"G91\n"

        elif type_pos == "absolute":
            order = f"G90\n"

        self.write(bytes(order.encode('utf-8')))
        return self.__read_data(10)

    def set_mouv(self, type_mouv, axe, distance):
        order = f"{type_mouv} {axe}{distance}\n"
        self.write(bytes(order.encode('utf-8')))
        return self.__read_data(10)

