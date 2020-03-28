from serial import Serial


class Printer(Serial):

    def __init__(self):
        Serial.__init__(self)

    def __str__(self):
        return f"Printer => <port>: {self.port} ; <baudrate> {self.baudrate}"

    def get_temp(self):
        self.write(bytes('M105\n'.encode('utf-8')))
        data = self.read(size=20)
        return data.decode('utf-8')

    def get_config(self):
        """
        Uniquement pour un laserGrbl
        """
        self.write(bytes('$$\n'.encode('utf-8')))
        data = self.read(size=10000)
        return data.decode('utf-8')

    def set_type_position(self, type_pos):
        if type_pos == "relative":
            order = f"G91\n"

        elif type_pos == "absolute":
            order = f"G90\n"

        self.write(bytes(order.encode('utf-8')))

    def set_mouv(self, type_mouv, axe, distance):
        order = f"{type_mouv} {axe}{distance}\n"
        self.write(bytes(order.encode('utf-8')))


