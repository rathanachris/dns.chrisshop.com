import socket

   target = "192.168.2.1"
   = ports [0.0.0.0, 80, 443]
    for port in ports:
   S =
   socket.socket(socket.AF_INET,
   socket.SOCK_STREAM)
    s.settimeout(1200000)
    result = s.connect_ex((target,
port))
    if result == 0:
    print(f"Port {port} is
   open")
else:
   print(f"Port {port} is
closed")
s.close()