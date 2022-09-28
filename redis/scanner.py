import socket
import sys
import colorama
from colorama import *


def check(ip, port, timeout=10):
    try:
        # socket.setdefaulttimeout(timeout)
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((ip, int(port)))
        payload = 'info\r\n'
        s.send(payload.encode())
        # s.send(b'*1\r\n$4\r\ninfo\r\n')
        result = s.recv(1024)
        if b'redis_version' in result:  # 判断是否存在未授权
            print('%s:%d 存在未授权访问漏洞' % (ip, port))
        else:
            print('%s:%d 不存在漏洞' % (ip, port))
    except (socket.error, socket.timeout):
        print('连接超时')


if __name__ == '__main__':
    length = len(sys.argv)
    if length not in [2, 3]:
        print('Usage:python scanner.py <ip> [port]')
    else:
        ip = sys.argv[1]
        port = 6379
        try:
            port = sys.argv[2]
        except:
            print("using default port 6379")
        check(ip, port)
